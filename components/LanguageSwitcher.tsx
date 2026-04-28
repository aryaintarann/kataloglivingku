"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "id" ? "en" : "id";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      title={t("switchTo")}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        border: "1.5px solid var(--color-gold)",
        borderRadius: "6px",
        background: "transparent",
        color: "var(--color-gold)",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        cursor: isPending ? "wait" : "pointer",
        opacity: isPending ? 0.6 : 1,
        transition: "all 0.2s",
        fontFamily: "var(--font-space-mono), monospace",
        flexShrink: 0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {locale === "id" ? "EN" : "ID"}
    </button>
  );
}
