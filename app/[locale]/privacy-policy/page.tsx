import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "id"
    ? {
        title: "Kebijakan Privasi | Partner Livingku",
        description: "Kebijakan privasi Partner Livingku — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
      }
    : {
        title: "Privacy Policy | Partner Livingku",
        description: "Partner Livingku privacy policy — how we collect, use, and protect your personal data.",
      };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  if (isEn) return <EnglishPrivacyPolicy />;
  return <IndonesianPrivacyPolicy />;
}

function IndonesianPrivacyPolicy() {
  const sections = ["Informasi yang Kami Kumpulkan","Cara Kami Menggunakan Informasi","Berbagi Informasi dengan Pihak Ketiga","Keamanan Data","Cookie & Teknologi Pelacakan","Hak Anda atas Data Pribadi","Penyimpanan & Penghapusan Data","Perubahan Kebijakan Privasi","Hubungi Kami"];
  return (
    <>
      <Navbar waDefault="https://wa.me/6281234567890" />
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Dokumen Legal</span>
          <h1>Kebijakan Privasi</h1>
          <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> Terakhir diperbarui: 1 Januari 2026</p>
        </div>
      </section>
      <div className="legal-body">
        <div className="container">
          <aside className="legal-toc" aria-label="Daftar isi">
            <h6>Daftar Isi</h6>
            <ol>{sections.map((s, i) => <li key={i}><a href={`#pp-${i + 1}`}>{s}</a></li>)}</ol>
          </aside>
          <article className="legal-content">
            <div className="legal-highlight"><p>Partner Livingku berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi pribadi Anda saat menggunakan layanan kami.</p></div>
            <div className="legal-section" id="pp-1"><div className="legal-section-header"><span className="legal-section-num">01</span><h2>Informasi yang Kami Kumpulkan</h2></div><p>Kami mengumpulkan nama dan preferensi hunian saat Anda menghubungi kami via WhatsApp, serta data teknis seperti alamat IP, jenis browser, dan halaman yang dikunjungi melalui Google Analytics.</p></div>
            <div className="legal-section" id="pp-2"><div className="legal-section-header"><span className="legal-section-num">02</span><h2>Cara Kami Menggunakan Informasi</h2></div><p>Informasi digunakan untuk menyediakan layanan pencarian hunian, meningkatkan pengalaman pengguna, merespons pertanyaan, dan memastikan keamanan platform. Kami tidak menjual data Anda.</p></div>
            <div className="legal-section" id="pp-3"><div className="legal-section-header"><span className="legal-section-num">03</span><h2>Berbagi dengan Pihak Ketiga</h2></div><p>Kami hanya berbagi informasi dengan Supabase (database), Vercel (hosting), dan Google Analytics — semua terikat perjanjian kerahasiaan. Kami tidak menjual data kepada pengiklan.</p></div>
            <div className="legal-section" id="pp-4"><div className="legal-section-header"><span className="legal-section-num">04</span><h2>Keamanan Data</h2></div><p>Kami menggunakan HTTPS, Row Level Security Supabase, dan environment variable terenkripsi. Akses database publik dibatasi hanya untuk operasi baca.</p></div>
            <div className="legal-section" id="pp-5"><div className="legal-section-header"><span className="legal-section-num">05</span><h2>Cookie & Teknologi Pelacakan</h2></div><p>Kami menggunakan cookie esensial untuk fungsi dasar dan cookie analitik via Google Analytics (data anonim).</p></div>
            <div className="legal-section" id="pp-6"><div className="legal-section-header"><span className="legal-section-num">06</span><h2>Hak Anda</h2></div><p>Sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi, Anda berhak mengakses, memperbaiki, menghapus, dan meminta portabilitas data Anda. Hubungi kami via WhatsApp atau email.</p></div>
            <div className="legal-section" id="pp-7"><div className="legal-section-header"><span className="legal-section-num">07</span><h2>Penyimpanan Data</h2></div><p>Data analitik disimpan 14 bulan. Riwayat WhatsApp mengikuti kebijakan Meta. Data listing aktif selama properti terdaftar di platform.</p></div>
            <div className="legal-section" id="pp-8"><div className="legal-section-header"><span className="legal-section-num">08</span><h2>Perubahan Kebijakan</h2></div><p>Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan material akan diinformasikan minimal 7 hari sebelum berlaku.</p></div>
            <div className="legal-section" id="pp-9"><div className="legal-section-header"><span className="legal-section-num">09</span><h2>Hubungi Kami</h2></div><ul><li><strong>Email:</strong> <a href="mailto:halo@partnerlivingku.id">halo@partnerlivingku.id</a></li><li><strong>WhatsApp:</strong> <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></li><li><strong>Jam operasional:</strong> Senin–Minggu, 08.00–21.00 WIB</li></ul></div>
            <p style={{ marginTop: "32px", fontSize: ".85rem", color: "var(--muted)" }}>
              Lihat juga: <Link href="/terms-of-service">Syarat &amp; Ketentuan</Link> · Kembali ke <Link href="/">Halaman Utama</Link>
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

function EnglishPrivacyPolicy() {
  const sections = ["Information We Collect","How We Use Information","Sharing with Third Parties","Data Security","Cookies & Tracking","Your Rights","Data Retention","Policy Changes","Contact Us"];
  return (
    <>
      <Navbar waDefault="https://wa.me/6281234567890" />
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Legal Document</span>
          <h1>Privacy Policy</h1>
          <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> Last updated: January 1, 2026</p>
        </div>
      </section>
      <div className="legal-body">
        <div className="container">
          <aside className="legal-toc" aria-label="Table of contents">
            <h6>Table of Contents</h6>
            <ol>{sections.map((s, i) => <li key={i}><a href={`#pp-${i + 1}`}>{s}</a></li>)}</ol>
          </aside>
          <article className="legal-content">
            <div className="legal-highlight"><p>Partner Livingku is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services. By accessing this website, you agree to this privacy policy.</p></div>
            <div className="legal-section" id="pp-1"><div className="legal-section-header"><span className="legal-section-num">01</span><h2>Information We Collect</h2></div><p>We collect information you provide when contacting us via WhatsApp (name, housing preferences) and automatically collected technical data including IP address, browser type, pages visited, and referral source via Google Analytics. We do not collect sensitive information such as ID numbers or financial data without explicit consent.</p></div>
            <div className="legal-section" id="pp-2"><div className="legal-section-header"><span className="legal-section-num">02</span><h2>How We Use Information</h2></div><p>Information is used to provide housing search services, improve user experience, respond to customer inquiries, conduct analytics and statistics, and ensure platform security. We do not use your information for third-party marketing or sell your data to advertisers.</p></div>
            <div className="legal-section" id="pp-3"><div className="legal-section-header"><span className="legal-section-num">03</span><h2>Sharing with Third Parties</h2></div><p>Partner Livingku does not sell or rent your personal information. We only share information with Supabase (database hosting), Vercel (website hosting), and Google Analytics — all bound by data confidentiality agreements. We may also share information if required by Indonesian law.</p></div>
            <div className="legal-section" id="pp-4"><div className="legal-section-header"><span className="legal-section-num">04</span><h2>Data Security</h2></div><p>We implement HTTPS encryption, Row Level Security (RLS) on Supabase, encrypted environment variables, and read-only public database access. While we work hard to protect your data, no internet transmission method is 100% secure.</p></div>
            <div className="legal-section" id="pp-5"><div className="legal-section-header"><span className="legal-section-num">05</span><h2>Cookies & Tracking</h2></div><p>We use essential cookies for basic website functionality and analytical cookies via Google Analytics to understand visitor behavior anonymously. You can configure your browser to reject cookies, though some features may not work optimally.</p></div>
            <div className="legal-section" id="pp-6"><div className="legal-section-header"><span className="legal-section-num">06</span><h2>Your Rights</h2></div><p>Under Indonesian Law No. 27 of 2022 on Personal Data Protection, you have the right to access, correct, delete, restrict processing of, and request portability of your personal data. To exercise these rights, contact us via WhatsApp or email.</p></div>
            <div className="legal-section" id="pp-7"><div className="legal-section-header"><span className="legal-section-num">07</span><h2>Data Retention</h2></div><p>Analytics data (Google Analytics) is retained for 14 months. WhatsApp communication history follows Meta's retention policy. Property listing data is retained while the property is active on our platform.</p></div>
            <div className="legal-section" id="pp-8"><div className="legal-section-header"><span className="legal-section-num">08</span><h2>Policy Changes</h2></div><p>We may update this privacy policy periodically. Material changes will be announced on our website at least 7 days before taking effect. Continued use of our services constitutes acceptance of the updated policy.</p></div>
            <div className="legal-section" id="pp-9"><div className="legal-section-header"><span className="legal-section-num">09</span><h2>Contact Us</h2></div><ul><li><strong>Email:</strong> <a href="mailto:halo@partnerlivingku.id">halo@partnerlivingku.id</a></li><li><strong>WhatsApp:</strong> <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></li><li><strong>Hours:</strong> Monday–Sunday, 08:00–21:00 WIB</li></ul></div>
            <p style={{ marginTop: "32px", fontSize: ".85rem", color: "var(--muted)" }}>
              See also: <Link href="/terms-of-service">Terms &amp; Conditions</Link> · Back to <Link href="/">Homepage</Link>
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
