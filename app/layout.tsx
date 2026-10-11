import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { FiberBackground } from "@/components/FiberBackground";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif" });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#050605" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body id="top" className="flex min-h-dvh flex-col overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-[#0a0a0b]">
          Skip to content
        </a>
        <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-[60] hidden h-0.5 origin-left bg-signal" />
        <FiberBackground />
        <Nav />
        <main id="main" className="flex grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
