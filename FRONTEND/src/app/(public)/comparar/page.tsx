import { createClient } from "@/lib/supabase/server";
import ComparatorClient from "@/components/ui/ComparatorClient";
import { Car } from "@/types";

export const metadata = {
  title: "Comparar Vehículos",
  description: "Compara vehículos eléctricos lado a lado y encuentra el ideal para ti.",
};

export default async function ComparePage() {
  const supabase = await createClient();
  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .order("brand", { ascending: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-3">Comparador de Vehículos</h1>
        <p className="section-subtitle">
          Selecciona hasta 3 modelos y compara sus especificaciones en detalle.
        </p>
      </div>

      <ComparatorClient cars={(cars as Car[]) ?? []} />
    </div>
  );
}
