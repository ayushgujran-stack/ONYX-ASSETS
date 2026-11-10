import type { Metadata } from "next";
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
  title: "Onyx Assets LLP | Luxury Residential Developments & Villas",
  description:
    "Building trust, one project at a time. Discover Opulence, Riviera, A.R. Sattva, and the Onyx Villa Collection in Udupi, Karnataka.",
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
      <body className="bg-[#f6f5f0] text-[#141517] font-sans antialiased selection:bg-[#9c8052] selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
