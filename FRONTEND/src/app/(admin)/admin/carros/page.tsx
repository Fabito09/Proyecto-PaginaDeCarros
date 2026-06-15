import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Zap } from "lucide-react";
import { Car } from "@/types";
import { formatPrice } from "@/lib/utils";
import LogoutButton from "@/components/ui/LogoutButton";

export const metadata = {
  title: "Catálogo — Admin",
};

export default async function AdminCarsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Zap className="w-5 h-5 text-primary" fill="currentColor" />
            ElectroAuto <span className="text-muted font-normal text-sm ml-1">/ Admin</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-muted hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Catálogo de Vehículos</h1>
              <p className="text-muted text-sm mt-0.5">{cars?.length ?? 0} vehículos registrados</p>
            </div>
          </div>
          <Link href="/admin/carros/nuevo" className="btn-primary text-sm">
            <Plus className="w-4 h-4" />
            Agregar
          </Link>
        </div>

        {!cars || cars.length === 0 ? (
          <div className="text-center py-20 card">
            <Zap className="w-12 h-12 text-border mx-auto mb-4" />
            <p className="text-muted mb-4">No hay vehículos en el catálogo.</p>
            <Link href="/admin/carros/nuevo" className="btn-primary text-sm inline-flex">
              <Plus className="w-4 h-4" />
              Agregar el primero
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-6 py-4 text-muted text-xs font-medium uppercase tracking-wider">Vehículo</th>
                  <th className="text-left px-6 py-4 text-muted text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Precio</th>
                  <th className="text-left px-6 py-4 text-muted text-xs font-medium uppercase tracking-wider hidden md:table-cell">Autonomía</th>
                  <th className="text-left px-6 py-4 text-muted text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Destacado</th>
                  <th className="text-right px-6 py-4 text-muted text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {cars.map((car: Car) => (
                  <tr key={car.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-foreground font-medium text-sm">{car.brand} {car.model}</p>
                        <p className="text-muted text-xs">{car.year}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-foreground text-sm">{formatPrice(car.price)}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-foreground text-sm">{car.range_km} km</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full ${car.is_featured ? "bg-primary/10 text-primary" : "bg-surface-2 text-muted"}`}>
                        {car.is_featured ? "Sí" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/carros/${car.id}/editar`}
                          className="text-muted hover:text-primary transition-colors"
                          aria-label="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/carros/${car.id}/eliminar`}
                          className="text-muted hover:text-red-400 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
