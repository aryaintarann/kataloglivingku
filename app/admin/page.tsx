"use client";

import { useState, useEffect, useCallback } from "react";

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type HeroWidget = { pill: string; name: string; loc: string; price: string; period: string; photo: string };
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

const EMPTY_WIDGET: HeroWidget = { pill: "", name: "", loc: "", price: "", period: "", photo: "" };
const EMPTY_LISTING: Listing = {
  id: "", cat: "kost", title: "", loc: "", type: "", price: "", period: "bln",
  facilities: [], desc: "", photos: [], wa: "",
};
const EMPTY_FAQ: Faq = { q: "", a: "" };

// â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    position: "sticky" as const, top: "56px",
    height: "calc(100vh - 56px)", overflowY: "auto" as const,
    alignSelf: "flex-start" as const,
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

// â”€â”€ Shared helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={S.field}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

async function uploadPhoto(file: File, folder: "listings" | "hero", token: string): Promise<string | null> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  const data = await res.json();
  return data.url ?? null;
}

// â”€â”€ Photo Grid (shared untuk listing & widget) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function PhotoGrid({
  photos, onRemove, onAdd, maxPhotos = 6, uploading, token, folder,
}: {
  photos: string[];
  onRemove: (i: number) => void;
  onAdd: (urls: string[]) => void;
  maxPhotos?: number;
  uploading: boolean;
  token: string;
  folder: "listings" | "hero";
}) {
  const [busy, setBusy] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setBusy(true);
    const remaining = maxPhotos - photos.length;
    const toUpload = files.slice(0, remaining);
    const urls: string[] = [];
    for (const f of toUpload) {
      const url = await uploadPhoto(f, folder, token);
      if (url) urls.push(url);
    }
    onAdd(urls);
    setBusy(false);
    e.target.value = "";
  };

  const isBusy = busy || uploading;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {photos.map((p, i) => (
        <div key={i} style={{ position: "relative", width: "110px", height: "80px", borderRadius: "8px", overflow: "hidden", background: "#e5e7eb", flexShrink: 0 }}>
          <img src={p.startsWith("http") ? p : undefined} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: p.startsWith("http") ? "block" : "none" }} />
          {!p.startsWith("http") && (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#6b7280", fontWeight: 600 }}>{p}</div>
          )}
          <button
            type="button"
            onClick={() => onRemove(i)}
            style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,.65)", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", fontSize: "13px", lineHeight: 1, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >âœ•</button>
        </div>
      ))}
      {photos.length < maxPhotos && (
        <label style={{ width: "110px", height: "80px", borderRadius: "8px", border: "2px dashed #d1d5db", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: isBusy ? "default" : "pointer", color: "#9ca3af", fontSize: "12px", gap: "4px", flexShrink: 0 }}>
          <span style={{ fontSize: "20px", lineHeight: 1 }}>{isBusy ? "â³" : "+"}</span>
          <span>{isBusy ? "Uploading…" : "Tambah Foto"}</span>
          <input type="file" accept="image/*" multiple={maxPhotos > 1} style={{ display: "none" }} onChange={handleFiles} disabled={isBusy} />
        </label>
      )}
    </div>
  );
}

// â”€â”€ Login Screen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
        <div style={S.loginSub}>Admin Panel – masuk untuk mengelola konten</div>
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

