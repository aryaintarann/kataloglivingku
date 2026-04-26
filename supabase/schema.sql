-- ============================================================
-- Partner Livingku u2014 Supabase Schema
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Settings (satu baris saja, id selalu = 1)
CREATE TABLE IF NOT EXISTS settings (
  id            INTEGER PRIMARY KEY DEFAULT 1,
  whatsapp      TEXT    NOT NULL DEFAULT '6281234567890',
  hero_widget1  JSONB   NOT NULL DEFAULT '{}'::jsonb,
  hero_widget2  JSONB   NOT NULL DEFAULT '{}'::jsonb,
  contact       JSONB   NOT NULL DEFAULT '{}'::jsonb
);

-- 2. Listings
CREATE TABLE IF NOT EXISTS listings (
  id          TEXT    PRIMARY KEY,
  cat         TEXT    NOT NULL DEFAULT 'kost',
  title       TEXT    NOT NULL DEFAULT '',
  loc         TEXT    NOT NULL DEFAULT '',
  type        TEXT    NOT NULL DEFAULT '',
  price       TEXT    NOT NULL DEFAULT '',
  period      TEXT    NOT NULL DEFAULT 'bln',
  facilities  TEXT[]  NOT NULL DEFAULT '{}',
  desc        TEXT    NOT NULL DEFAULT '',
  photos      TEXT[]  NOT NULL DEFAULT '{}',
  wa          TEXT    NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- 3. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id          SERIAL  PRIMARY KEY,
  question    TEXT    NOT NULL DEFAULT '',
  answer      TEXT    NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- Seed Data (data awal dari content.json)
-- ============================================================

INSERT INTO settings (id, whatsapp, hero_widget1, hero_widget2, contact)
VALUES (
  1,
  '6281234567890',
  '{"pill":"Kost Eksklusif","name":"Kost Menteng Premium","loc":"Jakarta Pusat · 5 menit ke MRT","price":"Rp 2.500.000","period":"bulan"}'::jsonb,
  '{"pill":"Apartemen","name":"Studio Dago View","loc":"Bandung","price":"Rp 3,2 jt","period":"bulan"}'::jsonb,
  '{"phone":"+62 812-3456-7890","email":"halo@partnerlivingku.id","coverage":"20+ Kota di Indonesia"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listings (id, cat, title, loc, type, price, period, facilities, desc, photos, wa, sort_order) VALUES
  ('JKT-001', 'kost',      'Kost Eksklusif Menteng',    'Jakarta Pusat',         'Kost Eksklusif',   'Rp 2.500.000', 'bln',  ARRAY['AC','WiFi','KM Dalam','Parkir'],    'Kost eksklusif di jantung Jakarta Pusat, dekat pusat perbelanjaan dan stasiun MRT.',        ARRAY['ph-1','ph-3','ph-5'], 'Halo,%20saya%20tertarik%20Kost%20Eksklusif%20Menteng%20(JKT-001)',        0),
  ('BDG-014', 'apartemen', 'Apartemen Studio Dago',     'Dago, Bandung',          'Apartemen Studio', 'Rp 3.200.000', 'bln',  ARRAY['AC','WiFi','Dapur','Balkon'],       'Apartemen studio modern di kawasan Dago yang sejuk dengan pemandangan kota Bandung.',       ARRAY['ph-2','ph-4','ph-6'], 'Halo,%20saya%20tertarik%20Apartemen%20Studio%20Dago%20(BDG-014)',         1),
  ('SBY-022', 'kost',      'Kost Putri Tidar',          'Tidar, Surabaya',        'Kost Putri',       'Rp 1.200.000', 'bln',  ARRAY['WiFi','KM Dalam','Laundry'],        'Kost putri nyaman dan aman di kawasan Tidar Surabaya, dekat berbagai kampus.',              ARRAY['ph-3','ph-1','ph-5'], 'Halo,%20saya%20tertarik%20Kost%20Putri%20Tidar%20(SBY-022)',              2),
  ('BLI-007', 'harian',    'Kost Harian Seminyak',      'Seminyak, Bali',         'Kost Harian',      'Rp 250.000',   'hari', ARRAY['AC','WiFi','Pool Access'],          'Hunian harian bergaya resort di Seminyak Bali, hanya 5 menit berjalan kaki ke pantai.',    ARRAY['ph-4','ph-2','ph-6'], 'Halo,%20saya%20tertarik%20Kost%20Harian%20Seminyak%20(BLI-007)',          3),
  ('JOG-031', 'kost',      'Kost Campur Condongcatur',  'Condongcatur, Yogyakarta','Kost Campur',      'Rp 800.000',   'bln',  ARRAY['WiFi','Dapur Bersama'],             'Kost campur ramah kantong di Condongcatur Yogyakarta, strategis dekat UGM dan UNY.',       ARRAY['ph-5','ph-3','ph-1'], 'Halo,%20saya%20tertarik%20Kost%20Campur%20Condongcatur%20(JOG-031)',      4),
  ('MDN-009', 'apartemen', 'Apartemen 1BR Helvetia',    'Helvetia, Medan',        'Apartemen 1BR',    'Rp 4.500.000', 'bln',  ARRAY['AC','WiFi','Gym','Security 24h'],   'Apartemen satu kamar tidur modern di kawasan Helvetia Medan dengan fasilitas lengkap.',    ARRAY['ph-6','ph-2','ph-4'], 'Halo,%20saya%20tertarik%20Apartemen%201BR%20Helvetia%20(MDN-009)',        5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Apakah layanan ini gratis untuk pencari kost?', 'Ya, sepenuhnya gratis. Kamu tidak perlu membayar biaya apapun untuk mencari, melihat, atau dihubungkan ke owner. Pembayaran dilakukan langsung antara kamu dan owner sesuai harga yang tertera.', 0),
  ('Bagaimana cara menghubungi owner listing?', 'Setiap listing memiliki tombol "Chat WA" yang langsung membuka WhatsApp dengan pesan template. Tim kami akan menghubungkan kamu ke owner atau admin yang menangani properti tersebut.', 1),
  ('Apakah semua listing sudah diverifikasi?', 'Ya. Setiap listing yang tampil di Partner Livingku telah melalui proses verifikasi: pengecekan dokumen properti, kunjungan tim lapangan untuk dokumentasi foto, dan validasi identitas owner.', 2);

-- ============================================================
-- Row Level Security (nonaktifkan untuk akses via service role)
-- ============================================================
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE listings DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs     DISABLE ROW LEVEL SECURITY;
