import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ElectroAuto | Carros Eléctricos Premium",
    template: "%s | ElectroAuto",
  },
  description:
    "Descubre nuestra selección de carros eléctricos de alta gama. Compara modelos, calcula autonomía y encuentra el vehículo eléctrico perfecto para ti.",
  keywords: ["carros eléctricos", "vehículos eléctricos", "EV", "autos eléctricos"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
