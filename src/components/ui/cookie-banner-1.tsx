"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cookie, Shield, Info, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Prefs = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export interface CookiePanelProps {
  title?: string;
  message?: string;
  acceptText?: string;
  customizeText?: string;
  icon?: "cookie" | "shield" | "info";
  className?: string;
  privacyHref?: string;
  termsHref?: string;
  onPrivacyClick?: (e: React.MouseEvent) => void;
  onTermsClick?: (e: React.MouseEvent) => void;
}

const CookiePanel = (props: CookiePanelProps) => {
  const {
    title = "This site uses cookies",
    message = "We use cookies to enhance your experience.",
    acceptText = "Accept all",
    customizeText = "Customize",
    icon = "cookie",
    className,
    privacyHref = "#privacy",
    termsHref = "#terms",
    onPrivacyClick,
    onTermsClick,
  } = props;

  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  const prefsRef = useRef<HTMLDivElement | null>(null);
  const [prefsHeight, setPrefsHeight] = useState<number>(0);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("cookie-consent")
        : null;

    if (!stored) {
      setRender(true);
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    const storedPrefs = localStorage.getItem("cookie-preferences");
    if (storedPrefs) {
      try {
        const parsed = JSON.parse(storedPrefs) as Prefs;
        setPrefs({ ...parsed, necessary: true });
      } catch {}
    }
  }, []);

  // Allow re-opening preferences anytime (e.g. from footer links)
  useEffect(() => {
    const handleReopen = () => {
      setRender(true);
      setShowPrefs(true);
      requestAnimationFrame(() => setVisible(true));
    };
    window.addEventListener("open-cookie-preferences", handleReopen);
    return () => window.removeEventListener("open-cookie-preferences", handleReopen);
  }, []);

  useEffect(() => {
    if (showPrefs && prefsRef.current) {
      const h = prefsRef.current.scrollHeight;
      setPrefsHeight(h);
    } else {
      setPrefsHeight(0);
    }
  }, [showPrefs, prefs]);

  const closeWithExit = (val?: "true" | "false") => {
    if (val) localStorage.setItem("cookie-consent", val);
    setVisible(false);
    setTimeout(() => setRender(false), 300);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent", "true");
    setShowPrefs(false);

    setVisible(false);
    setTimeout(() => setRender(false), 300);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    if (onPrivacyClick) {
      onPrivacyClick(e);
      return;
    }
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-hotel-policy", { detail: "privacy" }));
    const el = document.getElementById("ftr") || document.getElementById("ftrReveal");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    if (onTermsClick) {
      onTermsClick(e);
      return;
    }
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-hotel-policy", { detail: "terms" }));
    const el = document.getElementById("ftr") || document.getElementById("ftrReveal");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!render) return null;

  const IconEl =
    icon === "shield" ? Shield : icon === "info" ? Info : Cookie;

  const PrefRow = ({
    title,
    desc,
    field,
    locked,
  }: {
    title: string;
    desc: string;
    field: keyof Prefs;
    locked?: boolean;
  }) => (
    <div className="flex items-start gap-2 p-2 rounded-lg border border-border bg-background/50">
      <button
        type="button"
        disabled={locked}
        onClick={() => !locked && setPrefs((p) => ({ ...p, [field]: !p[field] }))}
        className={cn(
          "mt-0.5 inline-flex size-5 items-center justify-center rounded border transition-colors",
          locked
            ? "bg-muted text-muted-foreground border-border cursor-not-allowed"
            : "bg-background border-border hover:bg-accent cursor-pointer"
        )}
        aria-pressed={prefs[field]}
        aria-label={`${title} cookie preference`}
      >
        {prefs[field] && <Check className="size-4" />}
      </button>

      <div className="flex-1">
        <div className="text-xs font-medium text-foreground">
          {title} {locked && <span className="text-[10px] text-muted-foreground">(required)</span>}
        </div>

        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{desc}</p>
      </div>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn(
        "fixed right-4 bottom-4 md:right-6 md:bottom-6",
        "z-50 w-[360px] max-w-[92vw]"
      )}
    >
      <div
        className={cn(
          "relative border border-border/70 rounded-xl bg-card/95 text-card-foreground shadow-2xl backdrop-blur-md",
          "p-4 flex flex-col gap-3",
          className
        )}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
          transition: "opacity 300ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 shrink-0">
            <IconEl className="size-5" aria-hidden="true" />
          </span>

          <h2 className="text-sm font-semibold leading-5 text-foreground">{title}</h2>

          <button
            type="button"
            onClick={() => closeWithExit()}
            className="ml-auto inline-flex size-8 items-center justify-center rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          {message} See our{" "}
          <a
            href={privacyHref}
            onClick={handlePrivacyClick}
            className="underline underline-offset-4 hover:text-foreground cursor-pointer text-foreground/80 font-medium"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href={termsHref}
            onClick={handleTermsClick}
            className="underline underline-offset-4 hover:text-foreground cursor-pointer text-foreground/80 font-medium"
          >
            Terms & Conditions
          </a>
          .
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((p) => !p)}
            className={cn(
              "px-3 py-1.5 rounded-md border border-border/70 cursor-pointer",
              "bg-muted text-muted-foreground text-xs font-medium",
              "hover:bg-muted/80 hover:text-foreground transition-colors flex items-center gap-1"
            )}
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
          >
            {customizeText}
            {showPrefs ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>

          <button
            type="button"
            onClick={() => closeWithExit("true")}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors shadow-xs"
            )}
          >
            {acceptText}
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className={cn(
            "overflow-hidden transition-[height] duration-300 ease-out will-change-[height]"
          )}
        >
          {showPrefs && (
            <div className="mt-2 flex flex-col gap-2 pt-1 border-t border-border/40">
              <PrefRow
                title="Strictly necessary"
                desc="Required for site functionality."
                field="necessary"
                locked
              />

              <PrefRow
                title="Functional"
                desc="Remembers your preferences."
                field="functional"
              />

              <PrefRow
                title="Analytics"
                desc="Helps us improve the site."
                field="analytics"
              />

              <PrefRow
                title="Marketing"
                desc="Personalized ads."
                field="marketing"
              />

              <div className="flex justify-end gap-2 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="px-2.5 py-1 rounded-md border border-border bg-muted text-muted-foreground text-xs hover:bg-muted/80 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={savePreferences}
                  className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 cursor-pointer shadow-xs"
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { CookiePanel };
export default CookiePanel;
