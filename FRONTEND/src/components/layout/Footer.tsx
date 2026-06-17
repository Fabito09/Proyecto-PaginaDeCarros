import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#040608", borderTop: "1px solid rgba(0, 229, 255, 0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-lg tracking-widest uppercase text-foreground mb-4">
              <Zap className="w-5 h-5 text-primary" fill="currentColor" />
              Electro<span className="text-primary">Auto</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Tu destino para vehículos eléctricos de alta gama. Calidad, tecnología y sostenibilidad en un solo lugar.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">Navegación</h3>
            <ul className="space-y-3">
              {[
                { href: "/carros", label: "Catálogo" },
                { href: "/comparar", label: "Comparar Vehículos" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">Contacto</h3>
            <ul className="space-y-4">
              {[
                { icon: Mail, value: "info@electroauto.com" },
                { icon: Phone, value: "+506 0000-0000" },
                { icon: MapPin, value: "Costa Rica" },
              ].map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-center gap-3 text-muted text-sm">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Circuit-line divisor */}
        <div className="my-8">
          <hr className="circuit-line" />
        </div>

        <div className="flex justify-center">
          <p className="text-muted/60 text-xs tracking-wide text-center">
            © {new Date().getFullYear()} ElectroAuto. Todos los derechos reservados. Diseñado con energía{" "}
            <span className="text-primary">Azul Eléctrico</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
