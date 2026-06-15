import LoginForm from "@/components/ui/LoginForm";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Admin — Acceso",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-2xl text-foreground mb-2">
            <Zap className="w-7 h-7 text-primary" fill="currentColor" />
            ElectroAuto
          </div>
          <p className="text-muted text-sm">Panel de Administración</p>
        </div>

        <div className="card">
          <h1 className="text-xl font-semibold text-foreground mb-6">Iniciar Sesión</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
