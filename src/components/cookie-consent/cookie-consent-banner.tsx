import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DEFAULT_CONSENT,
  addOpenPreferencesListener,
  applyConsentMode,
  ensureDefaultConsent,
  isSupportedConsentLocale,
  loadStoredConsent,
  persistConsent,
  type ConsentAction,
  type ConsentPreferences,
} from "@/lib/cookie-consent-storage";
import { getConsentCopy, type SupportedConsentLocale } from "@/lib/cookie-consent-content";

interface CookieConsentBannerProps {
  locale: string;
  privacyPolicyUrl: string;
  cookiesNoticeUrl: string;
}

type ConsentView = "firstLayer" | "secondLayer";

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  locale,
  privacyPolicyUrl,
  cookiesNoticeUrl,
}) => {
  const effectiveLocale: SupportedConsentLocale = useMemo(
    () => (isSupportedConsentLocale(locale) ? (locale as SupportedConsentLocale) : "en"),
    [locale],
  );

  const copy = useMemo(() => getConsentCopy(effectiveLocale), [effectiveLocale]);

  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<ConsentView>("firstLayer");
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_CONSENT);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    ensureDefaultConsent();

    const existing = loadStoredConsent();
    if (existing) {
      setPreferences(existing.preferences);
      applyConsentMode(existing.preferences);
      setVisible(false);
    } else {
      applyConsentMode(DEFAULT_CONSENT);
      setVisible(true);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    const unsubscribe = addOpenPreferencesListener((detail) => {
      const stored = loadStoredConsent();
      if (stored) {
        setPreferences(stored.preferences);
      } else {
        setPreferences(DEFAULT_CONSENT);
      }

      setView(detail.view ?? "secondLayer");
      setVisible(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const applyAndPersist = useCallback(
    async (action: ConsentAction, nextPreferences: ConsentPreferences) => {
      setIsSaving(true);
      setPreferences(nextPreferences);
      applyConsentMode(nextPreferences);

      try {
        await persistConsent(nextPreferences, effectiveLocale, action);
      } catch (error) {
        console.warn("[consent] Ошибка при сохранении согласия", error);
      } finally {
        setIsSaving(false);
        setVisible(false);
        setView("firstLayer");
      }
    },
    [effectiveLocale],
  );

  const handleAcceptAll = useCallback(() => {
    void applyAndPersist("accept_all", {
      necessary: "granted",
      analytics: "granted",
      advertising: "granted",
    });
  }, [applyAndPersist]);

  const handleRejectAll = useCallback(() => {
    void applyAndPersist("reject_all", {
      necessary: "granted",
      analytics: "denied",
      advertising: "denied",
    });
  }, [applyAndPersist]);

  const handleCustomize = useCallback(() => {
    setView("secondLayer");
  }, []);

  const handleBack = useCallback(() => {
    setView("firstLayer");
  }, []);

  const handleSave = useCallback(() => {
    void applyAndPersist("customize_save", preferences);
  }, [applyAndPersist, preferences]);

  if (!hydrated || !visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:px-6">
      <Card className="w-full max-w-xl border border-primary/10 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          {view === "firstLayer" ? (
            <>
              <div className="space-y-2">
                <h2 className="text-base font-semibold leading-6 text-foreground sm:text-lg">
                  {copy.firstLayer.title}
                </h2>
                <p className="text-sm text-muted-foreground">{copy.firstLayer.message}</p>
              </div>

      <div className="flex flex-col gap-2">
        <Button size="sm" className="h-12 w-full justify-center" onClick={handleAcceptAll} disabled={isSaving}>
          {copy.firstLayer.buttons.acceptAll}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-12 w-full justify-center"
          onClick={handleRejectAll}
          disabled={isSaving}
        >
          {copy.firstLayer.buttons.rejectAll}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-12 w-full justify-center"
          onClick={handleCustomize}
          disabled={isSaving}
        >
          {copy.firstLayer.buttons.customize}
        </Button>
      </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={privacyPolicyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.firstLayer.links.privacyPolicy}
                </a>
                <span aria-hidden="true">•</span>
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={cookiesNoticeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.firstLayer.links.cookiesNotice}
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-base font-semibold leading-6 text-foreground sm:text-lg">
                  {copy.secondLayer.title}
                </h2>
                <p className="text-sm text-muted-foreground">{copy.secondLayer.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-md border border-border/60 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {copy.secondLayer.toggles.necessary.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {copy.secondLayer.toggles.necessary.description}
                    </p>
                  </div>
                  <Switch checked readOnly aria-readonly className="pointer-events-none opacity-80" />
                </div>

                <div className="flex items-start justify-between gap-4 rounded-md border border-border/60 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {copy.secondLayer.toggles.analytics.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {copy.secondLayer.toggles.analytics.description}
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics === "granted"}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: checked ? "granted" : "denied",
                      }))
                    }
                    aria-label={copy.secondLayer.toggles.analytics.label}
                  />
                </div>

                <div className="flex items-start justify-between gap-4 rounded-md border border-border/60 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {copy.secondLayer.toggles.advertising.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {copy.secondLayer.toggles.advertising.description}
                    </p>
                  </div>
                  <Switch
                    checked={preferences.advertising === "granted"}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        advertising: checked ? "granted" : "denied",
                      }))
                    }
                    aria-label={copy.secondLayer.toggles.advertising.label}
                  />
                </div>
              </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button size="sm" className="h-10 flex-1 min-w-[180px] justify-center" onClick={handleAcceptAll} disabled={isSaving}>
          {copy.secondLayer.buttons.acceptAll}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-10 flex-1 min-w-[180px] justify-center"
          onClick={handleRejectAll}
          disabled={isSaving}
        >
          {copy.secondLayer.buttons.rejectAll}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 flex-1 min-w-[180px] justify-center"
          onClick={handleBack}
          disabled={isSaving}
        >
          {copy.secondLayer.buttons.back}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-10 flex-1 min-w-[180px] justify-center"
          onClick={handleSave}
          disabled={isSaving}
        >
          {copy.secondLayer.buttons.save}
        </Button>
      </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={privacyPolicyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.secondLayer.legalLinks.privacyPolicy}
                </a>
                <span aria-hidden="true">•</span>
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={cookiesNoticeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.secondLayer.legalLinks.cookiesPolicy}
                </a>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
