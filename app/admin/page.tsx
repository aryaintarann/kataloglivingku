"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type HeroWidget = { pill: string; name: string; loc: string; price: string; period: string };
type Listing = {
  id: string; cat: string; title: string; loc: string; type: string;
  price: string; period: string; facilities: string[]; desc: string;
  photos: string[]; wa: string;
};
type Faq = { q: string; a: string };
type Contact = { phone: string; email: string; coverage: string };
type Content = {
  whatsapp: string;
  hero: { widget1: HeroWidget; widget2: HeroWidget };
  listings: Listing[];
  faqs: Faq[];
  contact: Contact;
};

const EMPTY_LISTING: Listing = {
  id: "", cat: "kost", title: "", loc: "", type: "", price: "", period: "bln",
  facilities: [], desc: "", photos: ["ph-1"], wa: "",
};
const EMPTY_FAQ: Faq = { q: "", a: "" };
const PHOTO_OPTIONS = ["ph-1", "ph-2", "ph-3", "ph-4", "ph-5", "ph-6"];

// ── Styles ───────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight: "100vh", background: "#f4f5f7", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: "14px", color: "#1a1a1a",
  } as React.CSSProperties,
  header: {
    background: "#1a1a1a", color: "#fff", padding: "0 28px", height: "56px",
    display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky" as const,
    top: 0, zIndex: 100,
  },
  brand: { fontWeight: 700, fontSize: "15px", letterSpacing: "0.02em" },
  gold: { color: "#c9a84c" },
  logoutBtn: {
    background: "none", border: "1px solid rgba(255,255,255,.25)", color: "#fff",
    padding: "5px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px",
  },
  layout: { display: "flex", minHeight: "calc(100vh - 56px)" } as React.CSSProperties,
  sidebar: {
    width: "200px", background: "#fff", borderRight: "1px solid #e5e7eb",
    padding: "20px 12px", flexShrink: 0,
  } as React.CSSProperties,
  sideLabel: { fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.08em", padding: "0 8px", marginBottom: "6px" },
  navBtn: (active: boolean): React.CSSProperties => ({
    display: "block", width: "100%", textAlign: "left", padding: "9px 12px",
    borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13.5px", fontWeight: 500,
    background: active ? "#fdf6e3" : "none", color: active ? "#c9a84c" : "#374151",
    marginBottom: "2px",
  }),
  main: { flex: 1, padding: "28px 32px", maxWidth: "860px" } as React.CSSProperties,
  card: {
    background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,.07)",
  } as React.CSSProperties,
  cardTitle: { fontSize: "15px", fontWeight: 700, marginBottom: "18px", color: "#111" },
  label: { display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px" },
  input: {
    width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db",
    fontSize: "14px", background: "#fafafa", boxSizing: "border-box" as const,
    outline: "none", transition: "border .15s",
  } as React.CSSProperties,
  textarea: {
    width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db",
    fontSize: "14px", background: "#fafafa", boxSizing: "border-box" as const,
    outline: "none", resize: "vertical" as const, minHeight: "80px",
  } as React.CSSProperties,
  select: {
    width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db",
    fontSize: "14px", background: "#fafafa", boxSizing: "border-box" as const,
  } as React.CSSProperties,
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" } as React.CSSProperties,
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" } as React.CSSProperties,
  field: { marginBottom: "14px" } as React.CSSProperties,
  saveBtn: {
    background: "#c9a84c", color: "#fff", border: "none", padding: "10px 24px",
    borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
    marginTop: "4px",
  } as React.CSSProperties,
  saveBtnDisabled: { opacity: 0.6, cursor: "not-allowed" } as React.CSSProperties,
  addBtn: {
    background: "#1a1a1a", color: "#fff", border: "none", padding: "8px 18px",
    borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
  } as React.CSSProperties,
  dangerBtn: {
    background: "none", border: "1px solid #ef4444", color: "#ef4444", padding: "5px 12px",
    borderRadius: "6px", fontSize: "12px", cursor: "pointer",
  } as React.CSSProperties,
  editBtn: {
    background: "none", border: "1px solid #d1d5db", color: "#374151", padding: "5px 12px",
    borderRadius: "6px", fontSize: "12px", cursor: "pointer", marginRight: "6px",
  } as React.CSSProperties,
  cancelBtn: {
    background: "none", border: "1px solid #d1d5db", color: "#6b7280", padding: "9px 18px",
    borderRadius: "8px", fontSize: "14px", cursor: "pointer", marginRight: "10px",
  } as React.CSSProperties,
  toast: (type: "ok" | "err"): React.CSSProperties => ({
    position: "fixed", bottom: "24px", right: "24px", padding: "12px 20px",
    borderRadius: "10px", background: type === "ok" ? "#059669" : "#dc2626",
    color: "#fff", fontSize: "14px", fontWeight: 600, zIndex: 999,
    boxShadow: "0 4px 16px rgba(0,0,0,.15)", animation: "fadeIn .2s ease",
  }),
  listItem: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    padding: "14px 0", borderBottom: "1px solid #f3f4f6",
  } as React.CSSProperties,
  badge: (cat: string): React.CSSProperties => ({
    display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "11px",
    fontWeight: 600, marginRight: "6px",
    background: cat === "kost" ? "#fef9c3" : cat === "apartemen" ? "#dbeafe" : "#fce7f3",
    color: cat === "kost" ? "#854d0e" : cat === "apartemen" ? "#1d4ed8" : "#9d174d",
  }),
  divider: { borderTop: "1px solid #e5e7eb", margin: "20px 0" } as React.CSSProperties,
  photoCheckbox: {
    display: "flex", flexWrap: "wrap" as const, gap: "8px",
  },
  photoChip: (active: boolean): React.CSSProperties => ({
    padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
    border: active ? "2px solid #c9a84c" : "2px solid #e5e7eb",
    background: active ? "#fdf6e3" : "#f9fafb",
    color: active ? "#c9a84c" : "#6b7280",
  }),

  // Login
  loginWrap: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f4f5f7",
  } as React.CSSProperties,
  loginCard: {
    background: "#fff", borderRadius: "16px", padding: "40px", width: "340px",
    boxShadow: "0 4px 24px rgba(0,0,0,.1)",
  } as React.CSSProperties,
  loginTitle: { fontSize: "20px", fontWeight: 800, marginBottom: "6px" },
  loginSub: { color: "#6b7280", fontSize: "13px", marginBottom: "28px" },
  loginBtn: {
    width: "100%", padding: "11px", background: "#1a1a1a", color: "#fff", border: "none",
    borderRadius: "8px", fontSize: "15px", fontWeight: 700, cursor: "pointer", marginTop: "18px",
  } as React.CSSProperties,
  loginError: { color: "#dc2626", fontSize: "13px", marginTop: "10px" },
};

