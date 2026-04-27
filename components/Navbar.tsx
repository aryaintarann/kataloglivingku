import Link from "next/link";

const WA_NUMBER = "6281234567890";
const WA_DEFAULT = `https://wa.me/${WA_NUMBER}?text=Hello%20Partner%20Livingku%2C%20I%20am%20looking%20for%20a%20place`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width={16} height={16} fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.164 0 0 7.163 0 16c0 2.833.742 5.487 2.034 7.79L0 32l8.42-2.006A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0Zm0 29.333a13.27 13.27 0 0 1-6.747-1.836l-.483-.287-5 1.191 1.22-4.863-.315-.5A13.248 13.248 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333Zm7.273-9.927c-.397-.199-2.35-1.159-2.715-1.29-.364-.133-.63-.199-.895.199-.266.397-1.03 1.29-1.262 1.555-.233.265-.465.298-.862.1-.397-.2-1.676-.618-3.192-1.97-1.18-1.052-1.977-2.35-2.21-2.748-.232-.397-.025-.612.175-.81.18-.178.397-.464.596-.696.199-.232.265-.397.397-.662.133-.265.067-.497-.033-.696-.1-.199-.895-2.157-1.227-2.953-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.06.497-.364.397-1.39 1.358-1.39 3.312 0 1.953 1.423 3.84 1.622 4.105.199.265 2.8 4.275 6.784 5.996.948.41 1.688.654 2.265.837.952.302 1.819.26 2.504.158.764-.114 2.35-.96 2.682-1.887.332-.928.332-1.723.232-1.887-.099-.166-.364-.265-.762-.464Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <>
      <header className="nav nav-static" id="nav">
        <div className="container">
          <Link href="/" className="logo" aria-label="Partner Livingku — Home">
            <span><b>Partner</b> <i>Livingku</i></span>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#services">Our Services</Link></li>
              <li><Link href="/#testimoni">Testimonials</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="nav-cta">
            <a href={WA_DEFAULT} className="btn btn-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp">
              <WhatsAppIcon />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </header>
      <div className="nav-spacer" />
    </>
  );
}
