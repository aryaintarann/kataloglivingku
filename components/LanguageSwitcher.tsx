"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
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
      aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      className="lang-toggle"
      style={{ opacity: isPending ? 0.6 : 1 }}
    >
      <span className={`lang-opt${locale === "id" ? " active" : ""}`}>ID</span>
      <span className={`lang-opt${locale === "en" ? " active" : ""}`}>EN</span>
    </button>
  );
}
