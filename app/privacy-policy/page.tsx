import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Partner Livingku",
  description:
    "Kebijakan privasi Partner Livingku — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
  robots: { index: true, follow: true },
};

const sections = [
  "Informasi yang Kami Kumpulkan",
  "Cara Kami Menggunakan Informasi",
  "Berbagi Informasi dengan Pihak Ketiga",
  "Keamanan Data",
  "Cookie & Teknologi Pelacakan",
  "Hak Anda atas Data Pribadi",
  "Penyimpanan & Penghapusan Data",
  "Perubahan Kebijakan Privasi",
  "Hubungi Kami",
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Dokumen Legal</span>
          <h1>Kebijakan Privasi</h1>
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Terakhir diperbarui: 1 Januari 2026
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
                  <a href={`#pp-${i + 1}`}>{s}</a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Content */}
          <article className="legal-content">

            <div className="legal-highlight">
              <p>
                Partner Livingku berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan
                bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi pribadi Anda saat
                menggunakan layanan kami. Dengan mengakses website ini, Anda menyetujui kebijakan
                privasi yang berlaku.
              </p>
            </div>

            {/* 1 */}
            <div className="legal-section" id="pp-1">
              <div className="legal-section-header">
                <span className="legal-section-num">01</span>
                <h2>Informasi yang Kami Kumpulkan</h2>
              </div>
              <p>
                Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan meningkatkan
                layanan kami kepada Anda:
              </p>
              <p><strong>Informasi yang Anda berikan secara langsung:</strong></p>
              <ul>
                <li>Nama dan informasi identitas saat menghubungi kami via WhatsApp</li>
                <li>Preferensi pencarian hunian (kota, tipe, kisaran harga)</li>
                <li>Pertanyaan atau pesan yang Anda kirimkan kepada tim kami</li>
              </ul>
              <p><strong>Informasi yang dikumpulkan secara otomatis:</strong></p>
              <ul>
                <li>Alamat IP dan informasi perangkat yang Anda gunakan</li>
                <li>Halaman yang Anda kunjungi dan durasi kunjungan (melalui Google Analytics)</li>
                <li>Sumber referral (dari mana Anda menemukan website kami)</li>
                <li>Jenis browser dan sistem operasi</li>
              </ul>
              <p>
                Kami tidak mengumpulkan informasi sensitif seperti nomor KTP, data keuangan,
                atau kata sandi tanpa persetujuan eksplisit Anda.
              </p>
            </div>

            {/* 2 */}
            <div className="legal-section" id="pp-2">
              <div className="legal-section-header">
                <span className="legal-section-num">02</span>
                <h2>Cara Kami Menggunakan Informasi</h2>
              </div>
              <p>Informasi yang kami kumpulkan digunakan untuk tujuan-tujuan berikut:</p>
              <ul>
                <li>
                  <strong>Menyediakan layanan pencarian hunian</strong> — membantu Anda menemukan
                  kost atau apartemen yang sesuai dengan kebutuhan
                </li>
                <li>
                  <strong>Meningkatkan pengalaman pengguna</strong> — memahami bagaimana pengunjung
                  menggunakan website kami untuk terus memperbaiki layanan
                </li>
                <li>
                  <strong>Komunikasi layanan pelanggan</strong> — merespons pertanyaan dan permintaan
                  yang Anda kirimkan
                </li>
                <li>
                  <strong>Analisis dan statistik</strong> — memahami tren pencarian hunian di
                  Indonesia untuk memperbaiki katalog listing kami
                </li>
                <li>
                  <strong>Keamanan platform</strong> — mendeteksi dan mencegah aktivitas yang
                  berpotensi merugikan
                </li>
              </ul>
              <p>
                Kami tidak menggunakan informasi Anda untuk tujuan pemasaran pihak ketiga
                atau menjual data Anda kepada pengiklan.
              </p>
            </div>

            {/* 3 */}
            <div className="legal-section" id="pp-3">
              <div className="legal-section-header">
                <span className="legal-section-num">03</span>
                <h2>Berbagi Informasi dengan Pihak Ketiga</h2>
              </div>
              <p>
                Partner Livingku tidak menjual, menyewakan, atau menukar informasi pribadi Anda
                kepada pihak ketiga. Kami hanya berbagi informasi dalam situasi terbatas berikut:
              </p>
              <ul>
                <li>
                  <strong>Penyedia layanan teknis</strong> — seperti Supabase (database) dan Vercel
                  (hosting), yang terikat perjanjian kerahasiaan data
                </li>
                <li>
                  <strong>Google Analytics</strong> — untuk memahami perilaku pengunjung secara
                  anonim dan agregat
                </li>
                <li>
                  <strong>Owner listing</strong> — ketika Anda memilih untuk menghubungi owner
                  properti tertentu via WhatsApp, informasi yang Anda bagikan dalam percakapan
                  tersebut diatur oleh kebijakan privasi WhatsApp/Meta
                </li>
                <li>
                  <strong>Kewajiban hukum</strong> — jika diwajibkan oleh peraturan perundang-undangan
                  Indonesia yang berlaku
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div className="legal-section" id="pp-4">
              <div className="legal-section-header">
                <span className="legal-section-num">04</span>
                <h2>Keamanan Data</h2>
              </div>
              <p>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasional untuk melindungi
                informasi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran:
              </p>
              <ul>
                <li>Koneksi HTTPS terenkripsi di seluruh website</li>
                <li>Row Level Security (RLS) pada database Supabase</li>
                <li>API key dan kredensial disimpan sebagai environment variable yang tidak
                  ter-expose ke publik</li>
                <li>Akses database dibatasi hanya untuk operasi baca (read-only) bagi pengguna publik</li>
              </ul>
              <p>
                Meskipun kami berupaya keras untuk melindungi data Anda, tidak ada metode transmisi
                atau penyimpanan data melalui internet yang 100% aman. Jika Anda menduga adanya
                pelanggaran keamanan, harap hubungi kami segera.
              </p>
            </div>

            {/* 5 */}
            <div className="legal-section" id="pp-5">
              <div className="legal-section-header">
                <span className="legal-section-num">05</span>
                <h2>Cookie &amp; Teknologi Pelacakan</h2>
              </div>
              <p>
                Website kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman
                pengguna. Cookie adalah file kecil yang disimpan di perangkat Anda.
              </p>
              <p><strong>Jenis cookie yang kami gunakan:</strong></p>
              <ul>
                <li>
                  <strong>Cookie esensial</strong> — diperlukan untuk fungsi dasar website, seperti
                  navigasi dan keamanan
                </li>
                <li>
                  <strong>Cookie analitik</strong> — melalui Google Analytics untuk memahami
                  bagaimana pengunjung berinteraksi dengan website (data dikumpulkan secara anonim)
                </li>
              </ul>
              <p>
                Anda dapat mengatur browser untuk menolak cookie, namun beberapa fungsi website
                mungkin tidak bekerja secara optimal. Untuk informasi lebih lanjut tentang
                pengelolaan cookie, lihat panduan browser Anda.
              </p>
            </div>

            {/* 6 */}
            <div className="legal-section" id="pp-6">
              <div className="legal-section-header">
                <span className="legal-section-num">06</span>
                <h2>Hak Anda atas Data Pribadi</h2>
              </div>
              <p>
                Sesuai dengan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP),
                Anda memiliki hak-hak berikut terkait data pribadi Anda:
              </p>
              <ul>
                <li><strong>Hak akses</strong> — meminta informasi tentang data pribadi yang kami miliki tentang Anda</li>
                <li><strong>Hak perbaikan</strong> — meminta koreksi data yang tidak akurat atau tidak lengkap</li>
                <li><strong>Hak penghapusan</strong> — meminta penghapusan data pribadi Anda dalam kondisi tertentu</li>
                <li><strong>Hak pembatasan pemrosesan</strong> — meminta kami untuk membatasi penggunaan data Anda</li>
                <li><strong>Hak portabilitas data</strong> — menerima data Anda dalam format yang dapat dibaca mesin</li>
                <li><strong>Hak keberatan</strong> — menolak pemrosesan data Anda untuk tujuan tertentu</li>
              </ul>
              <p>
                Untuk menggunakan hak-hak tersebut, hubungi kami melalui WhatsApp atau email
                yang tercantum di halaman Contact.
              </p>
            </div>

            {/* 7 */}
            <div className="legal-section" id="pp-7">
              <div className="legal-section-header">
                <span className="legal-section-num">07</span>
                <h2>Penyimpanan &amp; Penghapusan Data</h2>
              </div>
              <p>
                Kami menyimpan informasi pribadi Anda hanya selama diperlukan untuk tujuan yang
                dijelaskan dalam kebijakan ini, atau selama diwajibkan oleh hukum yang berlaku.
              </p>
              <ul>
                <li>Data analitik (Google Analytics) disimpan selama 14 bulan</li>
                <li>Riwayat komunikasi WhatsApp mengikuti kebijakan penyimpanan WhatsApp/Meta</li>
                <li>Data listing properti disimpan selama properti aktif di platform kami</li>
              </ul>
              <p>
                Setelah periode penyimpanan berakhir, data akan dihapus atau dianonimkan secara
                aman sehingga tidak dapat dikaitkan kembali dengan identitas Anda.
              </p>
            </div>

            {/* 8 */}
            <div className="legal-section" id="pp-8">
              <div className="legal-section-header">
                <span className="legal-section-num">08</span>
                <h2>Perubahan Kebijakan Privasi</h2>
              </div>
              <p>
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu untuk mencerminkan
                perubahan dalam praktik kami atau karena alasan operasional, hukum, atau regulasi.
              </p>
              <p>
                Setiap perubahan material akan diinformasikan melalui pemberitahuan di website
                kami setidaknya 7 hari sebelum perubahan berlaku. Tanggal &quot;Terakhir diperbarui&quot;
                di bagian atas halaman ini selalu mencerminkan versi terkini.
              </p>
              <p>
                Dengan terus menggunakan layanan kami setelah perubahan berlaku, Anda dianggap
                menyetujui kebijakan privasi yang telah diperbarui.
              </p>
            </div>

            {/* 9 */}
            <div className="legal-section" id="pp-9">
              <div className="legal-section-header">
                <span className="legal-section-num">09</span>
                <h2>Hubungi Kami</h2>
              </div>
              <p>
                Jika Anda memiliki pertanyaan, kekhawatiran, atau ingin menggunakan hak-hak
                privasi Anda, jangan ragu untuk menghubungi tim kami:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:halo@partnerlivingku.id">halo@partnerlivingku.id</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></li>
                <li><strong>Jam operasional:</strong> Senin–Minggu, 08.00–21.00 WIB</li>
              </ul>
              <p>
                Kami berkomitmen untuk merespons setiap permintaan terkait privasi dalam waktu
                paling lambat 14 hari kerja.
              </p>
            </div>

            {/* CTA Box */}
            <div className="legal-contact-box">
              <div>
                <h3>Ada pertanyaan tentang privasi?</h3>
                <p>Tim kami siap membantu Senin–Minggu, 08.00–21.00 WIB.</p>
              </div>
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20bertanya%20tentang%20Kebijakan%20Privasi"
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
              <Link href="/terms-of-service">Syarat &amp; Ketentuan</Link>
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