// ── Shared field helpers ──────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={S.field}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

// ── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      sessionStorage.setItem("adminToken", pw);
      onLogin(pw);
    } else {
      setErr(data.error ?? "Login gagal");
    }
  };

  return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <div style={S.loginTitle}>
          <span style={S.gold}>Partner</span> Livingku
        </div>
        <div style={S.loginSub}>Admin Panel — masuk untuk mengelola konten</div>
        <form onSubmit={submit}>
          <Field label="Password Admin">
            <input
              style={S.input}
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Masukkan password"
              autoFocus
            />
          </Field>
          {err && <div style={S.loginError}>{err}</div>}
          <button style={S.loginBtn} type="submit" disabled={loading}>
            {loading ? "Memverifikasi…" : "Masuk →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Photo picker ─────────────────────────────────────────────────────────────

function PhotoPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (p: string) => {
    if (value.includes(p)) onChange(value.filter((x) => x !== p));
    else onChange([...value, p]);
  };
  return (
    <div style={S.photoCheckbox}>
      {PHOTO_OPTIONS.map((p) => (
        <button key={p} type="button" style={S.photoChip(value.includes(p))} onClick={() => toggle(p)}>
          {p}
        </button>
      ))}
    </div>
  );
}

// ── Listing Form ──────────────────────────────────────────────────────────────

