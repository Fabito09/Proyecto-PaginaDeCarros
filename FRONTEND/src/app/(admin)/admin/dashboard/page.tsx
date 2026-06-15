import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Car,
  MessageSquare,
  TrendingUp,
  LogOut,
  Plus,
  Zap,
} from "lucide-react";
import LogoutButton from "@/components/ui/LogoutButton";

export const metadata = {
  title: "Dashboard — Admin",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [{ count: carsCount }, { count: messagesCount }, { count: unreadCount }] =
    await Promise.all([
      supabase.from("cars").select("*", { count: "exact", head: true }),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
    ]);

  const stats = [
    { label: "Vehículos en catálogo", value: carsCount ?? 0, icon: Car, href: "/admin/carros" },
    { label: "Mensajes recibidos", value: messagesCount ?? 0, icon: MessageSquare, href: "/admin/mensajes" },
    { label: "Mensajes sin leer", value: unreadCount ?? 0, icon: TrendingUp, href: "/admin/mensajes", highlight: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navbar */}
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted text-sm mt-1">Bienvenido, {user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="card hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted text-sm mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.highlight && (stat.value as number) > 0 ? "text-primary" : "text-foreground"}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/carros"
            className="card flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">Gestionar Catálogo</p>
              <p className="text-muted text-sm">Agregar, editar o eliminar vehículos</p>
            </div>
          </Link>

          <Link
            href="/admin/carros/nuevo"
            className="card flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-foreground font-medium">Agregar Vehículo</p>
              <p className="text-muted text-sm">Publicar un nuevo modelo al catálogo</p>
            </div>
          </Link>

          <Link
            href="/admin/mensajes"
            className="card flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">Ver Mensajes</p>
              <p className="text-muted text-sm">
                Revisar consultas de clientes
                {(unreadCount ?? 0) > 0 && (
                  <span className="ml-2 bg-primary text-background text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    {unreadCount} nuevo{(unreadCount ?? 0) > 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="card flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5 text-muted" />
            </div>
            <div>
              <p className="text-foreground font-medium">Ver Sitio Público</p>
              <p className="text-muted text-sm">Abrir la página principal en nueva pestaña</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
