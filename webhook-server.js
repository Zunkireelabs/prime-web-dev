#!/usr/bin/env node
/**
 * Sanity Webhook Receiver
 * Listens for POST /webhook from Sanity CMS and triggers a site rebuild.
 *
 * Setup:
 *   SANITY_WEBHOOK_SECRET=<your-secret> WEBHOOK_PORT=9001 node webhook-server.js
 *   -- or with PM2 --
 *   pm2 start webhook-server.js --name sanity-webhook
 *
 * Zero npm dependencies — uses Node.js built-ins only.
 */

const http = require("http");
const crypto = require("crypto");
const { execFile } = require("child_process");
const path = require("path");

const PORT = process.env.WEBHOOK_PORT || 9001;
const SECRET = process.env.SANITY_WEBHOOK_SECRET;
const DEPLOY_SCRIPT = process.env.DEPLOY_SCRIPT || path.join(__dirname, "deploy-staging.sh");

if (!SECRET) {
  console.error("❌  SANITY_WEBHOOK_SECRET env var is required");
  process.exit(1);
}

/**
 * Verify Sanity HMAC-SHA256 signature.
 * Header format: "t=<timestamp>,v1=<hex-digest>"
 * Signed payload: "<timestamp>.<rawBody>"
 */
function verifySignature(rawBody, signatureHeader) {
  if (!signatureHeader) return false;
  const parts = {};
  for (const part of signatureHeader.split(",")) {
    const idx = part.indexOf("=");
    parts[part.slice(0, idx)] = part.slice(idx + 1);
  }
  const { t, v1 } = parts;
  if (!t || !v1) return false;

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(`${t}.${rawBody}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(v1, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

let isDeploying = false;

const server = http.createServer((req, res) => {
  // Health check
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }

  if (req.method !== "POST" || req.url !== "/webhook") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    const rawBody = Buffer.concat(chunks).toString("utf8");
    const sig = req.headers["sanity-webhook-signature"];

    if (!verifySignature(rawBody, sig)) {
      console.warn(`[${new Date().toISOString()}] ⚠️  Invalid signature — ignoring`);
      res.writeHead(401);
      res.end("Unauthorized");
      return;
    }

    // Respond immediately so Sanity doesn't time out
    res.writeHead(200);
    res.end("OK");

    if (isDeploying) {
      console.log(`[${new Date().toISOString()}] ⏭️  Deploy already in progress — skipping`);
      return;
    }

    isDeploying = true;
    console.log(`[${new Date().toISOString()}] 🚀 Sanity content changed — triggering rebuild...`);

    execFile("bash", [DEPLOY_SCRIPT], { cwd: __dirname }, (err, stdout, stderr) => {
      isDeploying = false;
      if (err) {
        console.error(`[${new Date().toISOString()}] ❌ Deploy failed:`, err.message);
        if (stderr) console.error(stderr);
      } else {
        console.log(`[${new Date().toISOString()}] ✅ Deploy complete`);
        if (stdout) console.log(stdout);
      }
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[${new Date().toISOString()}] 🎣 Webhook server listening on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Endpoint: http://localhost:${PORT}/webhook`);
});
