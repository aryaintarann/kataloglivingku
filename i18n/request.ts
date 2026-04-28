import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { headers } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let requested = await requestLocale;

  if (!hasLocale(routing.locales, requested)) {
    const h = await headers();
    const fromHeader = h.get("x-next-intl-locale");
    if (fromHeader && hasLocale(routing.locales, fromHeader)) {
      requested = fromHeader as (typeof routing.locales)[number];
    }
  }

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
