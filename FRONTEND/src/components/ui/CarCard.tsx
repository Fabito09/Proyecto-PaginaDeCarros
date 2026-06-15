import Link from "next/link";
import Image from "next/image";
import { Zap, Battery, Gauge } from "lucide-react";
import { Car } from "@/types";
import { formatPrice } from "@/lib/utils";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link
      href={`/carros/${car.slug}`}
      className="group flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        boxShadow: "inset 0 2px 5px rgba(255,255,255,0.08), 0 15px 35px rgba(0,0,0,0.4)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-[1rem]"
        style={{ background: "rgba(7, 10, 12, 0.5)" }}>
        {car.images && car.images[0] ? (
          <Image
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3"
            style={{
              background: "rgba(22, 56, 44, 0.4)",
              borderBottom: "1px dashed rgba(0, 229, 255, 0.2)",
            }}>
            {/* Blueprint dots */}
            <span className="w-2 h-2 rounded-full bg-primary absolute bottom-8 left-8"
              style={{ boxShadow: "0 0 10px #00e5ff" }} />
            <span className="w-2 h-2 rounded-full bg-primary absolute bottom-8 right-8"
              style={{ boxShadow: "0 0 10px #00e5ff" }} />
            <Zap className="w-10 h-10 text-primary/30" />
            <span className="text-xs text-muted/40 tracking-widest uppercase font-mono">
              {car.brand} {car.model}
            </span>
          </div>
        )}
        {car.is_featured && (
          <span
            className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: "#00e5ff",
              color: "#070a0c",
              boxShadow: "0 0 12px rgba(0, 229, 255, 0.5)",
            }}
          >
            Destacado
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-muted text-xs font-semibold uppercase tracking-widest mb-1">
            {car.brand} · {car.year}
          </p>
          <h3
            className="text-foreground font-bold text-lg group-hover:text-primary transition-colors"
            style={{ transition: "color 0.2s ease" }}
          >
            {car.name}
          </h3>
        </div>

        {/* Specs — tabla tech */}
        <div className="space-y-0 mb-4">
          {[
            { icon: Battery, value: `${car.range_km} km`, label: "Autonomía" },
            { icon: Zap, value: `${car.power_hp} HP`, label: "Potencia" },
            { icon: Gauge, value: `${car.acceleration_0_100}s`, label: "0–100" },
          ].map((spec, i) => (
            <div
              key={spec.label}
              className="flex items-center justify-between py-3"
              style={{
                borderBottom: i < 2 ? "1px solid rgba(163, 184, 204, 0.1)" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <spec.icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted text-xs uppercase tracking-wider">{spec.label}</span>
              </div>
              <span
                className="text-primary text-sm font-bold"
                style={{ textShadow: "0 0 8px rgba(0, 229, 255, 0.2)" }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: "1px solid rgba(0, 229, 255, 0.15)" }}>
          <div>
            <p className="text-muted text-xs uppercase tracking-wider">Precio</p>
            <p className="text-foreground font-bold text-lg">{formatPrice(car.price)}</p>
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ textShadow: "0 0 8px rgba(0, 229, 255, 0.4)" }}
          >
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  );
}
