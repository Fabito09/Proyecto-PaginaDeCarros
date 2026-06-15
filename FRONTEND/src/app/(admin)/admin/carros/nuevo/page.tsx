import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import CarForm from "@/components/ui/CarForm";
import LogoutButton from "@/components/ui/LogoutButton";

export const metadata = {
  title: "Nuevo Vehículo — Admin",
};

export default async function NewCarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/carros" className="text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Agregar Vehículo</h1>
            <p className="text-muted text-sm mt-0.5">Completa la información del nuevo vehículo eléctrico</p>
          </div>
        </div>

        <CarForm />
      </main>
    </div>
  );
}
