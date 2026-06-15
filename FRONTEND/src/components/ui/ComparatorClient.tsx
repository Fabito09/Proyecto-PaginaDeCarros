"use client";

import { useState } from "react";
import Image from "next/image";
import { Car } from "@/types";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Zap, Battery, Gauge, Timer, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparatorClientProps {
  cars: Car[];
}

const specs = [
  { key: "price", label: "Precio", format: (v: number) => formatPrice(v), unit: "" },
  { key: "range_km", label: "Autonomía", format: (v: number) => v.toString(), unit: "km" },
  { key: "battery_kwh", label: "Batería", format: (v: number) => v.toString(), unit: "kWh" },
  { key: "power_hp", label: "Potencia", format: (v: number) => v.toString(), unit: "HP" },
  { key: "top_speed_kmh", label: "Vel. Máxima", format: (v: number) => v.toString(), unit: "km/h" },
  { key: "acceleration_0_100", label: "0-100 km/h", format: (v: number) => v.toString(), unit: "s" },
  { key: "charge_time_h", label: "Carga completa", format: (v: number) => v.toString(), unit: "h" },
] as const;

function getBest(selected: Car[], key: keyof Car, lower = false): string {
  if (selected.length < 2) return "";
  const values = selected.map((c) => c[key] as number);
  const best = lower ? Math.min(...values) : Math.max(...values);
  return String(best);
}

export default function ComparatorClient({ cars }: ComparatorClientProps) {
  const [selected, setSelected] = useState<Car[]>([]);
  const [kwhPrice, setKwhPrice] = useState(2.5);

  const addCar = (car: Car) => {
    if (selected.length >= 3 || selected.find((c) => c.id === car.id)) return;
    setSelected((prev) => [...prev, car]);
  };

  const removeCar = (id: string) => {
    setSelected((prev) => prev.filter((c) => c.id !== id));
  };

  const costPer100km = (car: Car) => {
    const kwh = (car.battery_kwh / car.range_km) * 100;
    return (kwh * kwhPrice).toFixed(2);
  };

  const availableCars = cars.filter((c) => !selected.find((s) => s.id === c.id));

  return (
    <div className="space-y-8">
      {/* Car Picker */}
      <div className="flex flex-wrap gap-4">
        {selected.map((car) => (
          <div key={car.id} className="flex items-center gap-2 bg-surface border border-primary/30 rounded-lg px-4 py-2">
            <span className="text-foreground text-sm font-medium">{car.brand} {car.model}</span>
            <button
              onClick={() => removeCar(car.id)}
              className="text-muted hover:text-red-400 transition-colors ml-1"
              aria-label="Quitar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {selected.length < 3 && availableCars.length > 0 && (
          <div className="relative group">
            <button className="flex items-center gap-2 border border-dashed border-border rounded-lg px-4 py-2 text-muted text-sm hover:border-primary/50 hover:text-primary transition-all">
              <Plus className="w-4 h-4" />
              Agregar vehículo
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-xl shadow-xl z-20 hidden group-hover:block animate-fade-in overflow-hidden">
              {availableCars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => addCar(car)}
                  className="w-full text-left px-4 py-3 text-sm text-muted hover:bg-surface-2 hover:text-foreground transition-colors flex items-center gap-3"
                >
                  <Zap className="w-4 h-4 text-primary shrink-0" />
                  {car.brand} {car.model} {car.year}
                </button>
              ))}
            </div>
          </div>
        )}

        {cars.length === 0 && (
          <p className="text-muted text-sm">No hay vehículos disponibles para comparar.</p>
        )}
      </div>

      {/* Cost Calculator Input */}
      <div className="flex items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 text-muted text-sm">
          <ArrowUpDown className="w-4 h-4 text-primary" />
          Precio del kWh:
        </div>
        <input
          type="number"
          step="0.1"
          min="0.1"
          value={kwhPrice}
          onChange={(e) => setKwhPrice(Number(e.target.value))}
          className="input w-28 py-1.5 text-sm"
        />
        <span className="text-muted text-sm">L (lempiras)</span>
        <p className="text-muted text-xs ml-auto hidden sm:block">
          Usado para calcular el costo por 100 km
        </p>
      </div>

      {/* Comparison Table */}
      {selected.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-muted text-sm font-medium w-40">
                  Especificación
                </th>
                {selected.map((car) => (
                  <th key={car.id} className="px-6 py-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-14 bg-surface-2 rounded-lg overflow-hidden">
                        {car.images?.[0] ? (
                          <Image
                            src={car.images[0]}
                            alt={car.name}
                            width={80}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-border" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-muted text-xs">{car.brand}</p>
                        <p className="text-foreground font-semibold text-sm">{car.model} {car.year}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(({ key, label, format, unit }) => {
                const lowerIsBetter = ["price", "acceleration_0_100", "charge_time_h"].includes(key);
                const best = getBest(selected, key as keyof Car, lowerIsBetter);

                return (
                  <tr key={key} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 text-muted text-sm">{label}</td>
                    {selected.map((car) => {
                      const value = car[key as keyof Car] as number;
                      const isBest = selected.length > 1 && String(value) === best;
                      return (
                        <td key={car.id} className="px-6 py-4 text-center">
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              isBest ? "text-primary" : "text-foreground"
                            )}
                          >
                            {format(value)}
                            {unit && <span className="text-muted font-normal ml-1 text-xs">{unit}</span>}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Cost per 100km */}
              <tr className="bg-primary/5 border-b border-border/50">
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-primary" />
                    Costo/100km
                  </div>
                </td>
                {selected.map((car) => (
                  <td key={car.id} className="px-6 py-4 text-center">
                    <span className="text-foreground text-sm font-semibold">
                      L {costPer100km(car)}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selected.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <Gauge className="w-12 h-12 text-border mx-auto mb-4" />
          <p className="text-muted text-lg font-medium">Selecciona vehículos para comparar</p>
          <p className="text-muted/60 text-sm mt-1">Puedes agregar hasta 3 modelos</p>
        </div>
      )}

      {selected.length > 0 && (
        <p className="text-muted/60 text-xs text-center">
          Los valores resaltados en <span className="text-primary">cian</span> indican el mejor resultado en esa categoría.
        </p>
      )}
    </div>
  );
}
