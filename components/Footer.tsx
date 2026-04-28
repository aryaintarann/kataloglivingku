import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer>
      <div className="container">
        <div className="brand">
          <div className="logo">
            <span><b>Partner</b> <i>Livingku</i></span>
          </div>
          <p>{t("desc")}</p>
        </div>
        <div>
          <h5>{t("pages")}</h5>
          <ul>
            <li><Link href="/">{t("home")}</Link></li>
            <li><Link href="/#about">{t("about")}</Link></li>
            <li><Link href="/#units">{t("units")}</Link></li>
            <li><Link href="/#services">{t("services")}</Link></li>
            <li><Link href="/#testimoni">{t("testimonials")}</Link></li>
            <li><Link href="/#contact">{t("contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h5>{t("popularCities")}</h5>
          <ul>
            <li><Link href="/#units">Jakarta</Link></li>
            <li><Link href="/#units">Bandung</Link></li>
            <li><Link href="/#units">Surabaya</Link></li>
            <li><Link href="/#units">Bali</Link></li>
            <li><Link href="/#units">Yogyakarta</Link></li>
          </ul>
        </div>
        <div>
          <h5>{t("housingTypes")}</h5>
          <ul>
            <li><Link href="/#units">{t("menKost")}</Link></li>
            <li><Link href="/#units">{t("womenKost")}</Link></li>
            <li><Link href="/#units">{t("mixedKost")}</Link></li>
            <li><Link href="/#units">{t("studio")}</Link></li>
            <li><Link href="/#units">{t("daily")}</Link></li>
          </ul>
        </div>
        <div className="legal">
          <span>{t("copyright")}</span>
          <div className="links">
            <Link href="/privacy-policy">{t("privacyPolicy")}</Link>
            <Link href="/terms-of-service">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
