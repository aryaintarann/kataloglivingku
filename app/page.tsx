import { createServerClient } from "@/lib/supabase";
import ClientInteractions from "@/components/ClientInteractions";
import TestimonialModal from "@/components/TestimonialModal";

export const dynamic = "force-dynamic";

// ── Types ─────────────────────────────────────────────────────────────────────

type HeroWidget = { pill: string; name: string; loc: string; price: string; period: string; photo?: string };
type Listing = {
  id: string; cat: string; title: string; loc: string; type: string;
  price: string; period: string; facilities: string[]; desc: string;
  photos: string[]; wa: string;
};
type Faq = { q: string; a: string };
type Testimonial = {
  id: string;
  name: string;
  city: string;
  housing_type: string;
  rating: number;
  content: string;
  avatar_url?: string;
};
type Content = {
  whatsapp: string;
  hero: { widget1: HeroWidget; widget2: HeroWidget };
  listings: Listing[];
  faqs: Faq[];
  testimonials: Testimonial[];
  contact: { phone: string; email: string; coverage: string };
};

const DEFAULT: Content = {
  whatsapp: "6281234567890",
  hero: {
    widget1: { pill: "Exclusive Co-living", name: "Premium Menteng Co-living", loc: "Central Jakarta · 5 mins to MRT", price: "Rp 2.500.000", period: "month", photo: "" },
    widget2: { pill: "Apartment", name: "Studio Dago View", loc: "Bandung", price: "Rp 3,2 jt", period: "month", photo: "" },
  },
  listings: [],
  faqs: [],
  testimonials: [],
  contact: { phone: "+62 812-3456-7890", email: "halo@partnerlivingku.id", coverage: "20+ Cities in Indonesia" },
};

