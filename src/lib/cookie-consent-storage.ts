import { supportedConsentLocales, type SupportedConsentLocale } from "./cookie-consent-content";

export type ConsentValue = "granted" | "denied";

export interface ConsentPreferences {
  necessary: ConsentValue;
  analytics: ConsentValue;
  advertising: ConsentValue;
}

export type ConsentAction = "accept_all" | "reject_all" | "customize_save";

export interface StoredConsent {
  consentId: string;
  updatedAt: string;
  policyVersion: string;
  bannerVersion: string;
  locale: SupportedConsentLocale;
  preferences: ConsentPreferences;
  uiAction: ConsentAction;
}

const STORAGE_KEY = "yvb_consent";
export const POLICY_VERSION = "2025-09-21";
export const BANNER_VERSION = "v1.0.0";
export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: "granted",
  analytics: "denied",
  advertising: "denied",
};

const CONSENT_EVENT_ENDPOINT = import.meta.env.VITE_CONSENT_ENDPOINT;
const CONSENT_EVENT_API_KEY = import.meta.env.VITE_CONSENT_API_KEY;

const OPEN_EVENT_NAME = "cookie-consent:open";
export const COOKIE_OPEN_EVENT = OPEN_EVENT_NAME;

const SUPPORTED = new Set<SupportedConsentLocale>(supportedConsentLocales as SupportedConsentLocale[]);

export const isSupportedConsentLocale = (value: string): value is SupportedConsentLocale => SUPPORTED.has(value as SupportedConsentLocale);

const generateConsentId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `consent-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

export const loadStoredConsent = (): StoredConsent | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.policyVersion !== POLICY_VERSION || parsed.bannerVersion !== BANNER_VERSION) {
      return null;
    }

    if (!isSupportedConsentLocale(parsed.locale)) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.warn("[consent] Не удалось прочитать сохранённое согласие", error);
    return null;
  }
};

const ensureGtag = () => {
  if (typeof window === "undefined") {
    return;
  }

  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (!w.dataLayer) {
    w.dataLayer = [];
  }

  if (!w.gtag) {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer!.push(args);
    };
  }
};

export const ensureDefaultConsent = () => {
  if (typeof window === "undefined") {
    return;
  }

  ensureGtag();
  window.gtag!("consent", "default", {
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

export const applyConsentMode = (preferences: ConsentPreferences) => {
  if (typeof window === "undefined") {
    return;
  }

  ensureGtag();
  window.gtag!("consent", "update", {
    analytics_storage: preferences.analytics,
    ad_user_data: preferences.advertising,
    ad_personalization: preferences.advertising,
  });
};

const submitConsent = async (consent: StoredConsent) => {
  if (!CONSENT_EVENT_ENDPOINT) {
    return;
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (CONSENT_EVENT_API_KEY) {
      headers.Authorization = `Bearer ${CONSENT_EVENT_API_KEY}`;
    }

    const body = {
      consentId: consent.consentId,
      timestampUtc: consent.updatedAt,
      policyVersion: consent.policyVersion,
      bannerVersion: consent.bannerVersion,
      locale: consent.locale,
      analyticsStorage: consent.preferences.analytics,
      adUserData: consent.preferences.advertising,
      adPersonalization: consent.preferences.advertising,
      uiAction: consent.uiAction,
    };

    await fetch(CONSENT_EVENT_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.warn("[consent] Не удалось отправить событие согласия", error);
  }
};

export const persistConsent = async (
  preferences: ConsentPreferences,
  locale: SupportedConsentLocale,
  uiAction: ConsentAction,
) => {
  if (typeof window === "undefined") {
    return;
  }

  const existing = loadStoredConsent();
  const consent: StoredConsent = {
    consentId: existing?.consentId ?? generateConsentId(),
    updatedAt: new Date().toISOString(),
    policyVersion: POLICY_VERSION,
    bannerVersion: BANNER_VERSION,
    locale,
    preferences,
    uiAction,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  await submitConsent(consent);
};

export const addOpenPreferencesListener = (listener: (detail: { view?: "firstLayer" | "secondLayer" }) => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ view?: "firstLayer" | "secondLayer" }>).detail ?? {};
    listener(detail);
  };

  window.addEventListener(OPEN_EVENT_NAME, handler as EventListener);

  return () => window.removeEventListener(OPEN_EVENT_NAME, handler as EventListener);
};

export const dispatchOpenPreferences = (view: "firstLayer" | "secondLayer" = "secondLayer") => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(OPEN_EVENT_NAME, { detail: { view } }));
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
