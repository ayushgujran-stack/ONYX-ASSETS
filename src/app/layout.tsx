import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Onyx Assets LLP | Luxury Flats, Residences & Coastal Homes",
  description:
    "Building trust, one project at a time. Discover Opulence, Riviera, A.R. Sattva luxury apartments and residential enclaves in Udupi, Karnataka.",
  icons: {
    icon: "/onyx-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MNMV9F4C"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body className="bg-[#f6f5f0] text-[#141517] font-sans antialiased selection:bg-[#9c8052] selection:text-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNMV9F4C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
