import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD not set" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: "Password salah" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
