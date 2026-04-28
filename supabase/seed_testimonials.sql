-- ============================================================
-- Partner Livingku — Seed Data: Testimonials
-- Jalankan di: Supabase Dashboard > SQL Editor
-- Berisi: 17 testimoni penghuni + 8 testimoni owner = 25 total
-- Lokasi: kota-kota & area di Bali
-- Semua is_approved = true agar langsung tampil di website
-- ============================================================

INSERT INTO testimonials (name, city, housing_type, rating, content, avatar_url, is_approved, created_at) VALUES

-- ── SISI PENGHUNI ───────────────────────────────────────────

(
  'Budi Santoso',
  'Denpasar',
  'Kost Eksklusif',
  5,
  'Sudah 8 bulan tinggal di kost yang saya temukan lewat Partner Livingku di Denpasar. Foto dan deskripsi 100% sesuai kenyataan, tidak ada tipuan sama sekali. Proses chat dengan owner juga super cepat, langsung bisa jadwalkan survey. Sangat recommended untuk yang baru pindah ke Bali!',
  NULL,
  true,
  now() - interval '7 months'
),

(
  'Sari Dewi Rahayu',
  'Seminyak',
  'Apartemen Studio',
  5,
  'Awalnya ragu cari apartemen di Seminyak lewat website, tapi Partner Livingku bikin saya yakin karena semua listingnya verified. Sekarang sudah setahun lebih tinggal di studio dekat pantai — harga persis yang tertera, tidak ada biaya tersembunyi. Fasilitasnya juga terjaga dengan baik.',
  NULL,
  true,
  now() - interval '11 months'
),

(
  'Ahmad Fauzi',
  'Canggu',
  'Kost Campur',
  4,
  'Cari kost di Canggu itu susah banget, apalagi yang harganya masuk akal dan lokasinya strategis dekat coworking space. Partner Livingku bantu banget — filter areanya lengkap dan bisa langsung hubungi pemilik tanpa perantara. Proses transparannya yang paling saya suka.',
  NULL,
  true,
  now() - interval '5 months'
),

(
  'Rizki Amalia',
  'Ubud',
  'Kost Putri',
  5,
  'Pindah ke Ubud untuk program seni selama 6 bulan, cari kost putri lewat Partner Livingku. Dalam 2 hari langsung dapat yang cocok, harga 850 ribu sudah termasuk WiFi dan sarapan. Tim Partner Livingku-nya responsif dan bantu proses dari awal sampai akhir!',
  NULL,
  true,
  now() - interval '3 months'
),

(
  'Kevin Hartono',
  'Seminyak',
  'Kost Harian',
  5,
  'Saya remote worker dan sering nomadic. Partner Livingku jadi andalan saya cari hunian harian yang worth it di Seminyak. Dapat kost dengan pool access, harga transparan, dan tidak ada hidden cost saat check-in. Lingkungan digital nomad-nya juga oke banget!',
  NULL,
  true,
  now() - interval '2 months'
),

(
  'Putri Maharani',
  'Kuta',
  'Kost Eksklusif',
  4,
  'Baru pindah kerja ke Bali dan butuh kost yang aman, dekat pusat kota Kuta, dan tidak terlalu mahal. Lewat Partner Livingku langsung nemu kost premium yang sesuai semua kriteria. AC dingin, WiFi kenceng, dan ownernya kooperatif. Minus sedikit karena parkir agak sempit.',
  NULL,
  true,
  now() - interval '6 months'
),

(
  'Dian Pratiwi',
  'Sanur',
  'Apartemen 1BR',
  5,
  'Sewa apartemen 1 bedroom di Sanur lewat Partner Livingku. Yang bikin beda adalah sistem verifikasi listingnya — saya tidak perlu khawatir kena scam. Owner juga sangat profesional, langsung kasih perjanjian sewa resmi. Lingkungan Sanur tenang dan cocok untuk kerja dari rumah!',
  NULL,
  true,
  now() - interval '4 months'
),

(
  'Arif Wibowo',
  'Canggu',
  'Kost Campur',
  4,
  'Teman yang rekomendasikan Partner Livingku ke saya. Awalnya skeptis, tapi ternyata beneran bagus. Kost yang saya temukan di Canggu sesuai ekspektasi — lingkungan aman, banyak penghuni sesama remote worker dan freelancer. Harga masuk akal untuk kawasan Canggu yang makin hits.',
  NULL,
  true,
  now() - interval '9 months'
),