// â”€â”€ Listing Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ListingForm({
  initial, onSave, onCancel, token,
}: { initial: Listing; onSave: (l: Listing) => void; onCancel: () => void; token: string }) {
  const [f, setF] = useState<Listing>(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof Listing, v: unknown) => setF((prev) => ({ ...prev, [k]: v }));

  return (
    <div style={{ ...S.card, border: "2px solid #c9a84c" }}>
      <div style={S.cardTitle}>{initial.id ? `Edit: ${initial.title}` : "Tambah Listing Baru"}</div>
      <div style={S.row} className="adm-row">
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
      <div style={S.row} className="adm-row">
        <Field label="Judul">
          <input style={S.input} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Kost Eksklusif Menteng" />
        </Field>
        <Field label="Tipe (badge)">
          <input style={S.input} value={f.type} onChange={(e) => set("type", e.target.value)} placeholder="Kost Eksklusif" />
        </Field>
      </div>
      <div style={S.row} className="adm-row">
        <Field label="Lokasi">
          <input style={S.input} value={f.loc} onChange={(e) => set("loc", e.target.value)} placeholder="Jakarta Pusat" />
        </Field>
        <Field label="Harga">
          <input style={S.input} value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="Rp 2.500.000" />
        </Field>
      </div>
      <div style={S.row} className="adm-row">
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
      <Field label="Foto (maks 6 foto, maks 5 MB/foto — JPG, PNG, WebP)">
        <PhotoGrid
          photos={f.photos}
          onRemove={(i) => set("photos", f.photos.filter((_, j) => j !== i))}
          onAdd={(urls) => set("photos", [...f.photos, ...urls].slice(0, 6))}
          maxPhotos={6}
          uploading={saving}
          token={token}
          folder="listings"
        />
        <p style={{ color: "#9ca3af", fontSize: "11px", marginTop: "8px", lineHeight: 1.5 }}>
          📐 <b style={{ color: "#6b7280" }}>Ukuran ideal: 16:9 landscape — min. 800×450px, disarankan 1200×675px.</b><br />
          Foto tampil di kartu listing (366×220px) dan modal detail (680×300px), keduanya crop tengah.
          Foto portrait atau square akan terpotong signifikan di sisi kiri–kanan.
        </p>
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
        <button
          style={{ ...S.saveBtn, ...(saving ? S.saveBtnDisabled : {}) }}
          type="button"
          disabled={saving}
          onClick={() => { setSaving(true); onSave(f); }}
        >Simpan Listing</button>
      </div>
    </div>
  );
}

