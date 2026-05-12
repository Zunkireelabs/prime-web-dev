module.exports = {
  apps: [
    {
      name: "sanity-webhook",
      script: "webhook-server.js",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      env_file: ".env.local",
      env: {
        WEBHOOK_PORT: 9001,
      },
    },
  ],
};
