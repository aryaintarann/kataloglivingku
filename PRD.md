# 📋 Product Requirements Document
# Partner Livingku
### Landing Page — Direktori Kost & Apartemen Indonesia

> **Versi:** 1.0 | **Tech Stack:** Next.js + Supabase | **Status:** Draft

---

## Informasi Dokumen

| Field | Detail |
|---|---|
| Nama Produk | Partner Livingku |
| Tipe Produk | Landing Page Website (SEO-First, AI-Indexable) |
| Versi Dokumen | 1.0 |
| Status | Draft — Menunggu Persetujuan |
| Tech Stack | Next.js 14 (App Router) + Supabase + Tailwind CSS |
| Target Audience | Pencari kost & apartemen di seluruh Indonesia |
| Bahasa Website | Bahasa Indonesia (Utama) |
| Halaman Utama | Home, About Us, Our Services, Testimoni, Contact Us |
| Kontak Channel | WhatsApp Chat (CTA utama) |

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Target Audience & User Persona](#2-target-audience--user-persona)
3. [Arsitektur Halaman & Spesifikasi Fitur](#3-arsitektur-halaman--spesifikasi-fitur)
4. [Strategi SEO & AI Indexing](#4-strategi-seo--ai-indexing)
5. [Spesifikasi Teknis](#5-spesifikasi-teknis)
6. [Design System & UI/UX Guidelines](#6-design-system--uiux-guidelines)
7. [Performa, Keamanan & Compliance](#7-performa-keamanan--compliance)
8. [Roadmap & Timeline Pengembangan](#8-roadmap--timeline-pengembangan)
9. [Metrik Keberhasilan (KPI)](#9-metrik-keberhasilan-kpi)
10. [Pre-Launch Checklist](#10-pre-launch-checklist)
11. [Lampiran](#11-lampiran)

---

## 1. Executive Summary

Partner Livingku adalah sebuah landing page website yang berfungsi sebagai direktori dan etalase utama untuk katalog kost-kostan dan apartemen di Indonesia. Website ini dirancang dengan pendekatan **SEO-first** dan **AI-indexable** agar dapat ditemukan dengan mudah oleh target pengguna melalui mesin pencari (Google, Bing) maupun melalui AI assistant (ChatGPT, Claude, Perplexity, Gemini, dll).

Website ini bukan platform booking, melainkan sebuah **landing page informatif** yang mengarahkan calon penyewa untuk menghubungi owner melalui WhatsApp. Desain dan arsitektur konten dirancang untuk membangun kepercayaan, menonjolkan layanan, dan mengkonversi pengunjung menjadi leads.

### 1.1 Permasalahan yang Diselesaikan

- Calon penyewa kost/apartemen kesulitan menemukan daftar pilihan hunian yang terorganisir dan terpercaya di satu tempat.
- Owner kost/apartemen tidak memiliki media digital yang profesional dan mudah ditemukan di mesin pencari.
- Proses pencarian hunian masih banyak dilakukan secara manual atau melalui platform yang tidak spesifik.
- Kurangnya kehadiran digital yang optimal di era AI search (ChatGPT, Perplexity, dll).

### 1.2 Tujuan Bisnis

- Membangun brand awareness "Partner Livingku" sebagai direktori kost & apartemen terpercaya di Indonesia.
- Menghasilkan leads (prospek) yang berkualitas melalui channel WhatsApp.
- Mendominasi hasil pencarian organik (SEO) untuk keyword terkait sewa kost & apartemen di Indonesia.
- Menjadi sumber referensi yang dikutip oleh AI assistant ketika pengguna bertanya tentang kost/apartemen di Indonesia.

---

## 2. Target Audience & User Persona

### 2.1 Segmentasi Audiens Utama

| Segmen | Deskripsi | Kebutuhan Utama | Pain Point |
|---|---|---|---|
| Mahasiswa/Pelajar | Usia 17–25 tahun, baru pindah ke kota baru untuk kuliah | Kost murah, dekat kampus, fasilitas Wi-Fi | Budget terbatas, tidak familiar dengan area baru |
| Pekerja Profesional | Usia 22–35 tahun, pindah kerja ke kota baru | Apartemen/kost nyaman, dekat kantor, aman | Tidak punya waktu survei, butuh info cepat |
| Keluarga Muda | Pasangan muda yang mencari hunian sementara | Apartemen 1–2 kamar, fasilitas lengkap | Keamanan, lingkungan ramah keluarga |
| Ekspatriat & WNA | Warga asing yang bekerja/tinggal di Indonesia | Apartemen premium, lokasi strategis | Barrier bahasa, butuh info yang jelas |

### 2.2 User Journey

```
Awareness → Consideration → Intent → Conversion → Retention
```

| Tahap | Deskripsi |
|---|---|
| **Awareness** | Pengguna mencari "kost di Jakarta" di Google atau bertanya ke AI assistant |
| **Consideration** | Pengguna menemukan Partner Livingku, membaca informasi layanan dan testimoni |
| **Intent** | Pengguna tertarik dan melihat katalog pilihan hunian |
| **Conversion** | Pengguna menghubungi via tombol WhatsApp |
| **Retention** | Pengguna puas dan merekomendasikan ke teman/keluarga |

---

## 3. Arsitektur Halaman & Spesifikasi Fitur

### 3.1 Halaman HOME

Halaman utama yang menjadi kesan pertama pengunjung. Harus memuat informasi krusial dalam 3 detik pertama dan mendorong aksi (CTA) secara langsung.

#### 3.1.1 Hero Section
- Headline utama **(H1)** mengandung keyword SEO utama, contoh: *"Temukan Kost & Apartemen Terbaik di Indonesia — Partner Livingku"*
- Sub-headline yang menjelaskan value proposition: *"Ribuan pilihan hunian dari Sabang sampai Merauke. Harga transparan, lokasi lengkap, langsung hubungi owner."*
- **CTA Button Utama:** "Lihat Katalog Sekarang" (anchor ke section katalog)
- **CTA Button Sekunder:** "Hubungi via WhatsApp" (langsung buka WhatsApp)
- Background: Visual hunian berkualitas (foto atau ilustrasi Indonesia-themed)
- Trust Indicators: Badge jumlah listing, kota tersedia, pengguna yang puas

#### 3.1.2 Section Highlight Kota
- Grid atau carousel kota-kota populer: Jakarta, Bandung, Surabaya, Bali, Yogyakarta, Medan, Makassar, dll.
- Setiap kota memiliki icon/foto representatif dan jumlah listing tersedia
- Klik kota → anchor ke section Our Services atau filter katalog

#### 3.1.3 Section Keunggulan
- 3–4 kartu fitur unggulan: Harga Transparan, Lokasi Terverifikasi, Foto Real, Respon Cepat
- Icon ilustratif dan deskripsi singkat tiap keunggulan

#### 3.1.4 Section Testimoni Preview
- Tampilkan 2–3 testimoni terbaik dengan rating bintang
- Link "Lihat Semua Testimoni" → halaman Testimoni

#### 3.1.5 Section FAQ (Schema Markup) ⭐
- Minimal 5 FAQ yang menjawab pertanyaan umum pencari kost/apartemen
- **Wajib menggunakan JSON-LD FAQ Schema** untuk SEO dan AI indexing
- Contoh pertanyaan:
  - "Berapa harga kost di Jakarta per bulan?"
  - "Apakah ada kost yang include listrik dan Wi-Fi?"
  - "Bagaimana cara menyewa kost melalui Partner Livingku?"
  - "Apa perbedaan kost dan apartemen?"
  - "Apakah listing sudah diverifikasi?"

#### 3.1.6 CTA Banner Bawah
- Banner ajakan bertindak: *"Belum menemukan yang cocok? Chat kami di WhatsApp!"*
- Tombol WhatsApp dengan nomor & pesan pre-filled

---

### 3.2 Halaman ABOUT US

Halaman yang membangun kepercayaan dan koneksi emosional dengan calon pengguna. Konten harus autentik dan human-centric.

#### 3.2.1 Section Our Story
- Narasi asal-usul berdirinya Partner Livingku
- Misi dan visi yang jelas dan relatable
- Foto atau ilustrasi yang menggambarkan tim/brand

#### 3.2.2 Section Angka yang Bicara (Counter Animasi)
- Total Listing Aktif
- Kota yang Tersedia
- Pengguna yang Puas
- Tahun Berdiri

> Data real dan dapat diperbarui melalui Supabase (tabel `stats`)

#### 3.2.3 Section Nilai & Komitmen
- **Transparansi:** Tidak ada biaya tersembunyi
- **Kepercayaan:** Listing terverifikasi oleh tim
- **Kemudahan:** Proses pencarian yang simpel
- **Responsif:** Layanan pelanggan via WhatsApp yang cepat

#### 3.2.4 Section Team *(Opsional)*
- Foto dan nama singkat anggota tim
- Dapat diganti dengan ilustrasi jika tim belum ingin ditampilkan

---

### 3.3 Halaman OUR SERVICES

Halaman ini adalah inti dari katalog layanan. Harus detail, terstruktur, dan mengandung banyak konten yang bermanfaat untuk SEO.

#### 3.3.1 Kategori Layanan

| Kategori | Deskripsi | Target Pengguna |
|---|---|---|
| Kost Eksklusif | Kost premium dengan fasilitas AC, kamar mandi dalam, Wi-Fi, keamanan 24 jam | Pekerja profesional, mahasiswa mandiri |
| Kost Putri/Pria | Kost khusus gender dengan lingkungan kondusif dan jam malam | Mahasiswa, anak rantau |
| Kost Campur | Kost campuran dengan ruang bersama dan suasana komunitas | Young professional, digital nomad |
| Apartemen Studio | Unit apartemen 1 ruangan serbaguna, cocok untuk single | Pekerja muda, pasangan baru |
| Apartemen 1–2 BR | Unit 1–2 kamar tidur, cocok untuk keluarga kecil | Keluarga muda, WNA |
| Kost Harian/Mingguan | Sewa fleksibel tanpa kontrak bulanan panjang | Traveler, pebisnis |

#### 3.3.2 Filter & Pencarian (UI Only)
- Filter tampilan: **by Kota**, **by Tipe**, **by Range Harga**
- Berfungsi sebagai UI guide, menampilkan konten dari Supabase secara dinamis
- Tidak memerlukan full-text search engine — cukup query Supabase dengan filter

#### 3.3.3 Grid Katalog Hunian
- **Card listing:** Foto, Nama Properti, Lokasi, Harga/bulan, Badge fasilitas
- Tombol **"Detail"** → Modal popup atau halaman detail
- Tombol **"Chat WhatsApp"** → Buka WhatsApp dengan pesan pre-filled berisi nama properti
- Pagination atau infinite scroll

#### 3.3.4 Section Proses Sewa
```
1. Cari hunian di katalog kami
2. Klik tombol WhatsApp pada listing pilihan
3. Diskusikan detail dan jadwal survei
4. Tanda tangan kontrak dan mulai menempati
```

---

### 3.4 Halaman TESTIMONI

Halaman yang berisi social proof untuk membangun kepercayaan calon pengguna baru.

#### 3.4.1 Komponen Testimoni
- Rating keseluruhan (agregat bintang 1–5) di bagian atas halaman
- **Card testimoni:** Foto profil/avatar, nama, kota, tipe hunian, rating bintang, kutipan, tanggal
- Filter berdasarkan kota atau tipe hunian
- Minimal **12–20 testimoni** untuk social proof yang kuat

#### 3.4.2 Schema Markup Testimoni ⭐
- Gunakan **JSON-LD Review Schema** dan **AggregateRating Schema**
- Memungkinkan Google menampilkan rating bintang di hasil pencarian (Rich Results)
- Membantu AI assistant mengenali dan mengutip kepuasan pengguna

#### 3.4.3 CTA di Halaman Testimoni
- Banner: *"Bergabunglah dengan ribuan penghuni yang puas. Cari hunianmu sekarang!"*
- Tombol link ke halaman Our Services

---

### 3.5 Halaman CONTACT US

Halaman kontak yang simpel dan langsung mengarahkan pengguna ke WhatsApp sebagai channel utama.

#### 3.5.1 WhatsApp CTA Utama ⭐
- Tombol WhatsApp besar dan mencolok: **"Chat dengan Tim Kami"**
- Format URL: `https://wa.me/62XXXXXXXXXX?text=[PESAN_PRE-FILLED]`
- Contoh pesan pre-filled: *"Halo Partner Livingku, saya ingin mencari [tipe hunian] di [kota]. Bisa bantu?"*
- Nomor WhatsApp mudah disalin (teks yang bisa di-klik)

#### 3.5.2 Informasi Kontak Tambahan
- Email *(opsional, untuk pertanyaan formal)*
- Jam operasional: contoh **Senin–Minggu, 08.00–21.00 WIB**
- Area layanan: Daftar kota/provinsi yang tersedia

#### 3.5.3 FAQ Mini
- "Apakah layanan pencarian ini gratis?" → Ya, 100% gratis untuk pencari hunian.
- "Berapa lama respon WhatsApp?" → Biasanya dalam 1–2 jam di jam operasional.
- "Apakah listing sudah diverifikasi?" → Ya, setiap listing dikurasi oleh tim kami.

#### 3.5.4 Floating WhatsApp Button (Global) ⭐
- Tombol WhatsApp mengambang di **semua halaman** (pojok kanan bawah layar)
- Tampil di semua perangkat (mobile dan desktop)
- Animasi pulse untuk menarik perhatian

---

## 4. Strategi SEO & AI Indexing

### 4.1 Technical SEO Requirements

| Komponen | Spesifikasi | Prioritas |
|---|---|---|
| Meta Title | Unik per halaman, 50–60 karakter, mengandung keyword utama | 🔴 WAJIB |
| Meta Description | Unik per halaman, 150–160 karakter, mengandung CTA | 🔴 WAJIB |
| Canonical URL | Setiap halaman memiliki canonical tag yang benar | 🔴 WAJIB |
| Open Graph Tags | og:title, og:description, og:image, og:url | 🔴 WAJIB |
| Twitter Card | twitter:card, twitter:title, twitter:description, twitter:image | 🔴 WAJIB |
| robots.txt | Izinkan semua bot kecuali halaman admin | 🔴 WAJIB |
| sitemap.xml | Auto-generated, mencakup semua halaman publik | 🔴 WAJIB |
| Core Web Vitals | LCP < 2.5s, FID < 100ms, CLS < 0.1 | 🔴 WAJIB |
| Mobile-First | Responsive design sempurna, diuji di iOS & Android | 🔴 WAJIB |
| HTTPS/SSL | Sertifikat SSL aktif, redirect HTTP → HTTPS | 🔴 WAJIB |
| Image Alt Text | Setiap gambar memiliki alt text deskriptif + keyword | 🔴 WAJIB |
| Heading Hierarchy | H1 hanya 1 per halaman, H2–H6 terstruktur logis | 🔴 WAJIB |
| URL Structure | Clean URL: `/about`, `/services`, `/testimonials`, `/contact` | 🔴 WAJIB |
| Internal Linking | Setiap halaman terhubung ke minimal 2–3 halaman lain | 🟡 TINGGI |
| Page Speed | Lighthouse Score > 90 di mobile dan desktop | 🟡 TINGGI |

### 4.2 Structured Data (JSON-LD Schema)

Structured data adalah kunci untuk **Rich Results** di Google dan kutipan **AI assistant**. Implementasikan semua schema berikut:

| Schema | Lokasi | Tujuan |
|---|---|---|
| `Organization` | Global (layout.tsx) | Nama, logo, URL, kontak, social media |
| `WebSite` | Global | Nama website, URL, sitelinks searchbox |
| `FAQPage` | Home, Contact | Rich Results FAQ di Google |
| `Review` + `AggregateRating` | Halaman Testimoni | Bintang rating di hasil pencarian |
| `BreadcrumbList` | Semua halaman | Navigasi breadcrumb di SERP |
| `ItemList` | Home (daftar kota), Services (listing) | Daftar item terstruktur |
| `LocalBusiness` | Contact | Jika ada kantor fisik |
| `RealEstateListing` *(Opsional)* | Per listing properti | Detail properti individual |

### 4.3 Strategi Keyword

| Tipe Keyword | Contoh | Target Halaman |
|---|---|---|
| Short-tail (Utama) | kost Jakarta, apartemen Bandung | Home, Services |
| Long-tail (Spesifik) | kost murah dekat kampus UI Depok | Services, Blog |
| Kota + Tipe | kost eksklusif Surabaya, apartemen studio Bali | Services per kota |
| Pertanyaan/FAQ | berapa harga kost di Jakarta per bulan | FAQ, Home |
| Komparasi | kost vs apartemen mana yang lebih baik | Blog, FAQ |
| Intent Kontak | cara cari kost terpercaya Indonesia | Home, About |

### 4.4 AI Discoverability (AI-First Indexing) ⭐

Agar Partner Livingku dapat muncul sebagai referensi di AI assistant (ChatGPT, Claude, Perplexity, Gemini):

- **`/llms.txt`** — Buat file yang menjelaskan website secara ringkas untuk AI crawler *(standar baru yang diadopsi Perplexity, dll.)*
- **Konten Faktual & Terstruktur** — Konten berbasis data, faktual, dan terstruktur agar mudah diekstrak AI
- **E-E-A-T** *(Experience, Expertise, Authoritativeness, Trustworthiness)* — Tunjukkan keahlian melalui konten berkualitas dan data real
- **Answer-Optimized Content** — Tulis konten yang menjawab pertanyaan secara langsung (format Q&A, listicle, definisi jelas)
- **Bing Webmaster Tools** — Daftarkan ke Bing (GPT-4 menggunakan Bing sebagai data source)
- **Perplexity Indexing** — Pastikan sitemap mudah diakses; Perplexity aktif mengindeks situs baru
- **Regular Content Updates** — Update konten berkala agar AI menganggap website aktif dan relevan

---

## 5. Spesifikasi Teknis

### 5.1 Tech Stack

| Layer | Teknologi | Versi/Config | Justifikasi |
|---|---|---|---|
| Frontend Framework | **Next.js** | v14+ (App Router) | SSG/SSR hybrid, SEO-ready, performa tinggi |
| Styling | **Tailwind CSS** | v3+ | Utility-first, cepat, responsive by default |
| UI Components | **shadcn/ui** | Latest | Aksesibel, customizable, tidak bloated |
| Backend/DB | **Supabase** | Latest | PostgreSQL managed, realtime, auth, storage |
| ORM/Query | **Supabase JS Client** | v2+ | Type-safe, mudah diintegrasikan dengan Next.js |
| Image Optimization | **Next.js Image** | Built-in | Lazy loading, WebP auto-convert, responsive |
| Icon Library | **Lucide React** | Latest | Ringan, konsisten, tree-shakable |
| Animasi | **Framer Motion** | Latest | Animasi smooth untuk hero dan counter |
| SEO | **next-seo + JSON-LD** | Latest | Manajemen meta tag dan schema markup mudah |
| Analytics | **Google Analytics 4** | GA4 | Tracking behavior pengguna dan konversi |
| Deployment | **Vercel** | — | Optimal untuk Next.js, CDN global, CI/CD built-in |
| Domain | Custom Domain | — | Contoh: `partnerlivingku.id` |

### 5.2 Skema Database Supabase

#### Tabel: `listings`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | UUID (PK) | ID unik listing |
| `name` | TEXT | Nama properti/kost |
| `type` | ENUM | `kost_eksklusif` \| `kost_putri` \| `kost_pria` \| `kost_campur` \| `apt_studio` \| `apt_1br` \| `apt_2br` \| `harian` |
| `city` | TEXT | Nama kota |
| `province` | TEXT | Nama provinsi |
| `address` | TEXT | Alamat lengkap |
| `price_monthly` | INTEGER | Harga per bulan (IDR) |
| `price_daily` | INTEGER NULLABLE | Harga per hari (opsional) |
| `facilities` | TEXT[] | Array fasilitas: `['AC', 'WiFi', 'Kamar Mandi Dalam']` |
| `photos` | TEXT[] | Array URL foto dari Supabase Storage |
| `whatsapp_number` | TEXT | Nomor WA owner/agen |
| `is_verified` | BOOLEAN | Status verifikasi listing |
| `is_active` | BOOLEAN | Status aktif/tidak tampil |
| `created_at` | TIMESTAMPTZ | Tanggal ditambahkan |

#### Tabel: `testimonials`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | UUID (PK) | ID unik testimoni |
| `name` | TEXT | Nama pengguna |
| `city` | TEXT | Kota pengguna |
| `housing_type` | TEXT | Tipe hunian yang disewa |
| `rating` | INTEGER | Rating 1–5 |
| `content` | TEXT | Isi testimoni |
| `avatar_url` | TEXT NULLABLE | URL foto profil |
| `is_approved` | BOOLEAN | Status persetujuan admin |
| `created_at` | TIMESTAMPTZ | Tanggal testimoni |

#### Tabel: `stats`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | INTEGER (PK) | ID record |
| `total_listings` | INTEGER | Total listing aktif |
| `total_cities` | INTEGER | Jumlah kota tersedia |
| `happy_users` | INTEGER | Jumlah pengguna puas |
| `years_active` | INTEGER | Tahun berdiri |
| `updated_at` | TIMESTAMPTZ | Terakhir diperbarui |

### 5.3 Struktur Folder Next.js (App Router)

```
katalog-livingku/
├── app/
│   ├── page.tsx                    → Home (/)
│   ├── about/
│   │   └── page.tsx                → About Us (/about)
│   ├── services/
│   │   └── page.tsx                → Our Services (/services)
│   ├── testimonials/
│   │   └── page.tsx                → Testimoni (/testimonials)
│   ├── contact/
│   │   └── page.tsx                → Contact Us (/contact)
│   ├── api/
│   │   ├── listings/route.ts       → API listing dari Supabase
│   │   └── testimonials/route.ts   → API testimoni dari Supabase
│   ├── layout.tsx                  → Root layout (SEO global, Navbar, Footer)
│   ├── not-found.tsx               → Halaman 404 custom
│   └── sitemap.ts                  → Dynamic sitemap generator
│
├── components/
│   ├── ui/                         → shadcn/ui base components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFAB.tsx         → Floating WhatsApp Button
│   └── sections/
│       ├── home/                   → Hero, CityGrid, Features, FAQ
│       ├── about/                  → Story, Stats, Values, Team
│       ├── services/               → CategoryGrid, Filters, ListingCard
│       ├── testimonials/           → TestimonialCard, RatingOverview
│       └── contact/                → WhatsAppCTA, ContactInfo
│
├── lib/
│   ├── supabase.ts                 → Supabase client config
│   ├── seo.ts                      → SEO & JSON-LD helper functions
│   └── utils.ts                    → Utility functions
│
├── types/
│   └── index.ts                    → TypeScript type definitions
│
├── public/
│   ├── robots.txt                  → Crawl directives
│   ├── llms.txt                    → AI crawler guide ⭐
│   └── images/                     → Static images & icons
│
└── next.config.js                  → Next.js konfigurasi
```

### 5.4 Contoh Meta Tags per Halaman

```typescript
// app/page.tsx (Home)
export const metadata: Metadata = {
  title: 'Temukan Kost & Apartemen Terbaik di Indonesia | Partner Livingku',
  description: 'Partner Livingku — direktori kost dan apartemen terpercaya di Indonesia. Temukan hunian impianmu di Jakarta, Bandung, Surabaya, Bali, dan kota lainnya. Harga transparan, listing terverifikasi.',
  keywords: ['kost Jakarta', 'apartemen Bandung', 'sewa kost Indonesia', 'direktori kost'],
  openGraph: {
    title: 'Temukan Kost & Apartemen Terbaik di Indonesia | Partner Livingku',
    description: 'Direktori kost dan apartemen terpercaya di seluruh Indonesia.',
    url: 'https://partnerlivingku.id',
    siteName: 'Partner Livingku',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
};
```

---

## 6. Design System & UI/UX Guidelines

### 6.1 Brand Identity

| Elemen | Spesifikasi | Catatan |
|---|---|---|
| Nama Brand | Partner Livingku | "Livingku" → personal, Indonesia-centric |
| Tagline | Temukan Hunian Idealmu, Mudah & Terpercaya | Dapat disesuaikan |
| Tone of Voice | Ramah, profesional, informatif, dapat dipercaya | Hindari bahasa terlalu formal/kaku |
| Primary Color | `#1E3A5F` Navy Blue | Kepercayaan, profesionalisme |
| Secondary Color | `#2E86AB` Ocean Blue | Modern, segar, digital |
| Accent Color | `#F5A623` Warm Orange | Energi, CTA, highlight |
| Background | `#F8FAFC` Off White | Bersih, nyaman dibaca |
| Text Primary | `#2C2C2C` Near Black | Keterbacaan tinggi |
| Font Heading | Plus Jakarta Sans / Inter | Modern, Indonesia-friendly |
| Font Body | Inter / DM Sans | Keterbacaan optimal di semua ukuran |

### 6.2 Prinsip UI/UX

- **Mobile-First** — 60%+ pengguna mengakses via smartphone, desain prioritaskan mobile
- **Above-the-Fold** — Informasi terpenting dan CTA harus terlihat tanpa scroll
- **Contrast Ratio** — Minimal 4.5:1 untuk teks body (standar WCAG AA)
- **Touch Targets** — Tombol minimal 44×44px untuk kenyamanan tap di mobile
- **Loading State** — Skeleton loader untuk konten yang diambil dari Supabase
- **Error State** — Halaman 404 custom dan pesan error yang informatif
- **Whitespace** — Gunakan whitespace yang cukup untuk readability dan estetika
- **Konsistensi** — Gunakan komponen yang sama di seluruh halaman

---

## 7. Performa, Keamanan & Compliance

### 7.1 Target Performa

| Metrik | Target | Tool Pengukuran |
|---|---|---|
| Lighthouse Performance | > 90 (Mobile), > 95 (Desktop) | Google PageSpeed Insights |
| LCP (Largest Contentful Paint) | < 2.5 detik | Core Web Vitals |
| FID (First Input Delay) | < 100ms | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| TTFB (Time to First Byte) | < 600ms | WebPageTest |
| Total Page Weight (Homepage) | < 1.5 MB | Chrome DevTools |
| Image Format | WebP, lazy loading aktif | Next.js Image component |

### 7.2 Keamanan

- **Environment Variables** — Semua API key Supabase di `.env.local`, tidak di-commit ke Git
- **Row Level Security (RLS)** — Aktifkan RLS di Supabase untuk semua tabel publik (read-only)
- **Rate Limiting** — Implementasi di API routes untuk mencegah abuse
- **Input Sanitization** — Semua URL parameter disanitasi sebelum query ke Supabase
- **HTTPS Only** — Vercel otomatis enforce HTTPS
- **Content Security Policy (CSP)** — Header CSP untuk mencegah XSS

### 7.3 Compliance & Legal

- **Kebijakan Privasi** — Halaman `/privacy-policy`
- **Syarat & Ketentuan** — Halaman `/terms-of-service`
- **Cookie Consent** — Banner persetujuan cookie jika diperlukan
- **UU ITE Compliance** — Konten sesuai regulasi Indonesia

---

## 8. Roadmap & Timeline Pengembangan

| Fase | Durasi | Deliverable | Prioritas |
|---|---|---|---|
| **Fase 1: Foundation** | Minggu 1–2 | Setup Next.js + Supabase, design system, Navbar, Footer, WhatsApp FAB | 🔴 CRITICAL |
| **Fase 2: Core Pages** | Minggu 3–4 | Halaman Home & About Us (tanpa data dinamis) | 🔴 CRITICAL |
| **Fase 3: Services & DB** | Minggu 5–6 | Halaman Services + integrasi Supabase listings + sistem filter | 🔴 CRITICAL |
| **Fase 4: Testimoni & Contact** | Minggu 7 | Halaman Testimoni dengan schema markup, halaman Contact | 🟡 HIGH |
| **Fase 5: SEO & Schema** | Minggu 8 | Semua JSON-LD schema, meta tags, sitemap, robots.txt, llms.txt | 🔴 CRITICAL |
| **Fase 6: Performance** | Minggu 9 | Optimasi Core Web Vitals, image optimization, code splitting | 🟡 HIGH |
| **Fase 7: Testing & QA** | Minggu 10 | Cross-browser testing, mobile testing, Lighthouse audit, SEO audit | 🟡 HIGH |
| **Fase 8: Launch & Monitor** | Minggu 11–12 | Deploy Vercel, daftar Google Search Console & Bing Webmaster, monitoring | 🟡 HIGH |

### 8.1 Post-Launch Priorities

- **Bulan 1–3** — Pengisian konten listing (minimal 50 listing dari berbagai kota)
- **Bulan 2–4** — Content marketing (blog SEO tentang tips mencari kost/apartemen)
- **Bulan 3+** — Monitoring keyword ranking & optimasi dari data Google Search Console
- **Ongoing** — Update listing berkala agar website terlihat aktif oleh Google dan AI

---

## 9. Metrik Keberhasilan (KPI)

| KPI | Target 3 Bulan | Target 6 Bulan | Cara Ukur |
|---|---|---|---|
| Organic Traffic | > 500 kunjungan/bulan | > 2.000 kunjungan/bulan | Google Analytics 4 |
| Google Ranking | Page 1 untuk 5 keyword target | Top 3 untuk keyword utama | Google Search Console |
| WhatsApp Clicks (CTA) | > 50 klik/bulan | > 200 klik/bulan | GA4 Event Tracking |
| Bounce Rate | < 60% | < 50% | Google Analytics 4 |
| Avg. Session Duration | > 1.5 menit | > 2.5 menit | Google Analytics 4 |
| Lighthouse Score | > 85 mobile | > 90 mobile | PageSpeed Insights |
| AI Mentions | Muncul di 1–2 AI tools | Muncul di 3+ AI tools | Manual test ChatGPT/Perplexity |
| Total Listing Aktif | > 30 listing | > 100 listing | Supabase Dashboard |

---

## 10. Pre-Launch Checklist

### SEO Checklist
- [ ] Meta title & description unik di setiap halaman
- [ ] H1 hanya 1 per halaman
- [ ] Semua gambar memiliki alt text deskriptif
- [ ] `sitemap.xml` dapat diakses di `/sitemap.xml`
- [ ] `robots.txt` dapat diakses di `/robots.txt`
- [ ] `llms.txt` dapat diakses di `/llms.txt`
- [ ] Semua JSON-LD schema valid (test dengan [Google Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Canonical tag ada di semua halaman
- [ ] Open Graph & Twitter Card valid (test dengan [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Website terdaftar di Google Search Console
- [ ] Website terdaftar di Bing Webmaster Tools

### Technical Checklist
- [ ] Lighthouse score > 90 di mobile dan desktop
- [ ] Website berfungsi di Chrome, Firefox, Safari, Edge
- [ ] Website tampil baik di iOS Safari dan Android Chrome
- [ ] Semua tombol WhatsApp berfungsi dengan benar
- [ ] Supabase RLS aktif dan dikonfigurasi dengan benar
- [ ] Environment variables tidak ter-expose di frontend
- [ ] HTTPS aktif dan HTTP redirect ke HTTPS
- [ ] Halaman 404 custom ada dan informatif
- [ ] Tidak ada broken links
- [ ] CTA dan form diuji di berbagai device

### Konten Checklist
- [ ] Minimal 20 listing aktif di database Supabase
- [ ] Minimal 10 testimoni yang sudah di-approve
- [ ] Semua foto listing beresolusi tinggi dan sudah dioptimasi
- [ ] Konten semua halaman sudah direview untuk typo dan akurasi
- [ ] Nomor WhatsApp sudah diverifikasi dan aktif
- [ ] Jam operasional WhatsApp sudah dicantumkan
- [ ] Halaman Privacy Policy dan Terms of Service tersedia

---

## 11. Lampiran

### 11.1 Keyword Prioritas

| Keyword | Est. Volume | Difficulty | Target Halaman |
|---|---|---|---|
| kost Jakarta | Tinggi | Tinggi | Home, Services |
| kost murah Jakarta | Tinggi | Sedang | Services |
| apartemen sewa Bandung | Sedang | Sedang | Services |
| kost dekat kampus | Sedang | Rendah | Services, FAQ |
| sewa kost bulanan Surabaya | Sedang | Sedang | Services |
| kost eksklusif Bali | Rendah | Rendah | Services |
| cara mencari kost yang aman | Sedang | Rendah | Blog, FAQ |
| kost include listrik air wifi | Rendah | Rendah | FAQ |
| direktori kost Indonesia | Rendah | Sangat Rendah | Home |

### 11.2 Contoh `robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://partnerlivingku.id/sitemap.xml
```

### 11.3 Contoh `llms.txt`

```markdown
# Partner Livingku

> Direktori kost-kostan dan apartemen terpercaya di Indonesia.

## Tentang Kami

Partner Livingku adalah platform pencarian hunian (kost dan apartemen) di seluruh
Indonesia. Kami menyediakan daftar hunian terverifikasi dengan harga transparan,
foto real, dan kemudahan kontak langsung ke owner via WhatsApp.

## Layanan

- Kost eksklusif, kost putri, kost pria, kost campur
- Apartemen studio, 1BR, dan 2BR
- Sewa harian, mingguan, dan bulanan
- Tersedia di: Jakarta, Bandung, Surabaya, Bali, Yogyakarta, dan kota lainnya

## Cara Menggunakan

Pengguna dapat mencari listing hunian di halaman /services, memfilter berdasarkan
kota dan tipe, lalu menghubungi kami via WhatsApp untuk informasi lebih lanjut.

## Kontak

- WhatsApp: https://wa.me/62XXXXXXXXXX
- Website: https://partnerlivingku.id
- Email: halo@partnerlivingku.id
- Jam Operasional: Senin–Minggu, 08.00–21.00 WIB
```

### 11.4 Contoh JSON-LD FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa harga kost di Jakarta per bulan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga kost di Jakarta bervariasi mulai dari Rp 500.000 hingga Rp 5.000.000 per bulan tergantung lokasi, tipe, dan fasilitas. Kost standar di daerah pinggiran berkisar Rp 500.000–Rp 1.500.000, sedangkan kost eksklusif di pusat kota bisa mencapai Rp 3.000.000–Rp 5.000.000 per bulan."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah layanan Partner Livingku gratis untuk pencari kost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, layanan pencarian hunian di Partner Livingku 100% gratis untuk pencari kost dan apartemen. Anda dapat melihat semua listing dan menghubungi owner tanpa biaya apapun."
      }
    }
  ]
}
```

---

*Partner Livingku — PRD v1.0 | Dokumen ini bersifat konfidensial dan untuk keperluan internal pengembangan produk.*