// â”€â”€ FAQ Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€ Hero Widget Editor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function WidgetEditor({
  label, widget, onChange, token, saving,
}: {
  label: string;
  widget: HeroWidget;
  onChange: (w: HeroWidget) => void;
  token: string;
  saving: boolean;
}) {
  const set = (k: keyof HeroWidget, v: string) => onChange({ ...widget, [k]: v });
  return (
    <div style={S.card}>
      <div style={S.cardTitle}>{label}</div>
      <div style={S.row} className="adm-row">
        <Field label="Label / Tipe (pill)">
          <input style={S.input} value={widget.pill} onChange={(e) => set("pill", e.target.value)} />
        </Field>
        <Field label="Nama Hunian">
          <input style={S.input} value={widget.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
      </div>
      <div style={S.row} className="adm-row">
        <Field label="Lokasi">
          <input style={S.input} value={widget.loc} onChange={(e) => set("loc", e.target.value)} />
        </Field>
        <Field label="Harga">
          <input style={S.input} value={widget.price} onChange={(e) => set("price", e.target.value)} />
        </Field>
      </div>
      <Field label="Periode (contoh: bulan, hari)">
        <input style={{ ...S.input, maxWidth: "200px" }} value={widget.period} onChange={(e) => set("period", e.target.value)} />
      </Field>
      <Field label="Foto Hero Card (opsional, maks 5 MB — JPG, PNG, WebP)">
        <PhotoGrid
          photos={widget.photo ? [widget.photo] : []}
          onRemove={() => set("photo", "")}
          onAdd={(urls) => set("photo", urls[0] ?? "")}
          maxPhotos={1}
          uploading={saving}
          token={token}
          folder="hero"
        />
        <p style={{ color: "#9ca3af", fontSize: "11px", marginTop: "8px", lineHeight: 1.5 }}>
          📐 <b style={{ color: "#6b7280" }}>Ukuran ideal: 2:1 landscape — min. 680×340px, disarankan 1200×600px.</b><br />
          Widget 1 tampil 340×170px · Widget 2 tampil 260×120px (crop tengah). Foto portrait akan tercrop banyak.
        </p>
      </Field>
    </div>
  );
}

// â”€â”€ Main Admin Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Tab = "whatsapp" | "hero" | "listings" | "faq" | "contact";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("whatsapp");
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [listingEdit, setListingEdit] = useState<number | "new" | null>(null);
  const [faqEdit, setFaqEdit] = useState<number | "new" | null>(null);

  const showToast = (type: "ok" | "err", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchContent = useCallback(async (tok: string) => {
    const res = await fetch("/api/admin", {
      headers: { Authorization: `Bearer ${tok}` },
    });
    if (!res.ok) { showToast("err", "Gagal memuat data"); return; }
    const data = await res.json();
    // Pastikan hero widgets selalu punya field photo
    if (data.hero?.widget1 && data.hero.widget1.photo === undefined) data.hero.widget1.photo = "";
    if (data.hero?.widget2 && data.hero.widget2.photo === undefined) data.hero.widget2.photo = "";
    setContent(data);
  }, []);

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
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setContent(updated);
      showToast("ok", "Tersimpan!");
    } else {
      showToast("err", data.error ?? "Gagal menyimpan");
    }
  };

  const setC = (patch: Partial<Content>) => setContent((c) => c ? { ...c, ...patch } : c);

  if (loading) {
    return (
      <div style={S.loginWrap}>
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

  const TAB_LABELS: { key: Tab; label: string }[] = [
    { key: "whatsapp", label: "WhatsApp" },
    { key: "hero", label: "Hero Widgets" },
    { key: "listings", label: "Listing Hunian" },
    { key: "faq", label: "FAQ" },
    { key: "contact", label: "Kontak" },
  ];

  return (
    <div style={S.page}>
      <header style={S.header}>
        <div style={S.brand}>
          <span style={S.gold}>Partner</span> Livingku — Admin
        </div>
        <button style={S.logoutBtn} onClick={handleLogout}>Logout</button>
      </header>

      {/* Mobile tab bar */}
      <div className="adm-mobiletabs">
        {TAB_LABELS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`adm-tabpill${tab === key ? " adm-tabpill-active" : ""}`}
          >
            {label}
          </button>
        ))}
        <a href="/" target="_blank" rel="noopener noreferrer" className="adm-tabpill adm-tablink">
          ↗ Website
        </a>
      </div>

      <div style={S.layout} className="adm-layout">
        <aside style={S.sidebar} className="adm-sidebar">
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

        <main style={S.main} className="adm-main">

          {/* â”€â”€ WhatsApp Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                  Digunakan untuk semua tombol &quot;Chat WhatsApp&quot; di seluruh halaman.
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

          {/* â”€â”€ Hero Widgets Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {tab === "hero" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>Hero Widgets</h2>
              <p style={{ color: "#6b7280", marginBottom: "20px", fontSize: "13px" }}>
                Dua kartu mini yang tampil di hero section sebagai contoh listing unggulan.
              </p>
              <WidgetEditor
                label="Widget 1 — Kartu Utama (depan)"
                widget={content.hero.widget1}
                onChange={(w) => setC({ hero: { ...content.hero, widget1: w } })}
                token={token}
                saving={saving}
              />
              <WidgetEditor
                label="Widget 2 — Kartu Kecil (belakang)"
                widget={content.hero.widget2}
                onChange={(w) => setC({ hero: { ...content.hero, widget2: w } })}
                token={token}
                saving={saving}
              />
              <button
                style={{ ...S.saveBtn, ...(saving ? S.saveBtnDisabled : {}) }}
                disabled={saving}
                onClick={() => save(content)}
              >
                {saving ? "Menyimpan…" : "Simpan Perubahan Hero"}
              </button>
            </div>
          )}

          {/* â”€â”€ Listings Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {tab === "listings" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800 }}>Listing Hunian ({content.listings.length})</h2>
                {listingEdit === null && (
                  <button style={S.addBtn} onClick={() => setListingEdit("new")}>
                    + Tambah Listing
                  </button>
                )}
              </div>

              {listingEdit === "new" && (
                <ListingForm
                  initial={EMPTY_LISTING}
                  token={token}
                  onSave={(l) => {
                    const updated = { ...content, listings: [...content.listings, l] };
                    save(updated);
                    setListingEdit(null);
                  }}
                  onCancel={() => setListingEdit(null)}
                />
              )}

              <div style={S.card}>
                {content.listings.length === 0 && (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Belum ada listing.</p>
                )}
                {content.listings.map((l, i) => (
                  <div key={l.id}>
                    {listingEdit === i ? (
                      <ListingForm
                        initial={l}
                        token={token}
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
                          <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={S.badge(l.cat)}>{l.cat}</span>
                            <span style={{ fontWeight: 700, fontSize: "14px" }}>{l.title}</span>
                            <span style={{ color: "#9ca3af", fontSize: "12px" }}>{l.id}</span>
                          </div>
                          <div style={{ color: "#6b7280", fontSize: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                            <span>ðŸ“ {l.loc}</span>
                            <span>{l.price}/{l.period}</span>
                            <span>{l.photos.length} foto</span>
                          </div>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                          <button style={S.editBtn} onClick={() => setListingEdit(i)}>Edit</button>
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

          {/* â”€â”€ FAQ Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {tab === "faq" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800 }}>FAQ ({content.faqs.length})</h2>
                {faqEdit === null && (
                  <button style={S.addBtn} onClick={() => setFaqEdit("new")}>
                    + Tambah FAQ
                  </button>
                )}
              </div>

              {faqEdit === "new" && (
                <FaqForm
                  initial={EMPTY_FAQ}
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
                          <button style={S.editBtn} onClick={() => setFaqEdit(i)}>Edit</button>
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

          {/* â”€â”€ Contact Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {toast && <div style={S.toast(toast.type)}>{toast.text}</div>}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        input:focus, textarea:focus, select:focus { border-color: #c9a84c !important; background: #fff !important; }
        * { box-sizing: border-box; }

        .adm-layout { display: flex; min-height: calc(100vh - 56px); }
        .adm-main { min-width: 0; }
        .adm-mobiletabs { display: none; }

        .adm-tabpill {
          flex-shrink: 0; white-space: nowrap; border: none; cursor: pointer;
          padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
          background: none; color: #374151; font-family: inherit;
          transition: background .15s, color .15s;
        }
        .adm-tabpill:hover { background: #f3f4f6; }
        .adm-tabpill-active { background: #fdf6e3 !important; color: #c9a84c !important; }
        .adm-tablink { text-decoration: none; color: #9ca3af !important; }
        .adm-tablink:hover { background: #f3f4f6 !important; color: #374151 !important; }

        @media (max-width: 767px) {
          .adm-layout { flex-direction: column; }
          .adm-sidebar { display: none !important; }
          .adm-mobiletabs {
            display: flex; overflow-x: auto; gap: 4px;
            padding: 8px 12px; background: #fff;
            border-bottom: 1px solid #e5e7eb;
            position: sticky; top: 56px; z-index: 50;
            scrollbar-width: none; -webkit-overflow-scrolling: touch;
          }
          .adm-mobiletabs::-webkit-scrollbar { display: none; }
          .adm-main { padding: 16px !important; max-width: 100% !important; }
          .adm-row { grid-template-columns: 1fr !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .adm-sidebar { width: 170px !important; padding: 16px 10px !important; }
          .adm-main { padding: 20px 24px !important; }
        }
      `}</style>
    </div>
  );
}

