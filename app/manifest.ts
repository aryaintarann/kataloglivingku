import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Partner Livingku",
    short_name: "Partner Livingku",
    description: "Trusted co-living and apartment directory in Indonesia",
    start_url: "/",
    display: "standalone",
    background_color: "#1B3A4B",
    theme_color: "#1B3A4B",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
