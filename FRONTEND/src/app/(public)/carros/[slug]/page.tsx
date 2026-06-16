import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Battery,
  Gauge,
  BatteryCharging,
  Wind,
  Timer,
  CheckCircle2,
} from "lucide-react";
import ImageGallery from "@/components/ui/ImageGallery";
import { formatPrice, formatPriceUSD } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: car } = await supabase
    .from("cars")
    .select("name, brand, model, description")
    .eq("slug", slug)
    .single();

  if (!car) return { title: "Vehículo no encontrado" };

  return {
    title: `${car.name} — ElectroAuto`,
    description: car.description || `${car.brand} ${car.model} eléctrico de alta gama.`,
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: car } = await supabase
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!car) notFound();

  const specs = [
    { icon: Battery, label: "Autonomía", value: `${car.range_km} km` },
    { icon: Zap, label: "Potencia", value: `${car.power_hp} HP` },
    { icon: Gauge, label: "0 – 100 km/h", value: `${car.acceleration_0_100}s` },
    { icon: Wind, label: "Velocidad máx.", value: `${car.top_speed_kmh} km/h` },
    { icon: BatteryCharging, label: "Batería", value: `${car.battery_kwh} kWh` },
    { icon: Timer, label: "Carga completa", value: `${car.charge_time_h}h` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href="/carros"
        className="inline-flex items-center gap-2 text-muted text-sm hover:text-primary transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <ImageGallery
          images={car.images ?? []}
          brand={car.brand}
          model={car.model}
          isFeatured={car.is_featured}
        />

        {/* Info */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="text-muted text-xs font-semibold uppercase tracking-widest mb-2">
              {car.brand} · {car.year}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              {car.name}
            </h1>

            {/* Price */}
            <div
              className="inline-block px-6 py-4 rounded-xl mb-6"
              style={{
                background: "rgba(0,229,255,0.06)",
                border: "1px solid rgba(0,229,255,0.2)",
              }}
            >
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Precio</p>
              <p
                className="text-3xl font-bold text-primary"
                style={{ textShadow: "0 0 20px rgba(0,229,255,0.3)" }}
              >
                {formatPrice(car.price)}
              </p>
              <p className="text-muted text-sm mt-1">{formatPriceUSD(car.price)}</p>
            </div>

            {car.description && (
              <p className="text-muted text-sm leading-relaxed">{car.description}</p>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`/contacto?interes=${encodeURIComponent(car.name)}`}
            className="btn-primary text-center"
          >
            <Zap className="w-4 h-4" />
            Consultar este vehículo
          </Link>
        </div>
      </div>

      <hr className="circuit-line my-14" />

      {/* Specs */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-foreground mb-8">Especificaciones Técnicas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {specs.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="p-5 rounded-xl flex flex-col gap-3"
              style={{
                background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.06)",
              }}
            >
              <Icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-muted text-xs uppercase tracking-widest">{label}</p>
                <p
                  className="text-foreground font-bold text-lg"
                  style={{ textShadow: "0 0 8px rgba(0,229,255,0.15)" }}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      {car.features && car.features.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-foreground mb-8">Características</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {car.features.map((feature: string) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span className="text-muted text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
