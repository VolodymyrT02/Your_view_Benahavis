import { loadStoredConsent } from "./cookie-consent-storage";

export type LeadChannel = "whatsapp" | "telegram" | "form";

interface LeadIntentPayload {
  channel: LeadChannel;
  locale: string;
  consentId?: string;
  pageId: string;
  landingUrl?: string;
  referrer?: string;
  messengerLink?: string;
  utm?: Record<string, string | undefined>;
  extra?: Record<string, unknown>;
}

const REMARKETING_ENDPOINT = import.meta.env.VITE_REMARKETING_ENDPOINT;
const LEAD_EMAIL_ENDPOINT = import.meta.env.VITE_LEAD_EMAIL_ENDPOINT;

const collectUtmParams = (): Record<string, string | undefined> => {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
  };
};

const postJson = async (url: string | undefined, payload: unknown) => {
  if (!url) {
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn("[lead] Не удалось отправить событие", error);
  }
};

export const submitLeadIntent = async (input: Omit<LeadIntentPayload, "utm" | "consentId">) => {
  const consent = loadStoredConsent();
  const payload: LeadIntentPayload = {
    ...input,
    consentId: consent?.consentId,
    utm: collectUtmParams(),
    landingUrl: typeof window !== "undefined" ? window.location.href : undefined,
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
  };

  await Promise.all([
    postJson(REMARKETING_ENDPOINT, { type: "lead_intent", payload }),
    postJson(LEAD_EMAIL_ENDPOINT, { type: "lead_notification", payload }),
  ]);
};

export const submitRemarketingEvent = async (
  eventType: string,
  meta: Record<string, unknown> = {},
) => {
  const consent = loadStoredConsent();
  await postJson(REMARKETING_ENDPOINT, {
    type: "remarketing_event",
    payload: {
      consentId: consent?.consentId,
      eventType,
      meta,
      utm: collectUtmParams(),
      landingUrl: typeof window !== "undefined" ? window.location.href : undefined,
    },
  });
};
