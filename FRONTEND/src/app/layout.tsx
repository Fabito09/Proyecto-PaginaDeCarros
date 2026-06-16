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
    default: "ElectroAuto | Vehículos Eléctricos Premium",
    template: "%s | ElectroAuto",
  },
  description:
    "Descubre nuestra selección de vehículos eléctricos de alta gama. Compara modelos, calcula autonomía y encuentra el vehículo eléctrico perfecto para ti.",
  keywords: ["vehículos eléctricos", "EV", "vehículo eléctrico"],
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
