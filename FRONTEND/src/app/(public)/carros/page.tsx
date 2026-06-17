import { createClient } from "@/lib/supabase/server";
import { Car } from "@/types";
import { Zap } from "lucide-react";
import CatalogClient from "@/components/ui/CatalogClient";

export const metadata = {
  title: "Catálogo",
  description: "Explora nuestra selección de vehículos eléctricos premium.",
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
        <CatalogClient cars={cars as Car[]} />
      )}
    </div>
  );
}
