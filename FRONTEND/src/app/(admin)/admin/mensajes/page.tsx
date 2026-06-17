import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, MailOpen, Zap } from "lucide-react";
import { ContactMessage } from "@/types";
import LogoutButton from "@/components/ui/LogoutButton";
import MarkAsReadButton from "@/components/ui/MarkAsReadButton";

export const metadata = {
  title: "Mensajes — Admin",
};

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: messages } = await supabase
    .from("contact_messages")
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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mensajes de Contacto</h1>
            <p className="text-muted text-sm mt-0.5">{messages?.length ?? 0} mensajes en total</p>
          </div>
        </div>

        {!messages || messages.length === 0 ? (
          <div className="text-center py-20 card">
            <Mail className="w-12 h-12 text-border mx-auto mb-4" />
            <p className="text-muted">No hay mensajes todavía.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg: ContactMessage) => (
              <div
                key={msg.id}
                className={`card ${!msg.read ? "border-primary/30 bg-primary/5" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      {msg.read ? (
                        <MailOpen className="w-4 h-4 text-muted" />
                      ) : (
                        <Mail className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-foreground font-semibold text-sm">{msg.name}</span>
                        {!msg.read && (
                          <span className="bg-primary text-background text-xs px-2 py-0.5 rounded-full font-medium">
                            Nuevo
                          </span>
                        )}
                      </div>
                      <p className="text-muted text-xs mb-2">{msg.email}{msg.phone ? ` · ${msg.phone}` : ""}</p>
                      {msg.car_interest && (
                        <p className="text-primary text-xs mb-2 font-medium">Interesado en: {msg.car_interest}</p>
                      )}
                      <p className="text-foreground/80 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-muted text-xs">
                      {new Date(msg.created_at).toLocaleDateString("es-CR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    {!msg.read && <MarkAsReadButton id={msg.id} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
