import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["id", "en"] as const;
const DEFAULT_LOCALE = "id";

const SKIP_INTL = /^(\/api|\/admin|\/opengraph-image|\/sitemap\.xml|\/robots\.txt|\/llms\.txt|\/favicon\.ico|\/.*\..+)/;

function addSecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      `connect-src 'self' ${process.env.SUPABASE_URL ?? "https://*.supabase.co"}`,
      "frame-ancestors 'none'",
    ].join("; ")
  );
  return res;
}

function getLocaleFromPathname(pathname: string): (typeof LOCALES)[number] {
  const segment = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(segment)
    ? (segment as (typeof LOCALES)[number])
    : DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (SKIP_INTL.test(pathname)) {
    return addSecurityHeaders(NextResponse.next());
  }

  const locale = getLocaleFromPathname(pathname);

  // For the default locale (id), rewrite /path → /id/path so [locale] segment resolves
  if (locale === DEFAULT_LOCALE && !pathname.startsWith(`/${DEFAULT_LOCALE}`)) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    const res = NextResponse.rewrite(rewriteUrl);
    res.headers.set("x-next-intl-locale", DEFAULT_LOCALE);
    return addSecurityHeaders(res);
  }

  const res = NextResponse.next();
  res.headers.set("x-next-intl-locale", locale);
  return addSecurityHeaders(res);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
