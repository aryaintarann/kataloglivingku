import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="brand">
          <div className="logo">
            <span><b>Partner</b> <i>Livingku</i></span>
          </div>
          <p>Trusted co-living &amp; apartment directory in Indonesia. Find your ideal home, easily and safely.</p>
        </div>
        <div>
          <h5>Pages</h5>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#services">Our Services</Link></li>
            <li><Link href="/#testimoni">Testimonials</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5>Popular Cities</h5>
          <ul>
            <li><Link href="/#cities">Jakarta</Link></li>
            <li><Link href="/#cities">Bandung</Link></li>
            <li><Link href="/#cities">Surabaya</Link></li>
            <li><Link href="/#cities">Bali</Link></li>
            <li><Link href="/#cities">Yogyakarta</Link></li>
          </ul>
        </div>
        <div>
          <h5>Housing Types</h5>
          <ul>
            <li><Link href="/#services">Men's Co-living</Link></li>
            <li><Link href="/#services">Women's Co-living</Link></li>
            <li><Link href="/#services">Mixed Co-living</Link></li>
            <li><Link href="/#services">Studio Apartment</Link></li>
            <li><Link href="/#services">Daily Rent</Link></li>
          </ul>
        </div>
        <div className="legal">
          <span>© 2026 Partner Livingku. Made with ♥ in Indonesia.</span>
          <div className="links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
