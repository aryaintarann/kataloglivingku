import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Partner Livingku",
  description:
    "Syarat dan ketentuan penggunaan layanan Partner Livingku — direktori kost dan apartemen terpercaya di Indonesia.",
  robots: { index: true, follow: true },
};

const sections = [
  "Penerimaan Syarat",
  "Deskripsi Layanan",
  "Ketentuan Penggunaan",
  "Listing & Konten Properti",
  "Interaksi dengan Owner",
  "Hak Kekayaan Intelektual",
  "Penafian & Batasan Tanggung Jawab",
  "Penghentian Layanan",
  "Hukum yang Berlaku",
  "Perubahan Syarat & Ketentuan",
  "Hubungi Kami",
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Dokumen Legal</span>
          <h1>Syarat &amp; Ketentuan</h1>
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Terakhir diperbarui: 1 Januari 2025
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="legal-body">
        <div className="container">

          {/* TOC */}
          <aside className="legal-toc" aria-label="Daftar isi">
            <h6>Daftar Isi</h6>
            <ol>
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#tos-${i + 1}`}>{s}</a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Content */}
          <article className="legal-content">

            <div className="legal-highlight">
              <p>
                Dengan mengakses atau menggunakan website Partner Livingku, Anda menyetujui
                untuk terikat dengan syarat dan ketentuan yang diuraikan di bawah ini. Harap
                baca dengan seksama sebelum menggunakan layanan kami.
              </p>
            </div>

            {/* 1 */}
            <div className="legal-section" id="tos-1">
              <div className="legal-section-header">
                <span className="legal-section-num">01</span>
                <h2>Penerimaan Syarat</h2>
              </div>
              <p>
                Syarat dan Ketentuan ini merupakan perjanjian yang sah antara Anda (selanjutnya
                disebut &ldquo;Pengguna&rdquo;) dan Partner Livingku (selanjutnya disebut &ldquo;Kami&rdquo; atau
                &ldquo;Platform&rdquo;).
              </p>
              <p>
                Dengan mengakses, menelusuri, atau menggunakan layanan kami dengan cara apapun,
                Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat
                dengan syarat-syarat ini. Jika Anda tidak menyetujui salah satu syarat yang
                tercantum, mohon untuk tidak menggunakan layanan kami.
              </p>
              <p>
                Layanan kami ditujukan untuk pengguna yang berusia minimal 17 tahun. Dengan
                menggunakan layanan ini, Anda menyatakan bahwa Anda memenuhi persyaratan usia tersebut.
              </p>
            </div>

            {/* 2 */}
            <div className="legal-section" id="tos-2">
              <div className="legal-section-header">
                <span className="legal-section-num">02</span>
                <h2>Deskripsi Layanan</h2>
              </div>
              <p>
                Partner Livingku adalah platform direktori hunian berbasis web yang menyediakan:
              </p>
              <ul>
                <li>Katalog listing kost-kostan dan apartemen di berbagai kota di Indonesia</li>
                <li>Informasi properti meliputi lokasi, harga, fasilitas, dan foto hunian</li>
                <li>Fasilitas penghubung antara pencari hunian dengan owner atau pengelola properti melalui WhatsApp</li>
                <li>Informasi panduan pencarian dan penyewaan hunian</li>
              </ul>
              <p>
                Partner Livingku berfungsi sebagai <strong>direktori informatif</strong>, bukan
                sebagai platform booking atau agen properti. Kami tidak menjadi pihak dalam
                transaksi sewa antara pencari hunian dan owner properti.
              </p>
              <p>
                Layanan ini gratis untuk diakses oleh pencari hunian. Kami tidak memungut biaya
                apapun dari pengguna untuk melihat listing atau menghubungi owner.
              </p>
            </div>

            {/* 3 */}
            <div className="legal-section" id="tos-3">
              <div className="legal-section-header">
                <span className="legal-section-num">03</span>
                <h2>Ketentuan Penggunaan</h2>
              </div>
              <p>Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan syarat ini. Anda dilarang untuk:</p>
              <ul>
                <li>Menggunakan layanan untuk tujuan yang melanggar hukum atau peraturan yang berlaku di Indonesia</li>
                <li>Menyebarkan konten yang bersifat menipu, menghina, atau melanggar hak orang lain</li>
                <li>Mencoba mengakses, mengganggu, atau merusak sistem kami atau data pengguna lain</li>
                <li>Menggunakan bot, scraper, atau alat otomatis untuk mengumpulkan data dari platform kami tanpa izin tertulis</li>
                <li>Menyamar sebagai orang lain atau entitas lain</li>
                <li>Mengirimkan spam atau komunikasi yang tidak diminta kepada owner atau tim kami</li>
                <li>Melakukan tindakan yang dapat membebani infrastruktur platform kami secara tidak wajar</li>
              </ul>
              <p>
                Pelanggaran terhadap ketentuan ini dapat mengakibatkan pembatasan atau pemutusan
                akses Anda terhadap layanan kami tanpa pemberitahuan sebelumnya.
              </p>
            </div>

            {/* 4 */}
            <div className="legal-section" id="tos-4">
              <div className="legal-section-header">
                <span className="legal-section-num">04</span>
                <h2>Listing &amp; Konten Properti</h2>
              </div>
              <p>
                Setiap listing yang tampil di Partner Livingku telah melalui proses kurasi dan
                verifikasi dasar oleh tim kami. Namun demikian, kami memberikan ketentuan berikut:
              </p>
              <ul>
                <li>
                  <strong>Akurasi informasi</strong> — Kami berupaya memastikan keakuratan informasi
                  listing, namun tidak dapat menjamin bahwa seluruh data (harga, fasilitas,
                  ketersediaan) selalu mutakhir
                </li>
                <li>
                  <strong>Perubahan harga</strong> — Harga yang tertera adalah harga pada saat
                  listing dibuat dan dapat berubah tanpa pemberitahuan sebelumnya
                </li>
                <li>
                  <strong>Ketersediaan unit</strong> — Status ketersediaan kamar/unit tergantung
                  pada informasi terkini dari owner dan dapat berbeda dari yang tertera
                </li>
                <li>
                  <strong>Foto properti</strong> — Foto yang ditampilkan merupakan dokumentasi
                  aktual properti, namun kondisi fisik dapat berubah seiring waktu
                </li>
              </ul>
              <p>
                Kami berhak untuk menambahkan, mengubah, menangguhkan, atau menghapus listing
                kapan saja tanpa pemberitahuan, terutama jika listing tidak lagi memenuhi
                standar kualitas atau keakuratan kami.
              </p>
            </div>

            {/* 5 */}
            <div className="legal-section" id="tos-5">
              <div className="legal-section-header">
                <span className="legal-section-num">05</span>
                <h2>Interaksi dengan Owner</h2>
              </div>
              <p>
                Saat Anda menghubungi owner properti melalui tombol WhatsApp di platform kami,
                perlu dipahami hal-hal berikut:
              </p>
              <ul>
                <li>
                  Komunikasi dan transaksi antara Anda dan owner merupakan hubungan langsung
                  antara dua pihak — Partner Livingku tidak terlibat atau bertanggung jawab
                  atas hasil komunikasi tersebut
                </li>
                <li>
                  Kami menyarankan Anda untuk melakukan survei langsung ke properti sebelum
                  menandatangani kontrak sewa apapun
                </li>
                <li>
                  Pastikan Anda memahami semua syarat sewa yang ditetapkan owner sebelum
                  melakukan pembayaran apapun
                </li>
                <li>
                  Partner Livingku tidak bertanggung jawab atas sengketa, kerugian finansial,
                  atau masalah yang timbul dari transaksi antara Anda dan owner
                </li>
              </ul>
              <p>
                Jika Anda mengalami masalah dengan listing atau owner yang terdaftar di
                platform kami, harap laporkan kepada tim kami agar dapat kami tindaklanjuti.
              </p>
            </div>

            {/* 6 */}
            <div className="legal-section" id="tos-6">
              <div className="legal-section-header">
                <span className="legal-section-num">06</span>
                <h2>Hak Kekayaan Intelektual</h2>
              </div>
              <p>
                Seluruh konten yang terdapat di platform Partner Livingku, termasuk namun tidak
                terbatas pada teks, grafis, logo, ikon, gambar, klip audio, unduhan digital,
                dan kompilasi data, adalah milik Partner Livingku atau pemilik konten yang
                memberikan lisensi kepada kami, dan dilindungi oleh hukum hak cipta Indonesia.
              </p>
              <p>
                Anda diizinkan untuk mengakses dan menggunakan konten platform ini untuk
                keperluan pribadi dan non-komersial. Dilarang keras untuk:
              </p>
              <ul>
                <li>Mereproduksi, mendistribusikan, atau membuat karya turunan dari konten kami tanpa izin tertulis</li>
                <li>Menggunakan nama, logo, atau merek Partner Livingku tanpa persetujuan eksplisit</li>
                <li>Menggunakan konten kami untuk tujuan komersial tanpa lisensi yang sesuai</li>
              </ul>
              <p>
                Foto properti yang diunggah oleh owner tetap menjadi hak milik owner yang
                bersangkutan. Owner memberikan lisensi terbatas kepada kami untuk menampilkan
                foto tersebut dalam platform.
              </p>
            </div>

            {/* 7 */}
            <div className="legal-section" id="tos-7">
              <div className="legal-section-header">
                <span className="legal-section-num">07</span>
                <h2>Penafian &amp; Batasan Tanggung Jawab</h2>
              </div>
              <p>
                Layanan Partner Livingku disediakan &ldquo;sebagaimana adanya&rdquo; (<em>as-is</em>) dan
                &ldquo;sebagaimana tersedia&rdquo; (<em>as-available</em>) tanpa jaminan apapun, baik
                tersurat maupun tersirat.
              </p>
              <p>Sejauh diizinkan oleh hukum yang berlaku, kami tidak bertanggung jawab atas:</p>
              <ul>
                <li>Kerugian finansial atau non-finansial yang timbul dari penggunaan layanan kami</li>
                <li>Gangguan atau ketidaktersediaan layanan yang disebabkan oleh force majeure, pemeliharaan, atau faktor teknis</li>
                <li>Keakuratan, kelengkapan, atau ketersediaan informasi dalam listing properti</li>
                <li>Tindakan, konten, atau transaksi yang dilakukan oleh owner properti</li>
                <li>Kehilangan data atau kerusakan yang timbul dari penggunaan platform kami</li>
              </ul>
              <p>
                Total kewajiban Partner Livingku kepada Anda atas klaim apapun tidak akan
                melebihi jumlah yang Anda bayarkan kepada kami dalam 12 bulan terakhir
                (yang dalam hal layanan gratis, adalah nol).
              </p>
            </div>

            {/* 8 */}
            <div className="legal-section" id="tos-8">
              <div className="legal-section-header">
                <span className="legal-section-num">08</span>
                <h2>Penghentian Layanan</h2>
              </div>
              <p>
                Kami berhak untuk menghentikan atau menangguhkan akses Anda terhadap layanan
                kami, atas kebijakan kami sendiri, kapan saja dan tanpa pemberitahuan, jika
                kami meyakini bahwa Anda melanggar Syarat dan Ketentuan ini.
              </p>
              <p>
                Anda juga dapat menghentikan penggunaan layanan kami kapan saja dengan berhenti
                mengakses platform. Tidak diperlukan proses pembatalan khusus karena layanan
                ini tidak memerlukan registrasi atau langganan.
              </p>
              <p>
                Penghentian layanan tidak membebaskan kewajiban yang timbul sebelum penghentian
                terjadi. Ketentuan yang secara alami harus tetap berlaku setelah penghentian
                akan tetap berlaku.
              </p>
            </div>

            {/* 9 */}
            <div className="legal-section" id="tos-9">
              <div className="legal-section-header">
                <span className="legal-section-num">09</span>
                <h2>Hukum yang Berlaku</h2>
              </div>
              <p>
                Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang
                berlaku di Republik Indonesia, termasuk namun tidak terbatas pada:
              </p>
              <ul>
                <li>UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (ITE) beserta perubahannya</li>
                <li>UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi</li>
                <li>Peraturan perundang-undangan lain yang berlaku di Indonesia</li>
              </ul>
              <p>
                Setiap sengketa yang timbul sehubungan dengan penggunaan layanan ini akan
                diselesaikan melalui musyawarah mufakat. Jika tidak tercapai kesepakatan,
                sengketa akan diselesaikan melalui Pengadilan Negeri yang berwenang di Indonesia.
              </p>
            </div>

            {/* 10 */}
            <div className="legal-section" id="tos-10">
              <div className="legal-section-header">
                <span className="legal-section-num">10</span>
                <h2>Perubahan Syarat &amp; Ketentuan</h2>
              </div>
              <p>
                Kami berhak untuk mengubah, memodifikasi, atau memperbarui Syarat dan Ketentuan
                ini kapan saja. Perubahan material akan diinformasikan melalui pemberitahuan
                di website kami.
              </p>
              <p>
                Tanggal &ldquo;Terakhir diperbarui&rdquo; di bagian atas halaman ini mencerminkan kapan
                terakhir kali syarat ini direvisi. Penggunaan berkelanjutan atas layanan kami
                setelah perubahan dipublikasikan dianggap sebagai penerimaan Anda atas syarat
                yang telah diperbarui.
              </p>
              <p>
                Disarankan untuk meninjau halaman ini secara berkala untuk memastikan Anda
                mengetahui syarat terkini.
              </p>
            </div>

            {/* 11 */}
            <div className="legal-section" id="tos-11">
              <div className="legal-section-header">
                <span className="legal-section-num">11</span>
                <h2>Hubungi Kami</h2>
              </div>
              <p>
                Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, atau ingin
                melaporkan pelanggaran, silakan hubungi kami:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:halo@partnerlivingku.id">halo@partnerlivingku.id</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></li>
                <li><strong>Jam operasional:</strong> Senin–Minggu, 08.00–21.00 WIB</li>
              </ul>
              <p>
                Kami berkomitmen untuk merespons setiap pertanyaan atau laporan terkait
                ketentuan penggunaan dalam waktu 5 hari kerja.
              </p>
            </div>

            {/* CTA Box */}
            <div className="legal-contact-box">
              <div>
                <h3>Ada pertanyaan tentang ketentuan kami?</h3>
                <p>Tim kami siap membantu Senin–Minggu, 08.00–21.00 WIB.</p>
              </div>
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20bertanya%20tentang%20Syarat%20%26%20Ketentuan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
                style={{ flexShrink: 0 }}
              >
                Hubungi via WhatsApp
              </a>
            </div>

            <p style={{ marginTop: "32px", fontSize: ".85rem", color: "var(--muted)" }}>
              Lihat juga:{" "}
              <Link href="/privacy-policy">Kebijakan Privasi</Link>
              {" "}· Kembali ke{" "}
              <Link href="/">Halaman Utama</Link>
            </p>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
