-- ============================================================
-- Partner Livingku — Seed Data: Testimonials
-- Jalankan di: Supabase Dashboard > SQL Editor
-- Berisi: 17 testimoni penghuni + 8 testimoni owner = 25 total
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

(
  'Tania Kusumawati',
  'Semarang',
  'Kost Putri',
  5,
  'Pindah ke Semarang untuk magang 6 bulan, cari kost putri yang murah tapi nyaman. Lewat Partner Livingku dapat kost di dekat Simpang Lima, harga 650 ribu per bulan sudah termasuk listrik. Proses dari cari sampai check-in cuma 3 hari. Sangat membantu untuk perantau seperti saya!',
  NULL,
  true,
  now() - interval '1 month'
),

(
  'Rendra Saputra',
  'Makassar',
  'Kost Pria',
  4,
  'Kuliah di Unhas, cari kost putra yang dekat kampus dan ada fasilitas dapur. Ketemu di Partner Livingku — listing fotonya real, pas datang kondisinya beneran sama persis. Owner ramah dan fast respon via WhatsApp. Recommended banget buat mahasiswa baru di Makassar.',
  NULL,
  true,
  now() - interval '4 months'
),

(
  'Laras Ningrum',
  'Malang',
  'Kost Putri',
  5,
  'Mahasiswi UB yang baru masuk, dibantu kakak cari kost lewat Partner Livingku. Dalam sehari langsung dapat pilihan yang cocok di area Dinoyo. Kost bersih, penjaga ramah, dan harganya sesuai budget mahasiswa. Terima kasih Partner Livingku!',
  NULL,
  true,
  now() - interval '2 months'
),

(
  'Farhan Maulana',
  'Jakarta',
  'Apartemen Studio',
  5,
  'Fresh graduate yang baru mulai kerja di Jakarta. Budget terbatas tapi tetap mau tinggal di tempat yang layak. Partner Livingku bantu saya filter berdasarkan harga dan lokasi — akhirnya dapat studio di Tangerang Selatan yang super terjangkau dan dekat stasiun. Sangat membantu!',
  NULL,
  true,
  now() - interval '3 months'
),

(
  'Mega Silvia',
  'Yogyakarta',
  'Kost Campur',
  4,
  'Cari kost campur yang boleh ada tamu dan tidak terlalu strict. Lewat Partner Livingku bisa filter berbagai tipe kost dengan mudah. Dapat kost bagus di Condongcatur, dekat kampus UGM, harga bersaing. Pelayanan Partner Livingku juga responsif saat ada pertanyaan.',
  NULL,
  true,
  now() - interval '5 months'
),

(
  'Irfan Hakim',
  'Palembang',
  'Kost Pria',
  5,
  'Dipindahtugaskan ke Palembang mendadak, butuh hunian dalam waktu singkat. Partner Livingku jadi penyelamat — dalam 1 hari sudah dapat 5 pilihan kost pria yang sesuai kriteria. Langsung contact owner via WhatsApp, besoknya sudah bisa check-in. Service-nya beneran cepat!',
  NULL,
  true,
  now() - interval '6 months'
),

(
  'Nadya Fitriani',
  'Surabaya',
  'Apartemen 1BR',
  5,
  'Pindah dari Malang ke Surabaya untuk kerja. Cari apartemen 1BR yang dekat pusat kota tapi harganya tidak mencekik. Partner Livingku bantu banget — semua listing sudah verified jadi tidak perlu khawatir kena tipu. Sekarang tinggal di Gubeng, nyaman dan strategis!',
  NULL,
  true,
  now() - interval '8 months'
),

(
  'Bagas Prasetyo',
  'Bali',
  'Apartemen Studio',
  4,
  'WFH dari Bali selama 3 bulan, butuh apartemen studio yang ada kolam renang dan WiFi kencang. Lewat Partner Livingku langsung ketemu opsi yang sesuai di Kuta. Harga 2,5 juta per bulan all-inclusive, sangat worth it untuk standar Bali. Pasti balik lagi!',
  NULL,
  true,
  now() - interval '10 months'
),

(
  'Ayu Wulandari',
  'Bandung',
  'Kost Putri',
  5,
  'Anak baru lulus SMA mau kuliah di Bandung, orang tua khawatir soal keamanan kost. Partner Livingku jadi pilihan karena ada fitur verified listing — orang tua jadi yakin karena semua informasi properti bisa dicek. Sudah setahun di Bandung, aman dan nyaman!',
  NULL,
  true,
  now() - interval '13 months'
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
),

(
  'Agus Hermawan',
  'Semarang',
  'Owner · Kost Pria 15 Kamar',
  5,
  'Kost saya di pusat Semarang sebelumnya hanya 50% terisi meski harganya sudah kompetitif. Masalahnya di marketing — foto seadanya dan tidak ada deskripsi yang menarik. Partner Livingku ubah semuanya: foto profesional, deskripsi detail, dan listing terverifikasi. Dalam 2 bulan, kost penuh!',
  NULL,
  true,
  now() - interval '6 months'
),

(
  'Dewi Anggraini',
  'Makassar',
  'Owner · Apartemen 2 Unit',
  4,
  'Punya 2 unit apartemen di Makassar yang susah dapat penyewa karena persaingan ketat. Setelah listing di Partner Livingku, dalam 3 minggu sudah ada 2 penyewa baru yang serius. Proses seleksi mereka juga membantu saring calon penyewa yang tidak serius. Sistem kerjanya sangat profesional.',
  NULL,
  true,
  now() - interval '4 months'
),

(
  'Wahyu Nugroho',
  'Malang',
  'Owner · Kost Campur 20 Kamar',
  5,
  'Sebagai investor properti dengan beberapa kost di Malang, Partner Livingku sangat membantu skalabilitas bisnis saya. Tidak perlu hire staf marketing sendiri — mereka yang handle semua. Laporan bulanan detail dan transparan. Return on investment-nya konsisten dan memuaskan.',
  NULL,
  true,
  now() - interval '9 months'
),

(
  'Sri Hartati',
  'Bali',
  'Owner · Villa Harian 3 Unit',
  5,
  'Punya villa harian di Canggu yang sempat sepi di luar musim turis. Partner Livingku bantu listing dengan strategi yang tepat dan target market yang berbeda — termasuk remote worker dan digital nomad. Sekarang occupancy rate naik signifikan bahkan di low season. Sangat merekomendasikan!',
  NULL,
  true,
  now() - interval '7 months'
);

-- Verifikasi data berhasil masuk
SELECT name, city, housing_type, rating, is_approved FROM testimonials ORDER BY created_at;
