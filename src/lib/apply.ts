// Application form — validation + (mock) submit.
// Replace `submitApplication` body with a real backend call when ready.

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  resumeUrl: string;
  coverNote: string;
  source: string;
  role: string; // role title at submit time, "" if open application
  roleId: string; // role id at submit time, "" if open application
}

export type FieldErrors = Partial<Record<keyof ApplicationFormData, string>>;

const URL_RE = /^https?:\/\/.+/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(data: ApplicationFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone.trim() && data.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number, or leave blank.";
  }

  if (data.linkedin.trim() && !URL_RE.test(data.linkedin.trim())) {
    errors.linkedin = "Please enter a full URL starting with http:// or https://";
  }

  if (data.resumeUrl.trim() && !URL_RE.test(data.resumeUrl.trim())) {
    errors.resumeUrl = "Please enter a full URL starting with http:// or https://";
  }

  if (!data.coverNote.trim() || data.coverNote.trim().length < 30) {
    errors.coverNote = "Tell us a few sentences about why you'd like to join.";
  }

  return errors;
}

// TODO: replace body with real backend (Formspree/Sanity/etc.) when wired.
export async function submitApplication(
  data: ApplicationFormData
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log("[ApplyForm] Would submit:", data);
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export const sourceOptions = [
  "",
  "A friend",
  "LinkedIn",
  "Press / news article",
  "Prime website",
  "Showroom visit",
  "Industry event",
  "Other",
] as const;

export const emptyApplicationForm: ApplicationFormData = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  resumeUrl: "",
  coverNote: "",
  source: "",
  role: "",
  roleId: "",
};