function ListingForm({
  initial, onSave, onCancel,
}: { initial: Listing; onSave: (l: Listing) => void; onCancel: () => void }) {
  const [f, setF] = useState<Listing>(initial);
  const set = (k: keyof Listing, v: unknown) => setF((prev) => ({ ...prev, [k]: v }));

  return (
    <div style={{ ...S.card, border: "2px solid #c9a84c" }}>
      <div style={S.cardTitle}>{initial.id ? `Edit: ${initial.title}` : "Tambah Listing Baru"}</div>
      <div style={S.row}>
        <Field label="ID Listing (contoh: JKT-001)">
          <input style={S.input} value={f.id} onChange={(e) => set("id", e.target.value)} placeholder="JKT-001" />
        </Field>
        <Field label="Kategori">
          <select style={S.select} value={f.cat} onChange={(e) => set("cat", e.target.value)}>
            <option value="kost">Kost</option>
            <option value="apartemen">Apartemen</option>
            <option value="harian">Harian</option>
          </select>
        </Field>
      </div>
      <div style={S.row}>
        <Field label="Judul">
          <input style={S.input} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Kost Eksklusif Menteng" />
        </Field>
        <Field label="Tipe (badge)">
          <input style={S.input} value={f.type} onChange={(e) => set("type", e.target.value)} placeholder="Kost Eksklusif" />
        </Field>
      </div>
      <div style={S.row}>
        <Field label="Lokasi (singkat)">
          <input style={S.input} value={f.loc} onChange={(e) => set("loc", e.target.value)} placeholder="Jakarta Pusat" />
        </Field>
        <Field label="Harga">
          <input style={S.input} value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="Rp 2.500.000" />
        </Field>
      </div>
      <div style={S.row}>
        <Field label="Periode">
          <select style={S.select} value={f.period} onChange={(e) => set("period", e.target.value)}>
            <option value="bln">Bulanan (bln)</option>
            <option value="hari">Harian (hari)</option>
            <option value="thn">Tahunan (thn)</option>
          </select>
        </Field>
        <Field label="Fasilitas (pisahkan dengan koma)">
          <input
            style={S.input}
            value={f.facilities.join(", ")}
            onChange={(e) => set("facilities", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            placeholder="AC, WiFi, KM Dalam"
          />
        </Field>
      </div>
      <Field label="Deskripsi">
        <textarea style={S.textarea} value={f.desc} onChange={(e) => set("desc", e.target.value)} rows={3} />
      </Field>
      <Field label="Foto (pilih 1–6 slot, urutan = urutan tampil)">
        <PhotoPicker value={f.photos} onChange={(v) => set("photos", v)} />
      </Field>
      <Field label="Pesan WhatsApp (URL-encoded, tanpa tanda tanya awal)">
        <input
          style={S.input}
          value={f.wa}
          onChange={(e) => set("wa", e.target.value)}
          placeholder="Halo,%20saya%20tertarik%20..."
        />
      </Field>
      <div style={{ marginTop: "6px" }}>
        <button style={S.cancelBtn} type="button" onClick={onCancel}>Batal</button>
        <button style={S.saveBtn} type="button" onClick={() => onSave(f)}>Simpan Listing</button>
      </div>
    </div>
  );
}

// ── FAQ Form ──────────────────────────────────────────────────────────────────

function FaqForm({
  initial, onSave, onCancel,
}: { initial: Faq; onSave: (f: Faq) => void; onCancel: () => void }) {
  const [f, setF] = useState<Faq>(initial);
  return (
    <div style={{ ...S.card, border: "2px solid #c9a84c" }}>
      <div style={S.cardTitle}>{initial.q ? "Edit FAQ" : "Tambah FAQ Baru"}</div>
      <Field label="Pertanyaan">
        <input style={S.input} value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
      </Field>
      <Field label="Jawaban">
        <textarea style={S.textarea} value={f.a} onChange={(e) => setF({ ...f, a: e.target.value })} rows={4} />
      </Field>
      <div style={{ marginTop: "6px" }}>
        <button style={S.cancelBtn} type="button" onClick={onCancel}>Batal</button>
        <button style={S.saveBtn} type="button" onClick={() => onSave(f)}>Simpan FAQ</button>
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────

type Tab = "whatsapp" | "hero" | "listings" | "faq" | "contact";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("whatsapp");
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Listing CRUD state
  const [listingEdit, setListingEdit] = useState<number | "new" | null>(null);
  const [listingForm, setListingForm] = useState<Listing>(EMPTY_LISTING);

  // FAQ CRUD state
  const [faqEdit, setFaqEdit] = useState<number | "new" | null>(null);
  const [faqForm, setFaqForm] = useState<Faq>(EMPTY_FAQ);

  const showToast = (type: "ok" | "err", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchContent = useCallback(async (tok: string) => {
    const res = await fetch("/api/admin", {
      headers: { Authorization: `Bearer ${tok}` },
    });
    if (!res.ok) { showToast("err", "Gagal memuat data"); return; }
    setContent(await res.json());
  }, []);

  // On mount: check sessionStorage token
  useEffect(() => {
    const stored = sessionStorage.getItem("adminToken");
    if (stored) {
      setToken(stored);
      fetchContent(stored).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchContent]);

  const handleLogin = (tok: string) => {
    setToken(tok);
    setLoading(true);
    fetchContent(tok).finally(() => setLoading(false));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setToken(null);
    setContent(null);
  };

  const save = async (updated: Content) => {
    if (!token) return;
    setSaving(true);
    const res = await fetch("/api/admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    if (res.ok) {
      setContent(updated);
      showToast("ok", "Tersimpan!");
    } else {
      showToast("err", "Gagal menyimpan");
    }
  };

  const setC = (patch: Partial<Content>) => setContent((c) => c ? { ...c, ...patch } : c);

  // ── Render: loading / login ──────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ ...S.loginWrap }}>
        <div style={{ color: "#9ca3af", fontSize: "15px" }}>Memuat…</div>
      </div>
    );
  }

  if (!token) return <LoginScreen onLogin={handleLogin} />;

  if (!content) {
    return (
      <div style={S.loginWrap}>
        <div>
          <div style={{ color: "#dc2626", marginBottom: "12px" }}>Gagal memuat konten.</div>
          <button style={S.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  // ── Render: Admin UI ────────────────────────────────────────────────────

  const TAB_LABELS: { key: Tab; label: string }[] = [
    { key: "whatsapp", label: "WhatsApp" },
    { key: "hero", label: "Hero Widgets" },
    { key: "listings", label: "Listing Hunian" },
    { key: "faq", label: "FAQ" },
    { key: "contact", label: "Kontak" },
  ];

  return (
    <div style={S.page}>
      {/* Header */}
      <header style={S.header}>
        <div style={S.brand}>
          <span style={S.gold}>Partner</span> Livingku — Admin
        </div>
        <button style={S.logoutBtn} onClick={handleLogout}>Logout</button>
      </header>

      <div style={S.layout}>
        {/* Sidebar */}
        <aside style={S.sidebar}>
          <div style={S.sideLabel}>Menu</div>
          {TAB_LABELS.map(({ key, label }) => (
            <button key={key} style={S.navBtn(tab === key)} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
          <div style={{ ...S.divider, margin: "16px 0" }} />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...S.navBtn(false), display: "block", textDecoration: "none", color: "#6b7280" }}
          >
            ↗ Lihat Website
          </a>
        </aside>

        {/* Main content */}
        <main style={S.main}>

          {/* ── WhatsApp Tab ────────────────────────────────────────────── */}
          {tab === "whatsapp" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>Nomor WhatsApp</h2>
              <div style={S.card}>
                <div style={S.cardTitle}>Nomor untuk Semua Tombol WA</div>
                <Field label="Nomor WhatsApp (format internasional tanpa +, contoh: 6281234567890)">
                  <input
                    style={S.input}
                    value={content.whatsapp}
                    onChange={(e) => setC({ whatsapp: e.target.value })}
                    placeholder="6281234567890"
                  />
                </Field>
                <p style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "18px" }}>
                  Nomor ini digunakan untuk semua tombol &quot;Chat WhatsApp&quot; di navbar, hero, floating button, dan halaman kontak.
                  Format: kode negara + nomor tanpa spasi (contoh: 62812xxxxxxxx).
                </p>
                <button
                  style={{ ...S.saveBtn, ...(saving ? S.saveBtnDisabled : {}) }}
                  disabled={saving}
                  onClick={() => save(content)}
                >
                  {saving ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </div>
          )}

          {/* ── Hero Widgets Tab ────────────────────────────────────────── */}
          {tab === "hero" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>Hero Widgets</h2>
              <p style={{ color: "#6b7280", marginBottom: "20px", fontSize: "13px" }}>
                Dua kartu mini yang tampil di sebelah kanan hero section sebagai contoh listing unggulan.
              </p>

              {/* Widget 1 */}
              <div style={S.card}>
                <div style={S.cardTitle}>Widget 1 — Kartu Utama (depan)</div>
                <div style={S.row}>
                  <Field label="Label / Tipe (pill)">
                    <input style={S.input} value={content.hero.widget1.pill}
                      onChange={(e) => setC({ hero: { ...content.hero, widget1: { ...content.hero.widget1, pill: e.target.value } } })} />
                  </Field>
                  <Field label="Nama Hunian">
                    <input style={S.input} value={content.hero.widget1.name}
                      onChange={(e) => setC({ hero: { ...content.hero, widget1: { ...content.hero.widget1, name: e.target.value } } })} />
                  </Field>
                </div>
                <div style={S.row}>
                  <Field label="Lokasi">
                    <input style={S.input} value={content.hero.widget1.loc}
                      onChange={(e) => setC({ hero: { ...content.hero, widget1: { ...content.hero.widget1, loc: e.target.value } } })} />
                  </Field>
                  <Field label="Harga">
                    <input style={S.input} value={content.hero.widget1.price}
                      onChange={(e) => setC({ hero: { ...content.hero, widget1: { ...content.hero.widget1, price: e.target.value } } })} />
                  </Field>
                </div>
                <Field label="Periode (contoh: bulan, hari)">
                  <input style={{ ...S.input, maxWidth: "200px" }} value={content.hero.widget1.period}
                    onChange={(e) => setC({ hero: { ...content.hero, widget1: { ...content.hero.widget1, period: e.target.value } } })} />
                </Field>
              </div>

              {/* Widget 2 */}
              <div style={S.card}>
                <div style={S.cardTitle}>Widget 2 — Kartu Kecil (belakang)</div>
                <div style={S.row}>
                  <Field label="Label / Tipe (pill)">
                    <input style={S.input} value={content.hero.widget2.pill}
                      onChange={(e) => setC({ hero: { ...content.hero, widget2: { ...content.hero.widget2, pill: e.target.value } } })} />
                  </Field>
                  <Field label="Nama Hunian">
                    <input style={S.input} value={content.hero.widget2.name}
                      onChange={(e) => setC({ hero: { ...content.hero, widget2: { ...content.hero.widget2, name: e.target.value } } })} />
                  </Field>
                </div>
                <div style={S.row}>
                  <Field label="Lokasi">
                    <input style={S.input} value={content.hero.widget2.loc}
                      onChange={(e) => setC({ hero: { ...content.hero, widget2: { ...content.hero.widget2, loc: e.target.value } } })} />
                  </Field>
                  <Field label="Harga">
                    <input style={S.input} value={content.hero.widget2.price}
                      onChange={(e) => setC({ hero: { ...content.hero, widget2: { ...content.hero.widget2, price: e.target.value } } })} />
                  </Field>
                </div>
                <Field label="Periode">
                  <input style={{ ...S.input, maxWidth: "200px" }} value={content.hero.widget2.period}
                    onChange={(e) => setC({ hero: { ...content.hero, widget2: { ...content.hero.widget2, period: e.target.value } } })} />
                </Field>
              </div>

              <button
                style={{ ...S.saveBtn, ...(saving ? S.saveBtnDisabled : {}) }}
                disabled={saving}
                onClick={() => save(content)}
              >
                {saving ? "Menyimpan…" : "Simpan Perubahan Hero"}
              </button>
            </div>
          )}

          {/* ── Listings Tab ────────────────────────────────────────────── */}
          {tab === "listings" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800 }}>Listing Hunian ({content.listings.length})</h2>
                {listingEdit === null && (
                  <button style={S.addBtn} onClick={() => { setListingForm(EMPTY_LISTING); setListingEdit("new"); }}>
                    + Tambah Listing
                  </button>
                )}
              </div>

              {/* New listing form */}
              {listingEdit === "new" && (
                <ListingForm
                  initial={listingForm}
                  onSave={(l) => {
                    const updated = { ...content, listings: [...content.listings, l] };
                    save(updated);
                    setListingEdit(null);
                  }}
                  onCancel={() => setListingEdit(null)}
                />
              )}

              {/* Listing list */}
              <div style={S.card}>
                {content.listings.length === 0 && (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Belum ada listing.</p>
                )}
                {content.listings.map((l, i) => (
                  <div key={l.id}>
                    {listingEdit === i ? (
                      <ListingForm
                        initial={l}
                        onSave={(updated) => {
                          const listings = content.listings.map((x, j) => (j === i ? updated : x));
                          save({ ...content, listings });
                          setListingEdit(null);
                        }}
                        onCancel={() => setListingEdit(null)}
                      />
                    ) : (
                      <div style={S.listItem}>
                        <div style={{ flex: 1 }}>
                          <div style={{ marginBottom: "4px" }}>
                            <span style={S.badge(l.cat)}>{l.cat}</span>
                            <span style={{ fontWeight: 700, fontSize: "14px" }}>{l.title}</span>
                            <span style={{ color: "#9ca3af", fontSize: "12px", marginLeft: "8px" }}>{l.id}</span>
                          </div>
                          <div style={{ color: "#6b7280", fontSize: "12px" }}>
                            📍 {l.loc} · {l.price}/{l.period} · Foto: {l.photos.join(", ")}
                          </div>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                          <button style={S.editBtn} onClick={() => { setListingForm(l); setListingEdit(i); }}>Edit</button>
                          <button
                            style={S.dangerBtn}
                            onClick={() => {
                              if (!confirm(`Hapus listing "${l.title}"?`)) return;
                              const listings = content.listings.filter((_, j) => j !== i);
                              save({ ...content, listings });
                            }}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAQ Tab ─────────────────────────────────────────────────── */}
          {tab === "faq" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800 }}>FAQ ({content.faqs.length})</h2>
                {faqEdit === null && (
                  <button style={S.addBtn} onClick={() => { setFaqForm(EMPTY_FAQ); setFaqEdit("new"); }}>
                    + Tambah FAQ
                  </button>
                )}
              </div>

              {faqEdit === "new" && (
                <FaqForm
                  initial={faqForm}
                  onSave={(f) => {
                    const updated = { ...content, faqs: [...content.faqs, f] };
                    save(updated);
                    setFaqEdit(null);
                  }}
                  onCancel={() => setFaqEdit(null)}
                />
              )}

              <div style={S.card}>
                {content.faqs.length === 0 && (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Belum ada FAQ.</p>
                )}
                {content.faqs.map((f, i) => (
                  <div key={i}>
                    {faqEdit === i ? (
                      <FaqForm
                        initial={f}
                        onSave={(updated) => {
                          const faqs = content.faqs.map((x, j) => (j === i ? updated : x));
                          save({ ...content, faqs });
                          setFaqEdit(null);
                        }}
                        onCancel={() => setFaqEdit(null)}
                      />
                    ) : (
                      <div style={S.listItem}>
                        <div style={{ flex: 1, paddingRight: "16px" }}>
                          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{f.q}</div>
                          <div style={{ color: "#6b7280", fontSize: "12px" }}>{f.a.slice(0, 100)}{f.a.length > 100 ? "…" : ""}</div>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                          <button style={S.editBtn} onClick={() => { setFaqForm(f); setFaqEdit(i); }}>Edit</button>
                          <button
                            style={S.dangerBtn}
                            onClick={() => {
                              if (!confirm("Hapus FAQ ini?")) return;
                              const faqs = content.faqs.filter((_, j) => j !== i);
                              save({ ...content, faqs });
                            }}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Contact Tab ─────────────────────────────────────────────── */}
          {tab === "contact" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>Informasi Kontak</h2>
              <div style={S.card}>
                <div style={S.cardTitle}>Info yang Tampil di Halaman Contact</div>
                <Field label="Nomor Telepon (tampilan, contoh: +62 812-3456-7890)">
                  <input
                    style={S.input}
                    value={content.contact.phone}
                    onChange={(e) => setC({ contact: { ...content.contact, phone: e.target.value } })}
                    placeholder="+62 812-3456-7890"
                  />
                </Field>
                <Field label="Email">
                  <input
                    style={S.input}
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => setC({ contact: { ...content.contact, email: e.target.value } })}
                    placeholder="halo@partnerlivingku.id"
                  />
                </Field>
                <Field label="Cakupan Layanan (tampilan, contoh: 20+ Kota di Indonesia)">
                  <input
                    style={S.input}
                    value={content.contact.coverage}
                    onChange={(e) => setC({ contact: { ...content.contact, coverage: e.target.value } })}
                    placeholder="20+ Kota di Indonesia"
                  />
                </Field>
                <button
                  style={{ ...S.saveBtn, ...(saving ? S.saveBtnDisabled : {}) }}
                  disabled={saving}
                  onClick={() => save(content)}
                >
                  {saving ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Toast */}
      {toast && <div style={S.toast(toast.type)}>{toast.text}</div>}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        input:focus, textarea:focus, select:focus { border-color: #c9a84c !important; background: #fff !important; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
