// app/layout.js
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "locomotive-scroll/locomotive-scroll.css";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import SiteShell from "../components/SiteShell";
import { SITE, SITE_URL } from "../lib/site";
import { SKILL_ICONS } from "../lib/data";

// Runs before first paint: hides the signature loader for visitors who have
// already seen it this session (see components/Loader.jsx).
const loaderSeenScript =
  `try{if(sessionStorage.getItem("nk-loader-seen")==="1")document.documentElement.classList.add("loader-seen")}catch(e){}`;

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Self-hosted + preloaded by next/font — replaces the render-blocking
// fonts.googleapis.com @import the loader used to depend on.
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE.name} — ${SITE.jobTitle}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type:        "website",
    url:         "/",
    siteName:    SITE.name,
    title:       `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
  },
  twitter: {
    card:        "summary",
    title:       `${SITE.name} — ${SITE.jobTitle}`,
    description: SITE.description,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23fafafa'/><text x='50' y='50' font-family='system-ui,-apple-system,sans-serif' font-size='45' font-weight='700' fill='%2309090b' text-anchor='middle' dominant-baseline='central'>NK</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#09090b",
};

// Structured data so search engines and AI agents can read who this is
// without executing any JavaScript.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type":   "WebSite",
      "@id":     `${SITE_URL}/#website`,
      url:       SITE_URL,
      name:      SITE.name,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type":    "Person",
      "@id":      `${SITE_URL}/#person`,
      name:       SITE.name,
      url:        SITE_URL,
      jobTitle:   SITE.jobTitle,
      email:      `mailto:${SITE.email}`,
      telephone:  SITE.phone,
      sameAs:     [SITE.linkedin, SITE.github],
      knowsAbout: SKILL_ICONS.map(s => s.name),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderSeenScript }} />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${greatVibes.variable}`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
