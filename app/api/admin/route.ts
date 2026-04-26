import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

function isAuthorized(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return req.headers.get("authorization") === `Bearer ${expected}`;
}

export async function GET() {
  const db = createServerClient();

  const [{ data: settings }, { data: listings }, { data: faqs }] = await Promise.all([
    db.from("settings").select("*").eq("id", 1).single(),
    db.from("listings").select("*").order("sort_order"),
    db.from("faqs").select("*").order("sort_order"),
  ]);

  return NextResponse.json({
    whatsapp: settings?.whatsapp ?? "",
    hero: {
      widget1: settings?.hero_widget1 ?? {},
      widget2: settings?.hero_widget2 ?? {},
    },
    listings: (listings ?? []).map((l) => ({
      id: l.id, cat: l.cat, title: l.title, loc: l.loc, type: l.type,
      price: l.price, period: l.period, facilities: l.facilities,
      desc: l.desc, photos: l.photos, wa: l.wa,
    })),
    faqs: (faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
    contact: settings?.contact ?? {},
  });
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const db = createServerClient();

  // 1. Upsert settings (always id = 1)
  const { error: settingsErr } = await db.from("settings").upsert({
    id: 1,
    whatsapp: body.whatsapp,
    hero_widget1: body.hero.widget1,
    hero_widget2: body.hero.widget2,
    contact: body.contact,
  });
  if (settingsErr) return NextResponse.json({ error: settingsErr.message }, { status: 500 });

  // 2. Replace listings: delete all then re-insert
  await db.from("listings").delete().neq("id", "");
  if (body.listings.length > 0) {
    const { error: listErr } = await db.from("listings").insert(
      body.listings.map((l: Record<string, unknown>, i: number) => ({
        id: l.id, cat: l.cat, title: l.title, loc: l.loc, type: l.type,
        price: l.price, period: l.period, facilities: l.facilities,
        desc: l.desc, photos: l.photos, wa: l.wa, sort_order: i,
      }))
    );
    if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });
  }

  // 3. Replace FAQs: delete all then re-insert
  await db.from("faqs").delete().gte("id", 0);
  if (body.faqs.length > 0) {
    const { error: faqErr } = await db.from("faqs").insert(
      body.faqs.map((f: Record<string, string>, i: number) => ({
        question: f.q, answer: f.a, sort_order: i,
      }))
    );
    if (faqErr) return NextResponse.json({ error: faqErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
