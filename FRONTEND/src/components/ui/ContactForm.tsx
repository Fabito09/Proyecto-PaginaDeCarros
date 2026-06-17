"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm } from "@/app/actions/contact";
import { Send, CheckCircle, Zap } from "lucide-react";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const carInterest = searchParams.get("interes") ?? "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const result = await submitContactForm({ ...form, car_interest: carInterest || undefined });

    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Error desconocido.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <CheckCircle className="w-14 h-14 text-primary mb-4" />
        <h3 className="text-foreground font-semibold text-xl mb-2">¡Mensaje enviado!</h3>
        <p className="text-muted text-sm max-w-xs">
          Nos pondremos en contacto contigo a la brevedad posible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-6 text-sm px-5 py-2.5"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {carInterest && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
          style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.2)" }}>
          <Zap className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted">Consultando sobre: <span className="text-primary font-medium">{carInterest}</span></span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="name">Nombre *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="phone">Teléfono (opcional)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={20}
          value={form.phone}
          onChange={handleChange}
          placeholder="+504 0000-0000"
          className="input"
        />
      </div>

      <div>
        <label className="label" htmlFor="message">
          Mensaje *
          <span className="text-muted/60 font-normal ml-2 text-xs">
            ({form.message.length}/2000)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={2000}
          value={form.message}
          onChange={handleChange}
          placeholder="¿En qué modelo estás interesado? ¿Qué quieres saber?"
          className="input resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center"
      >
        {status === "loading" ? (
          "Enviando..."
        ) : (
          <>
            Enviar Mensaje <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
