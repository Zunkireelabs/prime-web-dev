const CRM_ENDPOINT = process.env.NEXT_PUBLIC_CRM_ENDPOINT;
const CRM_API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY;

export interface QuoteLead {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  tileSize?: string;
  message?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitQuoteLead(lead: QuoteLead): Promise<SubmitResult> {
  if (!CRM_ENDPOINT || !CRM_API_KEY) {
    return { ok: false, error: "CRM not configured" };
  }

  const trimmed = lead.name.trim();
  const spaceIdx = trimmed.indexOf(" ");
  const firstName = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx);
  const lastName = spaceIdx === -1 ? null : trimmed.slice(spaceIdx + 1).trim() || null;

  try {
    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRM_API_KEY}`,
      },
      body: JSON.stringify({
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
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `Server responded ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
