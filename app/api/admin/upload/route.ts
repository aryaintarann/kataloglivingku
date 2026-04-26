import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createServerClient } from "@/lib/supabase";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length, 1);
  const bufA = Buffer.alloc(len); bufA.write(a);
  const bufB = Buffer.alloc(len); bufB.write(b);
  return timingSafeEqual(bufA, bufB) && a.length === b.length;
}

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return safeEqual(token, expected);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase belum dikonfigurasi" }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Form data tidak valid" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF" }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File terlalu besar (maks 5 MB)" }, { status: 413 });
  }

  const folder = formData.get("folder") === "hero" ? "hero" : "listings";
  const ext = EXT[file.type] ?? "jpg";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const db = createServerClient();

  // Auto-create bucket jika belum ada
  const { data: buckets } = await db.storage.listBuckets();
  if (!buckets?.find((b) => b.name === "photos")) {
    await db.storage.createBucket("photos", { public: true });
  }

  const { error } = await db.storage.from("photos").upload(filename, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = db.storage.from("photos").getPublicUrl(filename);
  return NextResponse.json({ url: publicUrl });
}
