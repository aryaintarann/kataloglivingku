```
Buatkan UI/UX landing page lengkap untuk website bernama "Partner Livingku" — sebuah 
direktori kost-kostan dan apartemen terpercaya di Indonesia. Buat dalam satu file HTML 
yang fully working, responsif, dan production-ready dengan desain yang premium, modern, 
dan berkarakter kuat.

---

## BRAND & AESTHETIC DIRECTION

**Nama:** Partner Livingku  
**Tagline:** Temukan Hunian Idealmu, Mudah & Terpercaya  
**Tone:** Hangat, profesional, terpercaya, Indonesia-centric  

**Aesthetic Vision:**  
Gunakan gaya "Warm Modern Indonesian" — perpaduan antara desain digital modern dengan 
sentuhan hangat dan earthy yang mencerminkan karakter Indonesia. Bayangkan majalah 
properti premium dengan nuansa tropis: clean layout, tipografi editorial yang kuat, 
warna tanah yang sophisticated, dan aksen yang mencerminkan kehangatan budaya Indonesia.

**Palet Warna:**
- Primary: #1B3A4B (Deep Teal — kepercayaan, kedalaman)
- Secondary: #C9A84C (Warm Gold — kemewahan terjangkau, kualitas)
- Accent: #E8F4F0 (Mint Whisper — segar, nyaman)
- Background: #FAFAF7 (Warm White — bersih, hangat)
- Dark: #1A1A1A (Near Black — teks utama)
- Surface: #F2EDE8 (Warm Sand — card background, section divider)

**Tipografi:**
- Heading: "Playfair Display" atau "DM Serif Display" — editorial, elegan, berkarakter
- Body: "Nunito" atau "Plus Jakarta Sans" — ramah, mudah dibaca, modern Indonesia
- Accent/Label: "Space Mono" atau monospace — untuk badge, harga, kode kota

**Visual Motif:**
- Subtle batik-inspired geometric pattern sebagai background texture (SVG inline)
- Organic blob shapes sebagai dekoratif section divider
- Garis tipis gold sebagai aksen premium
- Card dengan sudut rounded dan shadow yang lembut

---

## HALAMAN & SECTION YANG HARUS DIBUAT

### 1. NAVBAR (Sticky)
- Logo "Partner Livingku" di kiri (dengan icon rumah minimalis)
- Menu navigasi: Home | About Us | Our Services | Testimoni | Contact
- Tombol CTA kanan: "Chat WhatsApp" (hijau, dengan icon WhatsApp)
- Mobile: hamburger menu dengan smooth slide-in drawer
- Background berubah saat scroll (transparan → putih dengan shadow)

### 2. HERO SECTION
- Headline besar (H1): "Temukan Kost & Apartemen Terbaik di Indonesia"
- Sub-headline: "Dari Sabang sampai Merauke — pilihan hunian terverifikasi, harga transparan, langsung hubungi owner."
- Dua CTA button: "Lihat Katalog →" (primary) + "Chat WhatsApp" (secondary/outline)
- Background: Gradient mesh dengan warna teal-gold yang sophisticated
- Floating card di sisi kanan: mockup card listing hunian yang cantik
- Animasi: teks masuk dari bawah dengan stagger, card melayang (float animation)
- Trust bar di bawah: "500+ Listing · 20+ Kota · 1.000+ Penghuni Puas · Terverifikasi"

### 3. SECTION HIGHLIGHT KOTA (Grid)
- Judul: "Tersedia di Kota-Kota Besar Indonesia"
- Grid 6 kota: Jakarta, Bandung, Surabaya, Bali, Yogyakarta, Medan
- Setiap card: foto/ilustrasi kota, nama kota, jumlah listing tersedia, hover effect
- Desain card: overlay gradient pada foto dengan nama kota di bawah

### 4. ABOUT US SECTION
- Split layout: teks kiri, visual/ilustrasi kanan
- Judul: "Mengapa Memilih Partner Livingku?"
- Paragraf singkat: narasi misi dan visi brand
- 4 keunggulan dalam grid icon:
  - 🏠 Listing Terverifikasi
  - 💰 Harga Transparan  
  - 📸 Foto Real & Akurat
  - ⚡ Respon Cepat via WA
- Counter animasi (scroll-triggered): Total Listing, Kota Tersedia, Penghuni Puas

### 5. OUR SERVICES SECTION
- Judul: "Temukan Hunian yang Tepat Untukmu"
- Filter tab: Semua | Kost | Apartemen | Harian
- Grid 6 listing card, setiap card berisi:
  - Foto (gunakan gradient placeholder yang cantik sebagai pengganti foto)
  - Badge tipe (Kost Eksklusif / Apartemen Studio / dll)
  - Nama properti & lokasi
  - Fasilitas badge (AC, WiFi, KM Dalam)
  - Harga per bulan dengan format Rupiah
  - Tombol "Detail" + tombol "Chat WA" 
- Tab filter berfungsi (JS untuk show/hide berdasarkan kategori)

### 6. TESTIMONI SECTION
- Background: warna Surface (#F2EDE8) untuk membedakan section
- Judul: "Apa Kata Mereka?"
- Sub: Rating agregat 4.9/5 dari 200+ penghuni
- Grid 3 testimoni card:
  - Avatar (inisial nama dalam circle berwarna)
  - Nama, kota, tipe hunian
  - Rating bintang (⭐)
  - Kutipan testimoni
- Desain card elegan dengan quote mark dekoratif

### 7. FAQ SECTION (Accordion)
- Judul: "Pertanyaan yang Sering Ditanyakan"
- 5 FAQ dengan accordion open/close animation:
  1. Berapa harga kost di Jakarta per bulan?
  2. Apakah layanan ini gratis untuk pencari kost?
  3. Bagaimana cara menghubungi owner listing?
  4. Apakah semua listing sudah diverifikasi?
  5. Kota apa saja yang tersedia di Partner Livingku?
- Animasi smooth expand/collapse

### 8. CONTACT US / CTA SECTION
- Background gradient teal yang kuat sebagai section penutup
- Judul besar: "Siap Menemukan Hunian Impianmu?"
- Sub: "Tim kami siap membantu Senin–Minggu, 08.00–21.00 WIB"
- Tombol besar WhatsApp: "💬 Chat Sekarang di WhatsApp"
  - Warna hijau WhatsApp (#25D366)
  - URL: https://wa.me/6281234567890?text=Halo%20Katalog%20Livingku%2C%20saya%20ingin%20mencari%20hunian
- Info kontak: nomor WA, email, area layanan

### 9. FOOTER
- Logo + tagline
- Kolom navigasi: Halaman, Kota Populer, Tipe Hunian
- Info copyright: © 2025 Partner Livingku
- Link: Privacy Policy | Syarat & Ketentuan
- Desain: dark background (#1B3A4B) dengan teks terang

### 10. FLOATING WHATSAPP BUTTON
- Tombol bulat hijau mengambang di pojok kanan bawah
- Icon WhatsApp + tooltip "Chat dengan kami"
- Animasi pulse yang lembut
- Selalu visible di semua halaman/scroll position

---

## TECHNICAL REQUIREMENTS

**Framework:** Vanilla HTML + CSS + JavaScript (single file, no build tools)  
**Font:** Import dari Google Fonts (Playfair Display + Plus Jakarta Sans)  
**Icons:** Gunakan emoji atau SVG inline (jangan CDN eksternal selain Google Fonts)  
**Responsif:** Mobile-first, breakpoint di 768px dan 1024px  
**Animasi:**
- CSS: fade-in on scroll (Intersection Observer API)
- Counter number animasi saat masuk viewport
- Smooth scroll antar section
- Tab filter dengan transition
- Accordion FAQ dengan CSS transition height
- Navbar background transition saat scroll
- Card hover effects (lift + shadow)
- Floating card di hero section (CSS keyframe float)

**Performa:**
- Tidak ada gambar eksternal (gunakan CSS gradient sebagai placeholder)
- Semua aset inline dalam satu file
- CSS variables untuk theming yang konsisten

**Aksesibilitas:**
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels pada tombol interaktif
- Focus states yang terlihat
- Alt text pada semua elemen img

---

## DETAIL KONTEN MOCK DATA

**Listing Cards (6 item):**
1. Kost Eksklusif Menteng | Jakarta Pusat | AC, WiFi, KM Dalam, Parkir | Rp 2.500.000/bln
2. Apartemen Studio Dago | Bandung | AC, WiFi, Dapur, Balkon | Rp 3.200.000/bln
3. Kost Putri Tidar | Surabaya | WiFi, KM Dalam, Laundry | Rp 1.200.000/bln
4. Kost Harian Seminyak | Bali | AC, WiFi, Pool Access | Rp 250.000/hari
5. Kost Campur Condongcatur | Yogyakarta | WiFi, Dapur Bersama | Rp 800.000/bln
6. Apartemen 1BR Helvetia | Medan | AC, WiFi, Gym, Security 24h | Rp 4.500.000/bln

**Testimoni (3 item):**
1. Rizky Pratama | Jakarta | Kost Eksklusif — "Proses nyarinya gampang banget, langsung direspon tim-nya. Kost yang saya temukan sesuai banget sama foto!"
2. Sari Dewi | Bandung | Apartemen Studio — "Partner Livingku beneran bantu saya pas pindah kerja ke Bandung. Dalam 2 hari langsung dapat hunian yang cocok."
3. Ahmad Fauzi | Surabaya | Kost Putri — "Rekomendasiin ke temen-temen, listing-nya banyak dan harganya transparan. Gak ada biaya tersembunyi!"

---

## SPECIAL DESIGN TOUCHES

1. **Batik Pattern Background:** Buat SVG inline subtle geometric pattern terinspirasi motif batik untuk background beberapa section (opacity 3-5%, sangat subtle)

2. **Gold Line Divider:** Tambahkan garis tipis gold (#C9A84C) sebagai pemisah antar section atau sebagai elemen dekoratif heading

3. **Gradient Placeholder Cards:** Setiap listing card gunakan gradient unik yang cantik sebagai photo placeholder (teal-to-emerald, gold-to-amber, dll)

4. **Scroll Progress Bar:** Tambahkan thin progress bar di bagian atas halaman yang menunjukkan seberapa jauh user sudah scroll

5. **Hover Microinteraction:** Pada listing card, saat hover: gambar sedikit zoom in, card terangkat, tombol WA muncul dengan slide-up effect

6. **Number Formatting:** Semua harga dalam format Rupiah yang benar (Rp 2.500.000, bukan 2500000)

7. **Section Entrance Animation:** Setiap section masuk dengan fade + translateY saat scroll ke viewport (Intersection Observer)

Buat semua ini dalam satu file HTML yang bisa langsung dibuka di browser. Pastikan 
semua fitur berfungsi, desain konsisten, dan hasilnya terasa seperti website profesional 
yang dibuat oleh tim desainer berpengalaman — bukan template generik.
```