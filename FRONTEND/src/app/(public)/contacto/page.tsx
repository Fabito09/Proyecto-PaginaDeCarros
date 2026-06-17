import { Suspense } from "react";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contacto",
  description: "Contáctanos para más información sobre nuestros vehículos eléctricos.",
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@electroauto.com" },
  { icon: Phone, label: "Teléfono", value: "+506 0000-0000" },
  { icon: MapPin, label: "Ubicación", value: "Costa Rica" },
  { icon: Clock, label: "Horario", value: "Lun–Vie 8am–6pm" },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="section-title mb-3">Contáctanos</h1>
        <p className="section-subtitle mt-3">
          ¿Tienes preguntas sobre algún modelo? Nuestro equipo está listo para ayudarte.
        </p>
      </div>

      <hr className="circuit-line mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
            Información de Contacto
          </h2>

          {/* Tabla estilo tech */}
          <div className="space-y-0 mb-8">
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-5"
                style={{
                  borderBottom: i < contactInfo.length - 1
                    ? "1px solid rgba(163, 184, 204, 0.1)"
                    : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(0, 229, 255, 0.08)",
                      border: "1px solid rgba(0, 229, 255, 0.3)",
                      boxShadow: "0 0 10px rgba(0, 229, 255, 0.1)",
                    }}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted text-sm font-semibold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <span
                  className="text-primary text-sm font-bold"
                  style={{ textShadow: "0 0 10px rgba(0, 229, 255, 0.2)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Card visita */}
          <div
            className="rounded-xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 0 2px 5px rgba(255,255,255,0.1), 0 15px 35px rgba(0,0,0,0.4)",
            }}
          >
            <span
              className="absolute top-0 left-1/4 right-1/4 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #00e5ff, transparent)" }}
            />
            <p className="text-foreground font-semibold mb-2">¿Prefieres una visita?</p>
            <p className="text-muted text-sm leading-relaxed">
              Agenda una cita y te asesoramos personalmente. Nos aseguramos de que encuentres el vehículo perfecto para tus necesidades.
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
            Envíanos un Mensaje
          </h2>
          <div className="card">
            <Suspense fallback={<div className="py-12 text-center text-muted text-sm">Cargando formulario...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
