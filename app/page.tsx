import { createServerClient } from "@/lib/supabase";
import ClientInteractions from "@/components/ClientInteractions";

export const dynamic = "force-dynamic";

// ── Types ─────────────────────────────────────────────────────────────────────

type HeroWidget = { pill: string; name: string; loc: string; price: string; period: string };
type Listing = {
  id: string; cat: string; title: string; loc: string; type: string;
  price: string; period: string; facilities: string[]; desc: string;
  photos: string[]; wa: string;
};
type Faq = { q: string; a: string };
type Content = {
  whatsapp: string;
  hero: { widget1: HeroWidget; widget2: HeroWidget };
  listings: Listing[];
  faqs: Faq[];
  contact: { phone: string; email: string; coverage: string };
};

const DEFAULT: Content = {
  whatsapp: "6281234567890",
  hero: {
    widget1: { pill: "Kost Eksklusif", name: "Kost Menteng Premium", loc: "Jakarta Pusat · 5 menit ke MRT", price: "Rp 2.500.000", period: "bulan" },
    widget2: { pill: "Apartemen", name: "Studio Dago View", loc: "Bandung", price: "Rp 3,2 jt", period: "bulan" },
  },
  listings: [],
  faqs: [],
  contact: { phone: "+62 812-3456-7890", email: "halo@partnerlivingku.id", coverage: "20+ Kota di Indonesia" },
};

