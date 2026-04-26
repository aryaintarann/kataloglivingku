import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createServerClient } from "@/lib/supabase";

const MAX_BODY_BYTES = 1024 * 1024; // 1 MB (naik karena foto URL lebih panjang)
const ALLOWED_CATS = new Set(["kost", "apartemen", "harian"]);
const ALLOWED_PERIODS = new Set(["bln", "hari", "thn"]);
const ALLOWED_PHOTO_CLASSES = new Set(["ph-1", "ph-2", "ph-3", "ph-4", "ph-5", "ph-6"]);

function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length, 1);
  const bufA = Buffer.alloc(len);
  const bufB = Buffer.alloc(len);
  bufA.write(a);
  bufB.write(b);
  return timingSafeEqual(bufA, bufB) && a.length === b.length;
}

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return safeEqual(token, expected);
}

function str(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen);
}

function strArr(val: unknown, maxItems = 20, maxLen = 100): string[] {
  if (!Array.isArray(val)) return [];
  return val
    .filter((x) => typeof x === "string")
    .map((x) => String(x).trim().slice(0, maxLen))
    .slice(0, maxItems);
}

function noJsUrl(s: string): string {
  return /^\s*javascript:/i.test(s) ? "" : s;
}

// Validasi foto: CSS class (ph-1..ph-6) ATAU URL Supabase Storage milik project ini
function isValidPhoto(p: string): boolean {
  if (ALLOWED_PHOTO_CLASSES.has(p)) return true;
  try {
    const url = new URL(p);
    const supaHost = process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).hostname : "";
    return url.protocol === "https:" && url.hostname === supaHost && url.pathname.includes("/storage/v1/object/public/photos/");
  } catch {
    return false;
  }
}

// Validasi foto URL untuk hero widget (lebih longgar: semua URL Supabase project)
function isValidWidgetPhoto(p: string): boolean {
  if (!p) return true;
  try {
    const url = new URL(p);
    const supaHost = process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).hostname : "";
    return url.protocol === "https:" && url.hostname === supaHost;
  } catch {
    return false;
  }
}

function validateListing(l: unknown): Record<string, unknown> | null {
  if (typeof l !== "object" || !l) return null;
  const o = l as Record<string, unknown>;
  const id = str(o.id, 20);
  if (!id) return null;
  const cat = str(o.cat, 20);
  const period = str(o.period, 10);
  // maxLen 500 untuk menampung URL Supabase Storage
  const photos = strArr(o.photos, 6, 500).filter(isValidPhoto);
  return {
    id,
    cat: ALLOWED_CATS.has(cat) ? cat : "kost",
    title: str(o.title),
    loc: str(o.loc),
    type: str(o.type, 100),
    price: str(o.price, 100),
    period: ALLOWED_PERIODS.has(period) ? period : "bln",
    facilities: strArr(o.facilities, 10, 50),
    desc: str(o.desc, 2000),
    photos: photos.length > 0 ? photos : ["ph-1"],
    wa: noJsUrl(str(o.wa, 500)),
  };
}

function validateFaq(f: unknown): { question: string; answer: string } | null {
  if (typeof f !== "object" || !f) return null;
  const o = f as Record<string, unknown>;
  const question = str(o.q, 300);
  const answer = str(o.a, 2000);
  if (!question) return null;
  return { question, answer };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase belum dikonfigurasi di .env.local" }, { status: 503 });
  }

  let settings: Record<string, unknown> | null = null;
  let listings: Record<string, unknown>[] | null = null;
  let faqs: Record<string, unknown>[] | null = null;
  try {
    const db = createServerClient();
    const results = await Promise.all([
      db.from("settings").select("*").eq("id", 1).single(),
      db.from("listings").select("*").order("sort_order"),
      db.from("faqs").select("*").order("sort_order"),
    ]);
    if (results[0].error) throw results[0].error;
    if (results[1].error) throw results[1].error;
    if (results[2].error) throw results[2].error;
    settings = results[0].data as Record<string, unknown>;
    listings = results[1].data as Record<string, unknown>[];
    faqs = results[2].data as Record<string, unknown>[];
  } catch (e) {
    const msg = (e as { message?: string })?.message ?? JSON.stringify(e);
    return NextResponse.json({ error: `Database error: ${msg}` }, { status: 500 });
  }

  return NextResponse.json({
    whatsapp: settings?.whatsapp ?? "",
    hero: {
      widget1: settings?.hero_widget1 ?? {},
      widget2: settings?.hero_widget2 ?? {},
    },
    listings: (listings ?? []).map((l) => ({
      id: l.id, cat: l.cat, title: l.title, loc: l.loc, type: l.type,
      price: l.price, period: l.period, facilities: l.facilities,
      desc: l.description, photos: l.photos, wa: l.wa,
    })),
    faqs: (faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
    contact: settings?.contact ?? {},
  });
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload terlalu besar" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid" }, { status: 400 });
  }

  const rawListings = Array.isArray(body.listings) ? body.listings : [];
  const listings = rawListings.map(validateListing).filter(Boolean) as Record<string, unknown>[];

  const rawFaqs = Array.isArray(body.faqs) ? body.faqs : [];
  const faqs = rawFaqs.map(validateFaq).filter(Boolean) as { question: string; answer: string }[];

  const hw1 = typeof body.hero === "object" && body.hero ? (body.hero as Record<string, unknown>).widget1 : {};
  const hw2 = typeof body.hero === "object" && body.hero ? (body.hero as Record<string, unknown>).widget2 : {};
  const safeWidget = (w: unknown) => {
    if (typeof w !== "object" || !w) return {};
    const o = w as Record<string, unknown>;
    const photo = str(o.photo, 500);
    return {
      pill: str(o.pill), name: str(o.name), loc: str(o.loc),
      price: str(o.price), period: str(o.period),
      photo: isValidWidgetPhoto(photo) ? photo : "",
    };
  };

  const contact = typeof body.contact === "object" && body.contact
    ? {
        phone: str((body.contact as Record<string, unknown>).phone, 50),
        email: str((body.contact as Record<string, unknown>).email, 100),
        coverage: str((body.contact as Record<string, unknown>).coverage, 100),
      }
    : {};

  const waNumber = str(body.whatsapp, 20).replace(/\D/g, "");

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase belum dikonfigurasi di .env.local" }, { status: 503 });
  }

  const db = createServerClient();

  const { error: settingsErr } = await db.from("settings").upsert({
    id: 1,
    whatsapp: waNumber,
    hero_widget1: safeWidget(hw1),
    hero_widget2: safeWidget(hw2),
    contact,
  });
  if (settingsErr) return NextResponse.json({ error: settingsErr.message }, { status: 500 });

  await db.from("listings").delete().neq("id", "");
  if (listings.length > 0) {
    const { error: listErr } = await db.from("listings").insert(
      listings.map((l, i) => {
        const { desc, ...rest } = l;
        return { ...rest, description: desc, sort_order: i };
      })
    );
    if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });
  }

  await db.from("faqs").delete().gte("id", 0);
  if (faqs.length > 0) {
    const { error: faqErr } = await db.from("faqs").insert(
      faqs.map((f, i) => ({ ...f, sort_order: i }))
    );
    if (faqErr) return NextResponse.json({ error: faqErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
