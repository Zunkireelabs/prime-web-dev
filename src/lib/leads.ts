const CRM_ENDPOINT = process.env.NEXT_PUBLIC_CRM_ENDPOINT;
const CRM_API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY;

// Catalogue downloads post to their own CRM form. Endpoint is dedicated; the key
// falls back to the shared one so reusing the existing key needs no extra config.
const CATALOG_CRM_ENDPOINT = process.env.NEXT_PUBLIC_CATALOG_CRM_ENDPOINT || CRM_ENDPOINT;
const CATALOG_CRM_API_KEY = process.env.NEXT_PUBLIC_CATALOG_CRM_API_KEY || CRM_API_KEY;

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/** Split a single "full name" field into the CRM's first/last name shape. */
function splitName(name: string): { firstName: string; lastName: string | null } {
  const trimmed = name.trim();
  const spaceIdx = trimmed.indexOf(" ");
  const firstName = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx);
  const lastName = spaceIdx === -1 ? null : trimmed.slice(spaceIdx + 1).trim() || null;
  return { firstName, lastName };
}

/** POST a lead payload to an EdgeX CRM public-submit endpoint. */
async function postLead(
  endpoint: string | undefined,
  apiKey: string | undefined,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  if (!endpoint || !apiKey) {
    return { ok: false, error: "CRM not configured" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false, error: `Server responded ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export interface QuoteLead {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  tileSize?: string;
  message?: string;
}

export async function submitQuoteLead(lead: QuoteLead): Promise<SubmitResult> {
  const { firstName, lastName } = splitName(lead.name);
  return postLead(CRM_ENDPOINT, CRM_API_KEY, {
    first_name: firstName,
    last_name: lastName,
    email: lead.email.trim(),
    phone: lead.phone.trim(),
    custom_fields: {
      project_type: lead.projectType,
      tile_size: lead.tileSize || "",
      message: lead.message || "",
      source: "website-quote-form",
    },
  });
}

export interface CatalogLead {
  name: string;
  phone: string;
  email: string;
  /** Which catalogue the visitor requested — hidden from the user, surfaced in the CRM. */
  catalog: string;
  /** Absolute URL to the catalogue PDF — hidden from the user, surfaced in the CRM. */
  catalogLink: string;
}

export async function submitCatalogLead(lead: CatalogLead): Promise<SubmitResult> {
  const { firstName, lastName } = splitName(lead.name);
  return postLead(CATALOG_CRM_ENDPOINT, CATALOG_CRM_API_KEY, {
    first_name: firstName,
    last_name: lastName,
    email: lead.email.trim(),
    phone: lead.phone.trim(),
    custom_fields: {
      catalog: lead.catalog,
      catalog_link: lead.catalogLink,
      source: "catalog-download",
    },
  });
}

/** Trigger a browser download of a same-origin file. */
export function downloadFile(url: string): void {
  if (typeof document === "undefined" || !url) return;
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
