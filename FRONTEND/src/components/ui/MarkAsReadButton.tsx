"use client";

import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { markMessageAsRead } from "@/app/actions/contact";

export default function MarkAsReadButton({ id }: { id: string }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted/50">
        <CheckCheck className="w-3.5 h-3.5" />
        Leído
      </span>
    );
  }

  async function handleClick() {
    setLoading(true);
    await markMessageAsRead(id);
    setDone(true);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors disabled:opacity-50"
    >
      <CheckCheck className="w-3.5 h-3.5" />
      {loading ? "Guardando..." : "Marcar como leído"}
    </button>
  );
}