(
  'Tania Kusumawati',
  'Jimbaran',
  'Kost Putri',
  5,
  'Kerja di resort kawasan Jimbaran, cari kost putri yang dekat tempat kerja dan nyaman. Lewat Partner Livingku dapat kost dengan view pantai, harga 700 ribu per bulan sudah termasuk listrik. Proses dari cari sampai check-in cuma 3 hari. Sangat membantu!',
  NULL,
  true,
  now() - interval '1 month'
),

(
  'Rendra Saputra',
  'Denpasar',
  'Kost Pria',
  4,
  'Kuliah di Udayana, cari kost putra yang dekat kampus dan ada fasilitas dapur. Ketemu di Partner Livingku — listing fotonya real, pas datang kondisinya beneran sama persis. Owner ramah dan fast respon via WhatsApp. Recommended banget buat mahasiswa baru di Denpasar.',
  NULL,
  true,
  now() - interval '4 months'
),

(
  'Laras Ningrum',
  'Gianyar',
  'Kost Putri',
  5,
  'Magang di perusahaan lokal di Gianyar, dibantu cari kost lewat Partner Livingku. Dalam sehari langsung dapat pilihan yang cocok. Kost bersih, penjaga ramah, dan harganya terjangkau. Bonus bisa lihat sawah dari jendela kamar — Bali banget!',
  NULL,
  true,
  now() - interval '2 months'
),

(
  'Farhan Maulana',
  'Kerobokan',
  'Apartemen Studio',
  5,
  'Digital nomad yang baru establish di Bali. Budget terbatas tapi tetap mau tinggal di tempat yang layak dekat Canggu dan Seminyak. Partner Livingku bantu saya filter berdasarkan harga dan lokasi — akhirnya dapat studio di Kerobokan yang super terjangkau dan strategis. Sangat membantu!',
  NULL,
  true,
  now() - interval '3 months'
),

(
  'Mega Silvia',
  'Ubud',
  'Kost Campur',
  4,
  'Cari kost di Ubud untuk program meditasi dan seni selama 3 bulan. Lewat Partner Livingku bisa filter berbagai tipe kost dengan mudah. Dapat kost bagus dengan taman yang asri, suasana tenang, harga bersaing. Pelayanan Partner Livingku juga responsif saat ada pertanyaan.',
  NULL,
  true,
  now() - interval '5 months'
),

(
  'Irfan Hakim',
  'Nusa Dua',
  'Kost Pria',
  5,
  'Dipindahtugaskan ke Nusa Dua untuk proyek hospitality, butuh hunian dalam waktu singkat. Partner Livingku jadi penyelamat — dalam 1 hari sudah dapat 4 pilihan kost pria di kawasan Nusa Dua dan sekitarnya. Langsung contact owner via WhatsApp, besoknya sudah bisa check-in. Service-nya beneran cepat!',
  NULL,
  true,
  now() - interval '6 months'
),

(
  'Nadya Fitriani',
  'Legian',
  'Apartemen 1BR',
  5,
  'Pindah ke Bali untuk kerja di industri pariwisata. Cari apartemen 1BR yang dekat Legian tapi harganya tidak mencekik. Partner Livingku bantu banget — semua listing sudah verified jadi tidak perlu khawatir kena tipu. Sekarang tinggal di Legian, nyaman dan dekat ke mana-mana!',
  NULL,
  true,
  now() - interval '8 months'
),

(
  'Bagas Prasetyo',
  'Canggu',
  'Apartemen Studio',
  4,
  'WFH dari Bali selama 3 bulan, butuh apartemen studio yang ada kolam renang dan WiFi kencang untuk video call. Lewat Partner Livingku langsung ketemu opsi yang sesuai di Canggu. Harga 2,8 juta per bulan all-inclusive, sangat worth it untuk standar Canggu. Pasti perpanjang kontrak!',
  NULL,
  true,
  now() - interval '10 months'
),

(
  'Ayu Wulandari',
  'Sanur',
  'Kost Putri',
  5,
  'Pindah ke Bali untuk bekerja di startup lokal, cari kost putri yang aman dan tenang. Partner Livingku jadi pilihan karena ada fitur verified listing — keluarga di Jawa jadi yakin karena semua informasi properti bisa dicek. Sudah setahun di Sanur, aman, nyaman, dan tidak mau pindah!',
  NULL,
  true,
  now() - interval '13 months'
),

