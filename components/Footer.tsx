import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="brand">
          <div className="logo">
            <span><b>Partner</b> <i>Livingku</i></span>
          </div>
          <p>Direktori kost &amp; apartemen terpercaya di Indonesia. Temukan hunian idealmu, mudah dan terpercaya.</p>
        </div>
        <div>
          <h5>Halaman</h5>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#services">Our Services</Link></li>
            <li><Link href="/#testimoni">Testimoni</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5>Kota Populer</h5>
          <ul>
            <li><Link href="/#cities">Jakarta</Link></li>
            <li><Link href="/#cities">Bandung</Link></li>
            <li><Link href="/#cities">Surabaya</Link></li>
            <li><Link href="/#cities">Bali</Link></li>
            <li><Link href="/#cities">Yogyakarta</Link></li>
          </ul>
        </div>
        <div>
          <h5>Tipe Hunian</h5>
          <ul>
            <li><Link href="/#services">Kost Putra</Link></li>
            <li><Link href="/#services">Kost Putri</Link></li>
            <li><Link href="/#services">Kost Campur</Link></li>
            <li><Link href="/#services">Apartemen Studio</Link></li>
            <li><Link href="/#services">Sewa Harian</Link></li>
          </ul>
        </div>
        <div className="legal">
          <span>© 2026 Partner Livingku. Dibuat dengan ♥ di Indonesia.</span>
          <div className="links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
