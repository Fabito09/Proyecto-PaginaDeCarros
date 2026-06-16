"use client";

import { useState } from "react";
import { createCar, updateCar, CarFormData } from "@/app/actions/cars";
import { Car } from "@/types";
import Link from "next/link";
import { Save } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

interface CarFormProps {
  car?: Car;
}

export default function CarForm({ car }: CarFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(car?.images ?? []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const data: CarFormData = {
      name: (fd.get("name") as string) ?? "",
      brand: (fd.get("brand") as string) ?? "",
      model: (fd.get("model") as string) ?? "",
      year: (fd.get("year") as string) ?? "",
      price: (fd.get("price") as string) ?? "",
      range_km: (fd.get("range_km") as string) ?? "",
      battery_kwh: (fd.get("battery_kwh") as string) ?? "",
      power_hp: (fd.get("power_hp") as string) ?? "",
      charge_time_h: (fd.get("charge_time_h") as string) ?? "",
      top_speed_kmh: (fd.get("top_speed_kmh") as string) ?? "",
      acceleration_0_100: (fd.get("acceleration_0_100") as string) ?? "",
      description: (fd.get("description") as string) ?? "",
      features: (fd.get("features") as string) ?? "",
      images: imageUrls.join(","),
      is_featured: (fd.get("is_featured") as string) ?? "false",
    };

    const result = car ? await updateCar(car.id, data) : await createCar(data);

    if (result && !result.success) {
      setError(result.error ?? "Error desconocido.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información general */}
      <div className="card space-y-5">
        <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">Información General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="name">Nombre completo *</label>
            <input
              id="name" name="name" type="text" required maxLength={100}
              defaultValue={car?.name ?? ""}
              placeholder="ej. Model 3 Long Range"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="brand">Marca *</label>
            <input
              id="brand" name="brand" type="text" required maxLength={50}
              defaultValue={car?.brand ?? ""}
              placeholder="ej. Tesla"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="model">Modelo *</label>
            <input
              id="model" name="model" type="text" required maxLength={50}
              defaultValue={car?.model ?? ""}
              placeholder="ej. Model 3"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="year">Año *</label>
            <input
              id="year" name="year" type="number" required
              min={2000} max={2035}
              defaultValue={car?.year ?? new Date().getFullYear()}
              className="input"
            />
          </div>
          <div className="flex items-center gap-3 pt-5">
            <input
              id="is_featured" name="is_featured" type="checkbox"
              value="true"
              defaultChecked={car?.is_featured ?? false}
              className="w-4 h-4 rounded accent-primary cursor-pointer"
            />
            <label htmlFor="is_featured" className="label cursor-pointer mb-0">
              Vehículo destacado
            </label>
          </div>
        </div>
      </div>

      {/* Especificaciones técnicas */}
      <div className="card space-y-5">
        <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">Especificaciones Técnicas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="label" htmlFor="price">Precio (HNL) *</label>
            <input
              id="price" name="price" type="number" required min={0} step="0.01"
              defaultValue={car?.price ?? ""}
              placeholder="1200000"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="range_km">Autonomía (km) *</label>
            <input
              id="range_km" name="range_km" type="number" required min={0}
              defaultValue={car?.range_km ?? ""}
              placeholder="629"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="battery_kwh">Batería (kWh) *</label>
            <input
              id="battery_kwh" name="battery_kwh" type="number" required min={0} step="0.1"
              defaultValue={car?.battery_kwh ?? ""}
              placeholder="82"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="power_hp">Potencia (HP) *</label>
            <input
              id="power_hp" name="power_hp" type="number" required min={0}
              defaultValue={car?.power_hp ?? ""}
              placeholder="358"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="charge_time_h">Carga completa (h) *</label>
            <input
              id="charge_time_h" name="charge_time_h" type="number" required min={0} step="0.1"
              defaultValue={car?.charge_time_h ?? ""}
              placeholder="8.5"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="top_speed_kmh">Vel. máxima (km/h) *</label>
            <input
              id="top_speed_kmh" name="top_speed_kmh" type="number" required min={0}
              defaultValue={car?.top_speed_kmh ?? ""}
              placeholder="225"
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="acceleration_0_100">0–100 km/h (s) *</label>
            <input
              id="acceleration_0_100" name="acceleration_0_100" type="number" required min={0} step="0.1"
              defaultValue={car?.acceleration_0_100 ?? ""}
              placeholder="4.4"
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Descripción y características */}
      <div className="card space-y-5">
        <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">Descripción y Características</h2>
        <div>
          <label className="label" htmlFor="description">Descripción</label>
          <textarea
            id="description" name="description" rows={4} maxLength={1000}
            defaultValue={car?.description ?? ""}
            placeholder="Descripción del vehículo para el catálogo..."
            className="input resize-none"
          />
        </div>
        <div>
          <label className="label" htmlFor="features">
            Características
            <span className="text-muted/60 font-normal ml-2 text-xs">(separadas por coma)</span>
          </label>
          <textarea
            id="features" name="features" rows={3}
            defaultValue={car?.features?.join(", ") ?? ""}
            placeholder="Autopilot, Carga rápida DC, Pantalla 15 pulgadas, Techo de cristal"
            className="input resize-none"
          />
        </div>
        <div>
          <label className="label">Imágenes del vehículo</label>
          <ImageUploader
            initialImages={car?.images ?? []}
            onChange={setImageUrls}
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-3 justify-end pt-2">
        <Link href="/admin/carros" className="btn-secondary">
          Cancelar
        </Link>
        <button type="submit" disabled={loading} className="btn-primary">
          <Save className="w-4 h-4" />
          {loading ? "Guardando..." : car ? "Actualizar vehículo" : "Guardar vehículo"}
        </button>
      </div>
    </form>
  );
}
