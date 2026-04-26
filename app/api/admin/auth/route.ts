import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

// In-memory rate limiter (resets on server restart)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000; // 15 menit

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS) return true;
  entry.count++;
  return false;
}

function safeEqual(a: string, b: string): boolean {
  // Pad ke panjang sama agar timingSafeEqual tidak error
  const len = Math.max(a.length, b.length, 1);
  const bufA = Buffer.alloc(len);
  const bufB = Buffer.alloc(len);
  bufA.write(a);
  bufB.write(b);
  return timingSafeEqual(bufA, bufB) && a.length === b.length;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Terlalu banyak percobaan. Coba lagi dalam 15 menit." },
      { status: 429 }
    );
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Server belum dikonfigurasi" }, { status: 500 });
  }

  let password: string;
  try {
    const body = await req.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Request tidak valid" }, { status: 400 });
  }

  if (!safeEqual(password, expected)) {
    return NextResponse.json({ ok: false, error: "Password salah" }, { status: 401 });
  }

  // Reset counter on success
  attempts.delete(ip);
  return NextResponse.json({ ok: true });
}
