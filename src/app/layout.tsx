import type { Metadata } from "next";
import { Bricolage_Grotesque, Silkscreen } from "next/font/google";
import { profile, siteUrl } from "@/data/content";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const pixel = Silkscreen({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-pixel-face",
});

const title = `${profile.name} — Game Developer · Unity & C#`;
const description = `${profile.tagline} ${profile.intro}`;
// Link previews need an absolute image URL.
const preview = { url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: `${profile.name}: ${profile.tagline}` };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/` },
  openGraph: { title, description, type: "website", url: `${siteUrl}/`, siteName: profile.name, images: [preview] },
  twitter: { card: "summary_large_image", title, description, images: [preview.url] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-torch focus:px-4 focus:py-2 focus:font-pixel focus:text-xs focus:uppercase focus:text-ink"
        >
          Skip to games
        </a>
        {children}
      </body>
    </html>
  );
}