async function getContent(): Promise<Content> {
  try {
    const db = createServerClient();
    const [{ data: settings }, { data: listings }, { data: faqs }] = await Promise.all([
      db.from("settings").select("*").eq("id", 1).single(),
      db.from("listings").select("*").order("sort_order"),
      db.from("faqs").select("*").order("sort_order"),
    ]);
    if (!settings) return DEFAULT;
    return {
      whatsapp: settings.whatsapp,
      hero: { widget1: settings.hero_widget1, widget2: settings.hero_widget2 },
      listings: (listings ?? []).map((l) => ({
        id: l.id, cat: l.cat, title: l.title, loc: l.loc, type: l.type,
        price: l.price, period: l.period, facilities: l.facilities,
        desc: l.desc, photos: l.photos, wa: l.wa,
      })),
      faqs: (faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
      contact: settings.contact,
    };
  } catch {
    return DEFAULT;
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.164 0 0 7.163 0 16c0 2.833.742 5.487 2.034 7.79L0 32l8.42-2.006A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0Zm0 29.333a13.27 13.27 0 0 1-6.747-1.836l-.483-.287-5 1.191 1.22-4.863-.315-.5A13.248 13.248 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333Zm7.273-9.927c-.397-.199-2.35-1.159-2.715-1.29-.364-.133-.63-.199-.895.199-.266.397-1.03 1.29-1.262 1.555-.233.265-.465.298-.862.1-.397-.2-1.676-.618-3.192-1.97-1.18-1.052-1.977-2.35-2.21-2.748-.232-.397-.025-.612.175-.81.18-.178.397-.464.596-.696.199-.232.265-.397.397-.662.133-.265.067-.497-.033-.696-.1-.199-.895-2.157-1.227-2.953-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.06.497-.364.397-1.39 1.358-1.39 3.312 0 1.953 1.423 3.84 1.622 4.105.199.265 2.8 4.275 6.784 5.996.948.41 1.688.654 2.265.837.952.302 1.819.26 2.504.158.764-.114 2.35-.96 2.682-1.887.332-.928.332-1.723.232-1.887-.099-.166-.364-.265-.762-.464Z" />
    </svg>
  );
}

function ListingCard({ l, waBase }: { l: Listing; waBase: string }) {
  const waText = `Halo,%20saya%20tertarik%20${encodeURIComponent(l.title)}`;
  return (
    <article
      className="listing reveal"
      data-cat={l.cat}
      data-title={l.title}
      data-loc={l.loc}
      data-type={l.type}
      data-price={l.price}
      data-period={l.period}
      data-facilities={l.facilities.join(",")}
      data-desc={l.desc}
      data-photos={l.photos.join(",")}
      data-wa={l.wa || waText}
    >
      <div className="photo">
        <div className={`ph ${l.photos[0] ?? "ph-1"}`} />
        <span className="badge-type">{l.type}</span>
        <span className="badge-verified">✓ Verified</span>
      </div>
      <div className="body">
        <h3>{l.title}</h3>
        <div className="loc">📍 {l.loc}</div>
        <div className="facilities">
          {l.facilities.map((f) => <span key={f}>{f}</span>)}
        </div>
        <div className="price-row">
          <div className="price">{l.price}<small>/{l.period}</small></div>
          <span className="listing-code">{l.id}</span>
        </div>
        <div className="actions">
          <button className="btn btn-outline btn-detail">Detail</button>
          <a href={`${waBase}?text=${l.wa || waText}`} target="_blank" rel="noopener noreferrer" className="btn btn-wa">Chat WA</a>
        </div>
      </div>
    </article>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function Home() {
  const c = await getContent();
  const WA_BASE = `https://wa.me/${c.whatsapp}`;
  const WA_DEFAULT = `${WA_BASE}?text=Halo%20Partner%20Livingku%2C%20saya%20ingin%20mencari%20hunian`;

  return (
    <>
      <ClientInteractions />
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />

      {/* ========== NAVBAR ========== */}
      <header className="nav" id="nav">
        <div className="container">
          <a href="#top" className="logo" aria-label="Partner Livingku — Beranda">
            <span><b>Partner</b> <i>Livingku</i></span>
          </a>

          <nav aria-label="Navigasi utama">
            <ul className="nav-links">
              <li><a href="#top" className="active">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#testimoni">Testimoni</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <div className="nav-cta">
            <a href={WA_DEFAULT} className="btn btn-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp">
              <WhatsAppIcon size={16} />
              Chat WhatsApp
            </a>
            <button className="hamburger" id="hamburger" aria-label="Buka menu" aria-controls="drawer" aria-expanded="false">
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="scrim" id="scrim" />
      <aside className="drawer" id="drawer" aria-label="Menu navigasi mobile">
        <a href="#top">Home</a>
        <a href="#about">About Us</a>
        <a href="#services">Our Services</a>
        <a href="#testimoni">Testimoni</a>
        <a href="#contact">Contact</a>
        <a href={WA_BASE} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={16} />
          Chat WhatsApp
        </a>
      </aside>

      <main id="top" data-wabase={WA_BASE}>

        {/* ========== HERO ========== */}
        <section className="hero">
          <div className="batik-bg" aria-hidden="true" />
          <span className="hero-blob" aria-hidden="true" />
          <span className="hero-blob-2" aria-hidden="true" />
          <div className="container">
            <div className="hero-copy reveal">
              <span className="eyebrow">Direktori Hunian Indonesia</span>
              <h1>Temukan Kost &amp; Apartemen <em>Terbaik</em> di Indonesia</h1>
              <p className="hero-sub">Dari Sabang sampai Merauke — pilihan hunian terverifikasi, harga transparan, dan langsung hubungi owner tanpa perantara.</p>
              <div className="hero-actions">
                <a href="#services" className="btn btn-primary btn-lg">Lihat Katalog →</a>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                  <WhatsAppIcon size={16} />
                  Chat WhatsApp
                </a>
              </div>
              <div className="trust-bar">
                <span><b>20+</b> Kota</span>
                <span className="dot" />
                <span>✓ Terverifikasi</span>
              </div>
            </div>

            <div className="hero-visual reveal" aria-hidden="true">
              <article className="hero-card main">
                <div className="ph">
                  <span className="pill">{c.hero.widget1.pill}</span>
                  <span className="heart">♥</span>
                </div>
                <div className="meta">
                  <div className="name">{c.hero.widget1.name}</div>
                  <div className="loc">📍 {c.hero.widget1.loc}</div>
                  <div className="price">{c.hero.widget1.price} <small>/{c.hero.widget1.period}</small></div>
                </div>
              </article>
              <article className="hero-card alt">
                <div className="ph">
                  <span className="pill">{c.hero.widget2.pill}</span>
                </div>
                <div className="meta">
                  <div className="name">{c.hero.widget2.name}</div>
                  <div className="loc">📍 {c.hero.widget2.loc}</div>
                  <div className="price">{c.hero.widget2.price} <small>/{c.hero.widget2.period}</small></div>
                </div>
              </article>
            </div>
          </div>
        </section>


        {/* ========== ABOUT ========== */}
        <section className="section about" id="about">
          <div className="batik-bg" aria-hidden="true" />
          <div className="container">
            <div className="about-copy reveal">
              <span className="eyebrow">Tentang Kami</span>
              <h2>Mengapa Memilih Partner Livingku?</h2>
              <p className="lede">Kami percaya mencari hunian seharusnya tidak rumit. Partner Livingku menghadirkan direktori kost dan apartemen yang setiap listing-nya kami verifikasi langsung — foto sesuai aslinya, harga transparan, dan owner siap dihubungi via WhatsApp.</p>

              <div className="features">
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c0 5-4 8.5-9 9-5-.5-9-4-9-9V6l9-3 9 3v6z" />
                    </svg>
                  </div>
                  <h4>Listing Terverifikasi</h4>
                  <p>Setiap properti dicek tim kami — alamat, fasilitas, dan keaslian owner.</p>
                </div>
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10M9 9h4.5a2 2 0 010 4h-3a2 2 0 000 4H15" />
                    </svg>
                  </div>
                  <h4>Harga Transparan</h4>
                  <p>Tidak ada biaya tersembunyi. Harga yang tertera adalah harga yang dibayar.</p>
                </div>
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <circle cx="12" cy="13" r="3.5" />
                      <path d="M8 6l1.5-2h5L16 6" />
                    </svg>
                  </div>
                  <h4>Foto Real &amp; Akurat</h4>
                  <p>Foto diambil langsung di lokasi — tidak ada gambar generik dari internet.</p>
                </div>
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                    </svg>
                  </div>
                  <h4>Respon Cepat via WA</h4>
                  <p>Tim kami online Senin–Minggu, 08.00–21.00 WIB. Balas dalam hitungan menit.</p>
                </div>
              </div>
            </div>

            <div className="about-visual reveal">
              <div className="stats-card">
                <span className="eyebrow stats-eyebrow">Angka Kami</span>
                <h3>Dipercaya ribuan pencari hunian</h3>
                <p className="sub">Sejak 2022, kami terus tumbuh bersama komunitas kost dan apartemen di Indonesia.</p>
                <div className="stat-grid stat-grid-2">
                  <div className="stat">
                    <div className="num">
                      <span className="counter" data-count="20">0</span>
                      <small>+</small>
                    </div>
                    <div className="lbl">Kota Tersedia</div>
                  </div>
                  <div className="stat">
                    <div className="num">
                      <span className="counter" data-count="1000">0</span>
                      <small>+</small>
                    </div>
                    <div className="lbl">Penghuni Puas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== SERVICES / LISTINGS ========== */}
        <section className="section services" id="services">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Listing Pilihan</span>
              <h2>Temukan Hunian yang Tepat Untukmu</h2>
              <p>Pilih kategori sesuai kebutuhan — semua sudah terverifikasi dan siap dihubungi langsung ke owner.</p>
            </div>

            <div className="filter-tabs reveal" role="tablist" aria-label="Filter tipe hunian">
              <button className="active" data-filter="all" role="tab" aria-selected="true">Semua</button>
              <button data-filter="kost" role="tab" aria-selected="false">Kost</button>
              <button data-filter="apartemen" role="tab" aria-selected="false">Apartemen</button>
              <button data-filter="harian" role="tab" aria-selected="false">Harian</button>
            </div>

            <div className="listing-grid" id="listingGrid">
              {c.listings.map((l) => (
                <ListingCard key={l.id} l={l} waBase={WA_BASE} />
              ))}
            </div>
          </div>
        </section>

        {/* ========== TESTIMONI ========== */}
        <section className="section testimoni" id="testimoni">
          <div className="batik-bg" aria-hidden="true" />
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Testimoni</span>
              <h2>Apa Kata Mereka?</h2>
              <div className="gold-band" style={{ marginTop: "18px" }}>
                <span className="stars">★★★★★</span>
                <span><b>4.9/5</b> rating dari 200+ penghuni</span>
              </div>
            </div>

            <div className="testi-grid reveal-stagger">
              <article className="testi-card">
                <span className="quote-mark">&ldquo;</span>
                <div className="stars">★★★★★</div>
                <blockquote>Proses nyarinya gampang banget, langsung direspon tim-nya. Kost yang saya temukan sesuai banget sama foto!</blockquote>
                <div className="person">
                  <div className="avatar av-1">RP</div>
                  <div>
                    <div className="who">Rizky Pratama</div>
                    <div className="meta">Jakarta · Kost Eksklusif</div>
                  </div>
                </div>
              </article>

              <article className="testi-card">
                <span className="quote-mark">&ldquo;</span>
                <div className="stars">★★★★★</div>
                <blockquote>Partner Livingku beneran bantu saya pas pindah kerja ke Bandung. Dalam 2 hari langsung dapat hunian yang cocok.</blockquote>
                <div className="person">
                  <div className="avatar av-2">SD</div>
                  <div>
                    <div className="who">Sari Dewi</div>
                    <div className="meta">Bandung · Apartemen Studio</div>
                  </div>
                </div>
              </article>

              <article className="testi-card">
                <span className="quote-mark">&ldquo;</span>
                <div className="stars">★★★★★</div>
                <blockquote>Rekomendasiin ke temen-temen, listing-nya banyak dan harganya transparan. Gak ada biaya tersembunyi!</blockquote>
                <div className="person">
                  <div className="avatar av-3">AF</div>
                  <div>
                    <div className="who">Ahmad Fauzi</div>
                    <div className="meta">Surabaya · Kost Putri</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="section faq" id="faq">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">FAQ</span>
              <h2 style={{ marginTop: "14px" }}>Pertanyaan yang Sering Ditanyakan</h2>
              <p style={{ color: "var(--muted)", marginTop: "16px", maxWidth: "36ch" }}>
                Belum ketemu jawabannya? Langsung chat tim kami via WhatsApp — biasanya kami balas dalam 5 menit.
              </p>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "24px" }}>
                Tanya Tim Kami →
              </a>
            </div>

            <div className="faq-list reveal-stagger" id="faqList">
              {c.faqs.map((f, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-q" aria-expanded="false">
                    <span>{f.q}</span>
                    <span className="ico">+</span>
                  </button>
                  <div className="faq-a">
                    <div className="faq-a-inner">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA / CONTACT ========== */}
        <section className="section cta" id="contact">
          <div className="container reveal">
            <span className="eyebrow">Mulai Sekarang</span>
            <h2>Siap Menemukan Hunian Impianmu?</h2>
            <p className="lede">Tim kami siap membantu Senin–Minggu, 08.00–21.00 WIB. Cukup chat WhatsApp — kami balas dalam hitungan menit.</p>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="wa-big">
              <WhatsAppIcon size={26} />
              Chat Sekarang di WhatsApp
            </a>
            <div className="contact-info">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
                </svg>
                {c.contact.phone}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
                {c.contact.email}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {c.contact.coverage}
              </span>
            </div>
          </div>
        </section>

        {/* ========== LISTING MODAL ========== */}
        <div className="modal-overlay" id="listingModal" aria-modal="true" role="dialog" aria-label="Detail Hunian">
          <div className="modal-box">
            <button className="modal-close" id="modalClose" aria-label="Tutup">✕</button>

            <div className="modal-slider" id="modalSlider">
              <div className="slider-track" id="sliderTrack" />
              <button className="slider-btn slider-prev" id="sliderPrev" aria-label="Foto sebelumnya">‹</button>
              <button className="slider-btn slider-next" id="sliderNext" aria-label="Foto berikutnya">›</button>
              <div className="slider-dots" id="sliderDots" />
              <div className="slider-counter" id="sliderCounter" />
            </div>

            <div className="modal-content">
              <div className="modal-badges" id="modalBadges" />
              <h2 className="modal-title" id="modalTitle" />
              <div className="modal-loc" id="modalLoc" />
              <div className="modal-price" id="modalPrice" />
              <p className="modal-section-label">Fasilitas</p>
              <div className="modal-facilities" id="modalFacilities" />
              <hr className="modal-divider" />
              <p className="modal-desc" id="modalDesc" />
              <div className="modal-actions" id="modalActions" />
            </div>
          </div>
        </div>

      </main>

      {/* ========== FOOTER ========== */}
      <footer>
        <div className="container">
          <div className="brand">
            <div className="logo">
              <span><b>Partner</b> <i>Livingku</i></span>
            </div>
            <p>Direktori kost &amp; apartemen terpercaya di Indonesia. Temukan hunian idealmu, mudah dan terpercaya.</p>
          </div>
          <div>
            <h5>Halaman</h5>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#testimoni">Testimoni</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Kota Populer</h5>
            <ul>
              <li><a href="#services">Jakarta</a></li>
              <li><a href="#services">Bandung</a></li>
              <li><a href="#services">Surabaya</a></li>
              <li><a href="#services">Bali</a></li>
              <li><a href="#services">Yogyakarta</a></li>
            </ul>
          </div>
          <div>
            <h5>Tipe Hunian</h5>
            <ul>
              <li><a href="#services">Kost Putra</a></li>
              <li><a href="#services">Kost Putri</a></li>
              <li><a href="#services">Kost Campur</a></li>
              <li><a href="#services">Apartemen Studio</a></li>
              <li><a href="#services">Sewa Harian</a></li>
            </ul>
          </div>
          <div className="legal">
            <span>© 2026 Partner Livingku.</span>
            <div className="links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========== FLOATING WHATSAPP ========== */}
      <div className="wa-float">
        <span className="tip">Chat dengan kami</span>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp">
          <button className="wa-btn">
            <WhatsAppIcon size={30} />
          </button>
        </a>
      </div>
    </>
  );
}
