import createNextIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createNextIntlMiddleware(routing);

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

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!SKIP_INTL.test(pathname)) {
    const intlRes = intlMiddleware(req);
    if (intlRes) return addSecurityHeaders(intlRes);
  }

  return addSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
