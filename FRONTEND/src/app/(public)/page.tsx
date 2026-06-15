import Link from "next/link";
import { ArrowRight, Zap, Shield, BarChart3, Leaf } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Alto Rendimiento",
    description: "Vehículos con hasta 800 km de autonomía y aceleración de 0-100 en menos de 3 segundos.",
  },
  {
    icon: Leaf,
    title: "100% Eléctrico",
    description: "Cero emisiones. Cero combustible. Solo energía limpia para mover tu mundo.",
  },
  {
    icon: BarChart3,
    title: "Comparador Inteligente",
    description: "Compara modelos en tiempo real: autonomía, potencia, precio y costo por kilómetro.",
  },
  {
    icon: Shield,
    title: "Garantía y Soporte",
    description: "Respaldo completo en mantenimiento, garantía de batería y soporte técnico especializado.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,229,255,0.07)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-8">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                Evolución Eléctrica de Alta Ingeniería
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight"
              style={{
                background: "linear-gradient(to bottom, #ffffff 40%, #a3b8cc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              El reflejo del futuro es{" "}
              <span style={{
                background: "linear-gradient(135deg, #00ffaa, #00e5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Verde Eléctrico
              </span>
            </h1>

            <p className="text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
              Unimos la potencia de la ingeniería avanzada con la energía más limpia del planeta. Diseñado para destacar, programado para evolucionar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/carros" className="btn-primary text-base px-8 py-4">
                Ver Catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/comparar" className="btn-secondary text-base px-8 py-4">
                Comparar Modelos
              </Link>
            </div>

            {/* Silueta representativa */}
            <div
              className="w-full max-w-2xl h-64 rounded-2xl mx-auto mt-14 relative"
              style={{
                background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
                boxShadow: "inset 0 2px 10px rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Faros */}
              <span className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-primary"
                style={{ boxShadow: "0 0 20px 6px #00e5ff" }} />
              <span className="absolute bottom-10 right-10 w-3 h-3 rounded-full bg-primary"
                style={{ boxShadow: "0 0 20px 6px #00e5ff" }} />
              <span className="absolute inset-0 flex items-center justify-center text-muted/30 text-sm tracking-widest uppercase select-none">
                ElectroAuto
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="circuit-line" />

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              ¿Por qué{" "}
              <span className="text-primary">elegirnos?</span>
            </h2>
            <p className="section-subtitle mt-3">
              Más que una concesionaria, somos tu guía hacia la movilidad eléctrica inteligente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(0, 229, 255, 0.1)",
                    border: "1px solid #00e5ff",
                    boxShadow: "0 0 15px rgba(0, 229, 255, 0.2)",
                  }}
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="circuit-line" />

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-2xl p-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 2px 5px rgba(255,255,255,0.1), 0 25px 50px rgba(0,0,0,0.6)",
            }}
          >
            {/* Línea superior decorativa */}
            <span
              className="absolute top-0 left-1/4 right-1/4 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #00e5ff, transparent)" }}
            />
            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
              ¿Listo para el cambio?
            </h2>
            <p className="text-muted text-base mb-8 max-w-md mx-auto">
              Contáctanos y un asesor especializado te ayudará a encontrar el vehículo eléctrico ideal.
            </p>
            <Link href="/contacto" className="btn-primary text-base px-8 py-4 inline-flex">
              Contactar Ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
