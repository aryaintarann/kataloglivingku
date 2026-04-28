import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "id"
    ? {
        metadataBase: new URL("https://partnerlivingku.id"),
        title: "Syarat & Ketentuan | Partner Livingku",
        description: "Syarat dan ketentuan penggunaan layanan Partner Livingku — direktori kost dan apartemen terpercaya di Indonesia.",
      }
    : {
        metadataBase: new URL("https://partnerlivingku.id"),
        title: "Terms & Conditions | Partner Livingku",
        description: "Terms and conditions for using Partner Livingku — Indonesia's trusted co-living and apartment directory.",
      };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale === "en" ? <EnglishTerms /> : <IndonesianTerms />;
}

function IndonesianTerms() {
  const sections = ["Penerimaan Syarat","Deskripsi Layanan","Ketentuan Penggunaan","Listing & Konten Properti","Interaksi dengan Owner","Hak Kekayaan Intelektual","Penafian & Batasan Tanggung Jawab","Penghentian Layanan","Hukum yang Berlaku","Perubahan Syarat","Hubungi Kami"];
  return (
    <>
      <Navbar waDefault="https://wa.me/6281234567890" />
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Dokumen Legal</span>
          <h1>Syarat &amp; Ketentuan</h1>
          <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> Terakhir diperbarui: 1 Januari 2026</p>
        </div>
      </section>
      <div className="legal-body">
        <div className="container">
          <aside className="legal-toc" aria-label="Daftar isi">
            <h6>Daftar Isi</h6>
            <ol>{sections.map((s, i) => <li key={i}><a href={`#tos-${i + 1}`}>{s}</a></li>)}</ol>
          </aside>
          <article className="legal-content">
            <div className="legal-highlight"><p>Dengan mengakses atau menggunakan layanan Partner Livingku, Anda menyetujui syarat dan ketentuan berikut. Bacalah dengan seksama sebelum menggunakan layanan kami.</p></div>
            <div className="legal-section" id="tos-1"><div className="legal-section-header"><span className="legal-section-num">01</span><h2>Penerimaan Syarat</h2></div><p>Dengan menggunakan website partnerlivingku.id, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan ini. Jika tidak setuju, harap hentikan penggunaan layanan kami.</p></div>
            <div className="legal-section" id="tos-2"><div className="legal-section-header"><span className="legal-section-num">02</span><h2>Deskripsi Layanan</h2></div><p>Partner Livingku adalah platform direktori properti yang menghubungkan pencari hunian dengan owner kost dan apartemen di Indonesia. Kami menyediakan informasi listing, foto, dan fasilitas kontak. Kami bukan agen properti dan tidak bertindak sebagai pihak dalam transaksi sewa.</p></div>
            <div className="legal-section" id="tos-3"><div className="legal-section-header"><span className="legal-section-num">03</span><h2>Ketentuan Penggunaan</h2></div><p>Pengguna dilarang menggunakan layanan untuk tujuan ilegal, menyebarkan konten palsu atau menyesatkan, melakukan scraping atau pengambilan data massal tanpa izin, mengganggu keamanan sistem, atau menyalahgunakan informasi kontak owner.</p></div>
            <div className="legal-section" id="tos-4"><div className="legal-section-header"><span className="legal-section-num">04</span><h2>Listing & Konten Properti</h2></div><p>Semua listing telah melalui proses verifikasi dasar. Namun Partner Livingku tidak menjamin keakuratan mutlak informasi listing. Harga, ketersediaan, dan fasilitas dapat berubah tanpa pemberitahuan. Pengguna disarankan untuk mengkonfirmasi detail langsung kepada owner.</p></div>
            <div className="legal-section" id="tos-5"><div className="legal-section-header"><span className="legal-section-num">05</span><h2>Interaksi dengan Owner</h2></div><p>Partner Livingku memfasilitasi koneksi awal antara pencari hunian dan owner. Segala transaksi, perjanjian sewa, dan pembayaran dilakukan langsung antara kedua pihak. Partner Livingku tidak bertanggung jawab atas sengketa yang timbul dari interaksi tersebut.</p></div>
            <div className="legal-section" id="tos-6"><div className="legal-section-header"><span className="legal-section-num">06</span><h2>Hak Kekayaan Intelektual</h2></div><p>Seluruh konten website — termasuk desain, teks, logo, dan foto yang diproduksi oleh Partner Livingku — dilindungi hak cipta. Pengguna tidak diperbolehkan menyalin, mereproduksi, atau mendistribusikan konten tanpa izin tertulis.</p></div>
            <div className="legal-section" id="tos-7"><div className="legal-section-header"><span className="legal-section-num">07</span><h2>Penafian & Batasan Tanggung Jawab</h2></div><p>Layanan disediakan "sebagaimana adanya". Partner Livingku tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan layanan, termasuk namun tidak terbatas pada: ketidakakuratan informasi listing, kehilangan data, atau gangguan layanan.</p></div>
            <div className="legal-section" id="tos-8"><div className="legal-section-header"><span className="legal-section-num">08</span><h2>Penghentian Layanan</h2></div><p>Partner Livingku berhak menghentikan atau menangguhkan akses pengguna yang melanggar syarat ini tanpa pemberitahuan sebelumnya. Kami juga berhak menghentikan layanan secara keseluruhan dengan pemberitahuan wajar.</p></div>
            <div className="legal-section" id="tos-9"><div className="legal-section-header"><span className="legal-section-num">09</span><h2>Hukum yang Berlaku</h2></div><p>Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui mediasi terlebih dahulu, dan jika tidak berhasil, melalui pengadilan yang berwenang di Indonesia.</p></div>
            <div className="legal-section" id="tos-10"><div className="legal-section-header"><span className="legal-section-num">10</span><h2>Perubahan Syarat</h2></div><p>Kami berhak memperbarui syarat ini sewaktu-waktu. Perubahan berlaku setelah diposting di website. Penggunaan berkelanjutan setelah perubahan dianggap sebagai penerimaan syarat yang diperbarui.</p></div>
            <div className="legal-section" id="tos-11"><div className="legal-section-header"><span className="legal-section-num">11</span><h2>Hubungi Kami</h2></div><ul><li><strong>Email:</strong> <a href="mailto:halo@partnerlivingku.id">halo@partnerlivingku.id</a></li><li><strong>WhatsApp:</strong> <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></li><li><strong>Jam operasional:</strong> Senin–Minggu, 08.00–21.00 WIB</li></ul></div>
            <p style={{ marginTop: "32px", fontSize: ".85rem", color: "var(--muted)" }}>
              Lihat juga: <Link href="/privacy-policy">Kebijakan Privasi</Link> · Kembali ke <Link href="/">Halaman Utama</Link>
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

function EnglishTerms() {
  const sections = ["Acceptance of Terms","Service Description","Acceptable Use","Listings & Property Content","Interaction with Owners","Intellectual Property","Disclaimer & Liability","Service Termination","Governing Law","Changes to Terms","Contact Us"];
  return (
    <>
      <Navbar waDefault="https://wa.me/6281234567890" />
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Legal Document</span>
          <h1>Terms &amp; Conditions</h1>
          <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> Last updated: January 1, 2026</p>
        </div>
      </section>
      <div className="legal-body">
        <div className="container">
          <aside className="legal-toc" aria-label="Table of contents">
            <h6>Table of Contents</h6>
            <ol>{sections.map((s, i) => <li key={i}><a href={`#tos-${i + 1}`}>{s}</a></li>)}</ol>
          </aside>
          <article className="legal-content">
            <div className="legal-highlight"><p>By accessing or using Partner Livingku's services, you agree to these terms and conditions. Please read carefully before using our services.</p></div>
            <div className="legal-section" id="tos-1"><div className="legal-section-header"><span className="legal-section-num">01</span><h2>Acceptance of Terms</h2></div><p>By using partnerlivingku.id, you confirm that you have read, understood, and agree to all these terms and conditions. If you disagree, please stop using our services.</p></div>
            <div className="legal-section" id="tos-2"><div className="legal-section-header"><span className="legal-section-num">02</span><h2>Service Description</h2></div><p>Partner Livingku is a property directory platform connecting housing seekers with co-living and apartment owners in Indonesia. We provide listing information, photos, and contact facilitation. We are not a real estate agent and do not act as a party in rental transactions.</p></div>
            <div className="legal-section" id="tos-3"><div className="legal-section-header"><span className="legal-section-num">03</span><h2>Acceptable Use</h2></div><p>Users are prohibited from using the service for illegal purposes, spreading false or misleading content, unauthorized data scraping, compromising system security, or misusing owner contact information.</p></div>
            <div className="legal-section" id="tos-4"><div className="legal-section-header"><span className="legal-section-num">04</span><h2>Listings & Property Content</h2></div><p>All listings have undergone basic verification. However, Partner Livingku does not guarantee absolute accuracy of listing information. Prices, availability, and facilities may change without notice. Users are advised to confirm details directly with owners.</p></div>
            <div className="legal-section" id="tos-5"><div className="legal-section-header"><span className="legal-section-num">05</span><h2>Interaction with Owners</h2></div><p>Partner Livingku facilitates the initial connection between housing seekers and owners. All transactions, rental agreements, and payments are made directly between both parties. Partner Livingku is not responsible for disputes arising from such interactions.</p></div>
            <div className="legal-section" id="tos-6"><div className="legal-section-header"><span className="legal-section-num">06</span><h2>Intellectual Property</h2></div><p>All website content — including design, text, logos, and photos produced by Partner Livingku — is copyright protected. Users may not copy, reproduce, or distribute content without written permission.</p></div>
            <div className="legal-section" id="tos-7"><div className="legal-section-header"><span className="legal-section-num">07</span><h2>Disclaimer & Liability</h2></div><p>Services are provided "as is". Partner Livingku is not responsible for direct or indirect losses arising from use of the service, including but not limited to: listing inaccuracies, data loss, or service interruptions.</p></div>
            <div className="legal-section" id="tos-8"><div className="legal-section-header"><span className="legal-section-num">08</span><h2>Service Termination</h2></div><p>Partner Livingku reserves the right to terminate or suspend access for users who violate these terms without prior notice. We also reserve the right to discontinue the service with reasonable notice.</p></div>
            <div className="legal-section" id="tos-9"><div className="legal-section-header"><span className="legal-section-num">09</span><h2>Governing Law</h2></div><p>These terms are governed by the laws of the Republic of Indonesia. Any disputes will be resolved through mediation first, and if unsuccessful, through competent courts in Indonesia.</p></div>
            <div className="legal-section" id="tos-10"><div className="legal-section-header"><span className="legal-section-num">10</span><h2>Changes to Terms</h2></div><p>We may update these terms at any time. Changes take effect upon posting to the website. Continued use after changes constitutes acceptance of the updated terms.</p></div>
            <div className="legal-section" id="tos-11"><div className="legal-section-header"><span className="legal-section-num">11</span><h2>Contact Us</h2></div><ul><li><strong>Email:</strong> <a href="mailto:halo@partnerlivingku.id">halo@partnerlivingku.id</a></li><li><strong>WhatsApp:</strong> <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></li><li><strong>Hours:</strong> Monday–Sunday, 08:00–21:00 WIB</li></ul></div>
            <p style={{ marginTop: "32px", fontSize: ".85rem", color: "var(--muted)" }}>
              See also: <Link href="/privacy-policy">Privacy Policy</Link> · Back to <Link href="/">Homepage</Link>
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
