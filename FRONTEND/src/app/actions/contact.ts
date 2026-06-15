"use server";

import { createClient } from "@/lib/supabase/server";

interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 20,
  message: 2000,
};

export async function submitContactForm(data: ContactInput): Promise<ActionResult> {
  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const phone = data.phone?.trim() || null;
  const message = data.message?.trim();

  // Validación server-side
  if (!name || name.length < 2 || name.length > MAX_LENGTHS.name) {
    return { success: false, error: "Nombre inválido." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > MAX_LENGTHS.email) {
    return { success: false, error: "Email inválido." };
  }

  if (phone && phone.length > MAX_LENGTHS.phone) {
    return { success: false, error: "Teléfono demasiado largo." };
  }

  if (!message || message.length < 10 || message.length > MAX_LENGTHS.message) {
    return { success: false, error: `El mensaje debe tener entre 10 y ${MAX_LENGTHS.message} caracteres.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert([
    { name, email, phone, message },
  ]);

  if (error) {
    return { success: false, error: "Error al enviar el mensaje. Intenta de nuevo." };
  }

  return { success: true };
}