async function getContent(): Promise<Content> {
  try {
    const db = createServerClient();
    const [{ data: settings }, { data: listings }, { data: faqs }, { data: testimonials }] = await Promise.all([
      db.from("settings").select("*").eq("id", 1).single(),
      db.from("listings").select("*").order("sort_order"),
      db.from("faqs").select("*").order("sort_order"),
      db.from("testimonials").select("*").eq("is_approved", true).order("created_at", { ascending: false }),
    ]);
    if (!settings) return DEFAULT;
    return {
      whatsapp: settings.whatsapp,
      hero: { widget1: settings.hero_widget1, widget2: settings.hero_widget2 },
      listings: (listings ?? []).map((l) => ({
        id: l.id, cat: l.cat, title: l.title, loc: l.loc, type: l.type,
        price: l.price, period: l.period, facilities: l.facilities,
        desc: l.description, photos: l.photos, wa: l.wa,
      })),
      faqs: (faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
      testimonials: (testimonials ?? []).map((t) => ({
        id: t.id, name: t.name, city: t.city, housing_type: t.housing_type,
        rating: t.rating, content: t.content, avatar_url: t.avatar_url
      })),
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
  const waText = `Hello,%20I'm%20interested%20in%20${encodeURIComponent(l.title)}`;
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
        {(() => {
          const p = l.photos[0] ?? "ph-1";
          const isUrl = p.startsWith("https://");
          return (
            <div
              className={isUrl ? "ph" : `ph ${p}`}
              style={isUrl ? { backgroundImage: `url(${p})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
            />
          );
        })()}
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
  const WA_DEFAULT = `${WA_BASE}?text=Hello%20Partner%20Livingku%2C%20I%20am%20looking%20for%20a%20place`;
  const extractCity = (loc: string) => loc.split("·")[0].split(",")[0].trim();
  const cityCount = new Set(c.listings.map((l) => extractCity(l.loc)).filter(Boolean)).size;

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

          <nav aria-label="Main navigation">
            <ul className="nav-links">
              <li><a href="#top" className="active">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#units">Units</a></li>
              <li><a href="#testimoni">Testimonials</a></li>
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
        <a href="#services">Services</a>
        <a href="#units">Units</a>
        <a href="#testimoni">Testimonials</a>
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
              <span className="eyebrow">Indonesian Property Directory</span>
              <h1>Find the <em>Best</em> Co-living &amp; Apartments in Indonesia</h1>
              <p className="hero-sub">From Sabang to Merauke — verified housing choices, transparent pricing, and direct contact with owners.</p>
              <div className="hero-actions">
                <a href="#units" className="btn btn-primary btn-lg">View Catalog →</a>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                  <WhatsAppIcon size={16} />
                  Chat WhatsApp
                </a>
              </div>
              <div className="trust-bar">
                <span><b>{cityCount}</b> Cities</span>
                <span className="dot" />
                <span>✓ Verified</span>
              </div>
            </div>

            <div className="hero-visual reveal" aria-hidden="true">
              <article className="hero-card main">
                <div
                  className="ph"
                  style={c.hero.widget1.photo ? { background: `url(${c.hero.widget1.photo}) center/cover no-repeat` } : undefined}
                >
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
                <div
                  className="ph"
                  style={c.hero.widget2.photo ? { background: `url(${c.hero.widget2.photo}) center/cover no-repeat` } : undefined}
                >
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
              <span className="eyebrow">About Us</span>
              <h2>Why Choose Partner Livingku?</h2>
              <p className="lede">We believe finding a home shouldn't be complicated. Partner Livingku brings a directory where every listing is verified — real photos, transparent pricing, and owners ready via WhatsApp.</p>

              <div className="features">
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c0 5-4 8.5-9 9-5-.5-9-4-9-9V6l9-3 9 3v6z" />
                    </svg>
                  </div>
                  <h4>Verified Listings</h4>
                  <p>Every property is checked by our team — address, facilities, and owner authenticity.</p>
                </div>
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10M9 9h4.5a2 2 0 010 4h-3a2 2 0 000 4H15" />
                    </svg>
                  </div>
                  <h4>Transparent Pricing</h4>
                  <p>No hidden fees. The displayed price is what you pay.</p>
                </div>
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <circle cx="12" cy="13" r="3.5" />
                      <path d="M8 6l1.5-2h5L16 6" />
                    </svg>
                  </div>
                  <h4>Real &amp; Accurate Photos</h4>
                  <p>Photos taken on-site — no generic images from the internet.</p>
                </div>
                <div className="feature">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                    </svg>
                  </div>
                  <h4>Fast Response via WA</h4>
                  <p>Our team is online Monday–Sunday, 08:00–21:00 WIB. We reply in minutes.</p>
                </div>
              </div>
            </div>

            <div className="about-visual reveal">
              <div className="stats-card">
                <span className="eyebrow stats-eyebrow">Our Numbers</span>
                <h3>Trusted by thousands of home seekers</h3>
                <p className="sub">Since 2022, we continue to grow with the co-living and apartment community in Indonesia.</p>
                <div className="stat-grid stat-grid-2">
                  <div className="stat">
                    <div className="num">
                      <span className="counter" data-count={String(cityCount)}>0</span>
                      <small>+</small>
                    </div>
                    <div className="lbl">Available Cities</div>
                  </div>
                  <div className="stat">
                    <div className="num">
                      <span className="counter" data-count={String(c.testimonials.filter(t => t.rating >= 3).length)}>0</span>
                    </div>
                    <div className="lbl">Satisfied Residents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== OUR SERVICES ========== */}
        <section className="section svc-section" id="services">
          <div className="batik-bg" aria-hidden="true" />
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Our Services</span>
              <h2>Our Services</h2>
              <p>Comprehensive property management solutions — from daily operations to digital marketing and tenant management.</p>
            </div>

            <div className="svc-grid">
              <div className="svc-card reveal">
                <div className="svc-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="svc-num-bg" aria-hidden="true">01</div>
                <h3 className="svc-cat">Operational Management</h3>
                <ul className="svc-list">
                  <li>Housekeeping &amp; Cleaning Management</li>
                  <li>Maintenance &amp; Repairs</li>
                  <li>Vendor &amp; Staff Coordination</li>
                </ul>
              </div>

              <div className="svc-card reveal">
                <div className="svc-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="svc-num-bg" aria-hidden="true">02</div>
                <h3 className="svc-cat">Financial Management</h3>
                <ul className="svc-list">
                  <li>Rent Collection &amp; Monitoring</li>
                  <li>Monthly Financial Report</li>
                  <li>Expenses Tracking &amp; Cost Efficiency</li>
                  <li>Transparent Profit Tracking</li>
                  <li>Optimize Occupancy Rate</li>
                </ul>
              </div>

              <div className="svc-card reveal">
                <div className="svc-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div className="svc-num-bg" aria-hidden="true">03</div>
                <h3 className="svc-cat">Listing &amp; Market Management</h3>
                <ul className="svc-list">
                  <li>Property Branding</li>
                  <li>Digital Marketing (Instagram &amp; TikTok)</li>
                  <li>Professional Photo &amp; Video</li>
                </ul>
              </div>

              <div className="svc-card reveal">
                <div className="svc-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="svc-num-bg" aria-hidden="true">04</div>
                <h3 className="svc-cat">Tenant Management</h3>
                <ul className="svc-list">
                  <li>Rent Agreement &amp; Legal Administration</li>
                  <li>Handling Check In &amp; Check Out</li>
                  <li>Customer Service &amp; Complaint Handling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========== OUR UNITS / LISTINGS ========== */}
        <section className="section units" id="units">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Featured Listings</span>
              <h2>Find the Right Home For You</h2>
              <p>Choose a category that fits your needs — all verified and ready for direct contact.</p>
            </div>

            {c.listings.length > 0 ? (
              <>
                <div className="filter-row reveal">
                  <div className="filter-tabs" role="tablist" aria-label="Filter tipe hunian">
                    <button className="active" data-filter="all" role="tab" aria-selected="true">All</button>
                    <button data-filter="kost" role="tab" aria-selected="false">Co-living</button>
                    <button data-filter="apartemen" role="tab" aria-selected="false">Apartment</button>
                    <button data-filter="harian" role="tab" aria-selected="false">Daily</button>
                  </div>
                  <button className="filter-btn" id="filterBtn" aria-expanded="false" aria-controls="filterPanel" aria-label="Advanced filter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="11" y1="18" x2="13" y2="18" />
                    </svg>
                    Filter
                    <span className="filter-badge" id="filterBadge" />
                  </button>
                </div>

                <div className="filter-panel" id="filterPanel">
                  <div className="fp-section">
                    <div className="fp-label">City</div>
                    <div className="city-select" id="citySelect">
                      <button className="city-select-trigger" id="citySelectTrigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                        <span id="citySelectLabel">All Cities</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <div className="city-dropdown" id="cityDropdown">
                        <div className="city-search-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <input type="text" id="citySearchInput" placeholder="Search city..." autoComplete="off" />
                        </div>
                        <ul id="citySelectList" role="listbox" aria-label="Select city" />
                        <p className="city-no-results" id="cityNoResults">City not found</p>
                      </div>
                    </div>
                  </div>
                  <div className="fp-section">
                    <div className="fp-label">Sort by Price</div>
                    <div className="fp-price-opts" id="fpPriceOpts">
                      <button className="fp-opt active" data-sort="default">Default</button>
                      <button className="fp-opt" data-sort="asc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true"><polyline points="18 15 12 9 6 15" /></svg>
                        Lowest
                      </button>
                      <button className="fp-opt" data-sort="desc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                        Highest
                      </button>
                    </div>
                  </div>
                  <button className="fp-reset" id="fpReset">Reset Filter</button>
                </div>

                <div className="listing-grid" id="listingGrid">
                  {c.listings.map((l) => (
                    <ListingCard key={l.id} l={l} waBase={WA_BASE} />
                  ))}
                </div>
              </>
            ) : (
              <div className="units-empty">
                <div className="units-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <p className="units-empty-title">On Progress</p>
                <p className="units-empty-sub">Coming Soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* ========== TESTIMONI ========== */}
        <section className="section testimoni" id="testimoni">
          <div className="batik-bg" aria-hidden="true" />
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Testimonials</span>
              <h2>What They Say</h2>
              <div className="gold-band" style={{ marginTop: "18px" }}>
                <span className="stars">
                  {"★".repeat(c.testimonials.length > 0 ? Math.round(c.testimonials.reduce((acc, t) => acc + t.rating, 0) / c.testimonials.length) : 0)}
                  {"☆".repeat(5 - (c.testimonials.length > 0 ? Math.round(c.testimonials.reduce((acc, t) => acc + t.rating, 0) / c.testimonials.length) : 0))}
                </span>
                <span>
                  <b>
                    {c.testimonials.length > 0
                      ? (c.testimonials.reduce((acc, t) => acc + t.rating, 0) / c.testimonials.length).toFixed(1)
                      : "0.0"}
                    /5
                  </b>{" "}
                  rating from {c.testimonials.length} residents
                </span>
              </div>
            </div>

            {c.testimonials.length > 0 ? (
              <div className="testi-grid reveal-stagger">
                {c.testimonials.map((t) => (
                  <article key={t.id} className="testi-card">
                    <span className="quote-mark">&ldquo;</span>
                    <div className="stars">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                    <blockquote>{t.content}</blockquote>
                    <div className="person">
                      <div className={`avatar av-${(t.name.length % 3) + 1}`}>
                        {t.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="who">{t.name}</div>
                        <div className="meta">{t.city} · {t.housing_type}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="units-empty">
                <p className="units-empty-title">No testimonials yet</p>
                <p className="units-empty-sub">Be the first to provide a testimonial!</p>
              </div>
            )}

            <TestimonialModal />
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="section faq" id="faq">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">FAQ</span>
              <h2 style={{ marginTop: "14px" }}>Frequently Asked Questions</h2>
              <p style={{ color: "var(--muted)", marginTop: "16px", maxWidth: "36ch" }}>
                Can't find the answer? Chat directly with our team via WhatsApp — we usually reply within 5 minutes.
              </p>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "24px" }}>
                Ask Our Team →
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
            <span className="eyebrow">Start Now</span>
            <h2>Ready to Find Your Dream Home?</h2>
            <p className="lede">Our team is ready to help Monday–Sunday, 08:00–21:00 WIB. Just chat via WhatsApp — we reply in minutes.</p>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="wa-big">
              <WhatsAppIcon size={26} />
              Chat Now on WhatsApp
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
        <div className="modal-overlay" id="listingModal" aria-modal="true" role="dialog" aria-label="Property Details">
          <div className="modal-box">
            <button className="modal-close" id="modalClose" aria-label="Close">✕</button>

            <div className="modal-slider" id="modalSlider">
              <div className="slider-track" id="sliderTrack" />
              <button className="slider-btn slider-prev" id="sliderPrev" aria-label="Previous photo">‹</button>
              <button className="slider-btn slider-next" id="sliderNext" aria-label="Next photo">›</button>
              <div className="slider-dots" id="sliderDots" />
              <div className="slider-counter" id="sliderCounter" />
            </div>

            <div className="modal-content">
              <div className="modal-badges" id="modalBadges" />
              <h2 className="modal-title" id="modalTitle" />
              <div className="modal-loc" id="modalLoc" />
              <div className="modal-price" id="modalPrice" />
              <p className="modal-section-label">Facilities</p>
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
            <p>Trusted co-living &amp; apartment directory in Indonesia. Find your ideal home, easily and safely.</p>
          </div>
          <div>
            <h5>Pages</h5>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#units">Our Units</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#testimoni">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Popular Cities</h5>
            <ul>
              <li><a href="#units">Jakarta</a></li>
              <li><a href="#units">Bandung</a></li>
              <li><a href="#units">Surabaya</a></li>
              <li><a href="#units">Bali</a></li>
              <li><a href="#units">Yogyakarta</a></li>
            </ul>
          </div>
          <div>
            <h5>Housing Types</h5>
            <ul>
              <li><a href="#units">Men's Co-living</a></li>
              <li><a href="#units">Women's Co-living</a></li>
              <li><a href="#units">Mixed Co-living</a></li>
              <li><a href="#units">Studio Apartment</a></li>
              <li><a href="#units">Daily Rent</a></li>
            </ul>
          </div>
          <div className="legal">
            <span>© 2026 Partner Livingku.</span>
            <div className="links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========== FLOATING WHATSAPP ========== */}
      <div className="wa-float">
        <span className="tip">Chat with us</span>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp">
          <button className="wa-btn">
            <WhatsAppIcon size={30} />
          </button>
        </a>
      </div>
    </>
  );
}
