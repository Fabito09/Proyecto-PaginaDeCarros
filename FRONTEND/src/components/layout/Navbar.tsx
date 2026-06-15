"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/carros", label: "Catálogo" },
  { href: "/comparar", label: "Comparar" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ borderBottom: "1px solid rgba(0, 229, 255, 0.1)", background: "rgba(7, 10, 12, 0.85)" }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
          >
            <Zap className="w-5 h-5 text-primary" fill="currentColor" />
            Electro<span className="text-primary">Auto</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-semibold tracking-widest uppercase transition-all duration-200",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted hover:text-primary",
                  pathname === link.href && "drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contacto" className="btn-primary text-xs px-4 py-2">
              Solicitar Info
            </Link>
          </div>

          <button
            className="md:hidden text-muted hover:text-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in"
            style={{ borderTop: "1px solid rgba(0, 229, 255, 0.1)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-xs px-4 py-2 w-full justify-center mt-2"
            >
              Solicitar Info
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