-- ── SISI OWNER ──────────────────────────────────────────────

(
  'Hendra Gunawan',
  'Denpasar',
  'Owner · Kost 10 Kamar',
  5,
  'Sejak listing di Partner Livingku, tingkat hunian kost saya di Denpasar naik drastis dari 60% ke hampir penuh terus. Tim mereka bantu foto properti secara profesional, bikin deskripsi yang menarik, dan respons calon penghuni cepat. ROI-nya jauh melampaui ekspektasi saya sebagai owner.',
  NULL,
  true,
  now() - interval '8 months'
),

(
  'Yanti Kusuma',
  'Seminyak',
  'Owner · Apartemen Studio',
  5,
  'Punya 3 unit studio di Seminyak tapi susah cari penghuni yang reliable dan serius. Partner Livingku bantu dari sisi marketing, listing yang informatif, sampai screening awal calon penyewa. Sekarang 3 unit selalu terisi, dan kualitas penyewanya jauh lebih terjaga.',
  NULL,
  true,
  now() - interval '10 months'
),

(
  'Bambang Setiawan',
  'Canggu',
  'Owner · Kost Campur 12 Kamar',
  4,
  'Sebagai owner yang background-nya bukan di properti, saya butuh mitra yang bisa handle operasional sehari-hari. Partner Livingku handle mulai dari marketing listing, koordinasi jadwal survey, sampai pembuatan perjanjian sewa. Laporan keuangannya juga transparan dan mudah dipahami.',
  NULL,
  true,
  now() - interval '12 months'
),

(
  'Rina Lestari',
  'Ubud',
  'Owner · Kost Putri 8 Kamar',
  5,
  'Sebelum pakai Partner Livingku, saya handle kost di Ubud sendiri dan benar-benar melelahkan — dari promosi, balas chat calon penghuni, sampai urus administrasi. Sekarang tim Partner Livingku yang handle semuanya. Saya tinggal terima laporan dan pendapatan. Life-changing buat saya sebagai owner!',
  NULL,
  true,
  now() - interval '14 months'
),

(
  'Agus Hermawan',
  'Kuta',
  'Owner · Kost Pria 15 Kamar',
  5,
  'Kost saya di pusat Kuta sebelumnya hanya 50% terisi meski harganya sudah kompetitif. Masalahnya di marketing — foto seadanya dan tidak ada deskripsi yang menarik. Partner Livingku ubah semuanya: foto profesional, deskripsi detail, dan listing terverifikasi. Dalam 2 bulan, kost penuh!',
  NULL,
  true,
  now() - interval '6 months'
),

(
  'Dewi Anggraini',
  'Jimbaran',
  'Owner · Villa Harian 2 Unit',
  4,
  'Punya 2 unit villa di Jimbaran yang susah dapat penyewa karena persaingan ketat. Setelah listing di Partner Livingku, dalam 3 minggu sudah ada penyewa baru yang serius. Proses seleksi mereka juga membantu saring calon yang tidak serius. Sistem kerjanya sangat profesional.',
  NULL,
  true,
  now() - interval '4 months'
),

(
  'Wahyu Nugroho',
  'Sanur',
  'Owner · Kost Campur 20 Kamar',
  5,
  'Sebagai investor properti dengan beberapa kost di Sanur, Partner Livingku sangat membantu skalabilitas bisnis saya. Tidak perlu hire staf marketing sendiri — mereka yang handle semua. Laporan bulanan detail dan transparan. Return on investment-nya konsisten dan memuaskan.',
  NULL,
  true,
  now() - interval '9 months'
),

(
  'Sri Hartati',
  'Canggu',
  'Owner · Villa Harian 3 Unit',
  5,
  'Punya villa harian di Canggu yang sempat sepi di luar musim ramai. Partner Livingku bantu listing dengan strategi yang tepat dan target market yang berbeda — termasuk remote worker dan digital nomad jangka panjang. Sekarang occupancy rate naik signifikan bahkan di low season. Sangat merekomendasikan!',
  NULL,
  true,
  now() - interval '7 months'
);

-- Verifikasi data berhasil masuk
SELECT name, city, housing_type, rating, is_approved FROM testimonials ORDER BY created_at;
