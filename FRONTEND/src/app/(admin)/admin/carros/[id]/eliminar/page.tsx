import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap, Trash2, AlertTriangle } from "lucide-react";
import LogoutButton from "@/components/ui/LogoutButton";
import { deleteCar } from "@/app/actions/cars";

export const metadata = {
  title: "Eliminar Vehículo — Admin",
};

export default async function DeleteCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: car } = await supabase
    .from("cars")
    .select("id, brand, model, year, name")
    .eq("id", id)
    .single();

  if (!car) notFound();

  async function handleDelete() {
    "use server";
    await deleteCar(id);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Zap className="w-5 h-5 text-primary" fill="currentColor" />
            ElectroAuto <span className="text-muted font-normal text-sm ml-1">/ Admin</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="card text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-400/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-foreground mb-2">¿Eliminar este vehículo?</h1>
            <p className="text-muted text-sm">
              Estás a punto de eliminar permanentemente:
            </p>
            <p className="text-foreground font-semibold mt-2">
              {car.brand} {car.model} {car.year}
            </p>
            <p className="text-red-400/80 text-xs mt-3">
              Esta acción no se puede deshacer.
            </p>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <Link href="/admin/carros" className="btn-secondary">
              <ArrowLeft className="w-4 h-4" />
              Cancelar
            </Link>
            <form action={handleDelete}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Sí, eliminar
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
