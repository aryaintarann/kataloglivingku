-- ============================================================
-- Partner Livingku — Seed Data: Testimonials
-- Jalankan di: Supabase Dashboard > SQL Editor
-- Berisi: 8 testimoni penghuni + 4 testimoni owner
-- Semua is_approved = true agar langsung tampil di website
-- ============================================================

INSERT INTO testimonials (name, city, housing_type, rating, content, avatar_url, is_approved, created_at) VALUES

-- ── SISI PENGHUNI ───────────────────────────────────────────

(
  'Budi Santoso',
  'Jakarta',
  'Kost Eksklusif',
  5,
  'Sudah 8 bulan tinggal di kost yang saya temukan lewat Partner Livingku. Foto dan deskripsi 100% sesuai kenyataan, tidak ada tipuan sama sekali. Proses chat dengan owner juga super cepat, langsung bisa jadwalkan survey. Sangat recommended untuk yang mau pindah ke Jakarta!',
  NULL,
  true,
  now() - interval '7 months'
),

(
  'Sari Dewi Rahayu',
  'Bandung',
  'Apartemen Studio',
  5,
  'Awalnya ragu cari apartemen lewat website, tapi Partner Livingku bikin saya yakin karena semua listingnya verified. Sekarang sudah setahun lebih tinggal di studio Dago — harga persis yang tertera, tidak ada biaya tersembunyi. Fasilitasnya juga terjaga dengan baik.',
  NULL,
  true,
  now() - interval '11 months'
),

(
  'Ahmad Fauzi',
  'Surabaya',
  'Kost Campur',
  4,
  'Cari kost di Surabaya itu susah banget, apalagi yang harganya masuk akal dan lokasinya strategis. Partner Livingku bantu banget — filter kotanya lengkap dan bisa langsung hubungi pemilik tanpa perantara. Proses transparannya yang paling saya suka.',
  NULL,
  true,
  now() - interval '5 months'
),

(
  'Rizki Amalia',
  'Yogyakarta',
  'Kost Putri',
  5,
  'Mahasiswi rantau dari Makassar, cari kost putri di Jogja lewat Partner Livingku. Dalam 2 hari langsung dapat yang cocok, harga 800 ribu sudah termasuk WiFi dan kamar mandi dalam. Tim Partner Livingku-nya responsif dan bantu proses dari awal sampai akhir!',
  NULL,
  true,
  now() - interval '3 months'
),

(
  'Kevin Hartono',
  'Bali',
  'Kost Harian',
  5,
  'Saya remote worker dan sering nomadic. Partner Livingku jadi salah satu andalan saya cari hunian harian yang worth it. Di Seminyak dapat kost dengan pool access, harga transparan, dan tidak ada hidden cost saat check-in. Akan balik lagi kalau ke Bali!',
  NULL,
  true,
  now() - interval '2 months'
),

(
  'Putri Maharani',
  'Jakarta',
  'Kost Eksklusif',
  4,
  'Baru pindah kerja ke Jakarta dan butuh kost yang aman, dekat MRT, dan tidak terlalu mahal. Lewat Partner Livingku langsung nemu Kost Menteng Premium yang sesuai semua kriteria. AC dingin, WiFi kenceng, dan ownernya kooperatif. Minus sedikit karena parkir agak sempit.',
  NULL,
  true,
  now() - interval '6 months'
),

(
  'Dian Pratiwi',
  'Medan',
  'Apartemen 1BR',
  5,
  'Sewa apartemen 1 bedroom di Helvetia Medan lewat Partner Livingku. Yang bikin beda adalah sistem verifikasi listingnya — saya tidak perlu khawatir kena scam. Owner juga sangat profesional, langsung kasih perjanjian sewa resmi. Rekomendasi banget untuk yang mau sewa di Medan!',
  NULL,
  true,
  now() - interval '4 months'
),

(
  'Arif Wibowo',
  'Bandung',
  'Kost Campur',
  4,
  'Teman yang rekomendasikan Partner Livingku ke saya. Awalnya skeptis, tapi ternyata beneran bagus. Kost yang saya temukan sesuai ekspektasi — lingkungan aman, penghuni lainnya juga baik-baik. Harga masuk akal untuk kawasan Bandung kota.',
  NULL,
  true,
  now() - interval '9 months'
),

-- ── SISI OWNER ──────────────────────────────────────────────

(
  'Hendra Gunawan',
  'Jakarta',
  'Owner · Kost 10 Kamar',
  5,
  'Sejak listing di Partner Livingku, tingkat hunian kost saya naik drastis dari 60% ke hampir penuh terus. Tim mereka bantu foto properti secara profesional, bikin deskripsi yang menarik, dan respons calon penghuni cepat. ROI-nya jauh melampaui ekspektasi saya sebagai owner.',
  NULL,
  true,
  now() - interval '8 months'
),

(
  'Yanti Kusuma',
  'Bandung',
  'Owner · Apartemen Studio',
  5,
  'Punya 3 unit studio di Dago tapi susah cari penghuni yang reliable dan serius. Partner Livingku bantu dari sisi marketing, listing yang informatif, sampai screening awal calon penyewa. Sekarang 3 unit selalu terisi, dan kualitas penyewanya jauh lebih terjaga.',
  NULL,
  true,
  now() - interval '10 months'
),

(
  'Bambang Setiawan',
  'Surabaya',
  'Owner · Kost Campur 12 Kamar',
  4,
  'Sebagai owner yang background-nya bukan di properti, saya butuh mitra yang bisa handle operasional sehari-hari. Partner Livingku handle mulai dari marketing listing, koordinasi jadwal survey, sampai pembuatan perjanjian sewa. Laporan keuangannya juga transparan dan mudah dipahami.',
  NULL,
  true,
  now() - interval '12 months'
),

(
  'Rina Lestari',
  'Yogyakarta',
  'Owner · Kost Putri 8 Kamar',
  5,
  'Sebelum pakai Partner Livingku, saya handle kost sendiri dan benar-benar melelahkan — dari promosi, balas chat calon penghuni, sampai urus administrasi. Sekarang tim Partner Livingku yang handle semuanya. Saya tinggal terima laporan dan pendapatan. Life-changing buat saya sebagai owner!',
  NULL,
  true,
  now() - interval '14 months'
);

-- Verifikasi data berhasil masuk
SELECT name, city, housing_type, rating, is_approved FROM testimonials ORDER BY created_at;
