import { createClient } from "@/lib/supabase/server";
import CarCard from "@/components/ui/CarCard";
import { Car } from "@/types";
import { Search, SlidersHorizontal, Zap } from "lucide-react";

export const metadata = {
  title: "Catálogo",
  description: "Explora nuestra selección de carros eléctricos premium.",
};

export default async function CatalogPage() {
  const supabase = await createClient();

  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4"
          style={{
            background: "rgba(0, 229, 255, 0.08)",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            borderRadius: "30px",
            padding: "4px 14px",
          }}>
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Inventario Eléctrico
          </span>
        </div>
        <h1 className="section-title mb-2">Catálogo de Vehículos</h1>
        <p className="text-muted text-base">
          {cars?.length ?? 0} vehículos eléctricos disponibles
        </p>
      </div>

      <hr className="circuit-line mb-10" />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
          <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            className="input pl-11"
            disabled
          />
        </div>
        <button className="btn-secondary gap-2" disabled>
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Grid */}
      {!cars || cars.length === 0 ? (
        <div className="text-center py-24 card max-w-md mx-auto">
          <Zap className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">
            Sin vehículos disponibles
          </p>
          <p className="text-muted text-sm">
            Vuelve pronto, estamos actualizando nuestro inventario.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car: Car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
