"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface CarFormData {
  name: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  range_km: string;
  battery_kwh: string;
  power_hp: string;
  charge_time_h: string;
  top_speed_kmh: string;
  acceleration_0_100: string;
  description: string;
  features: string;
  images: string;
  is_featured: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

function generateSlug(brand: string, model: string, year: string): string {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseList(raw: string): string[] {
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function createCar(data: CarFormData): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "No autorizado." };

  const brand = data.brand.trim();
  const model = data.model.trim();
  const year = data.year.trim();
  const name = data.name.trim();

  if (!name || !brand || !model || !year) {
    return { success: false, error: "Nombre, marca, modelo y año son requeridos." };
  }

  const yearNum = parseInt(year);
  if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2035) {
    return { success: false, error: "Año inválido (2000–2035)." };
  }

  const { error } = await supabase.from("cars").insert([{
    slug: generateSlug(brand, model, year),
    name,
    brand,
    model,
    year: yearNum,
    price: parseFloat(data.price) || 0,
    range_km: parseInt(data.range_km) || 0,
    battery_kwh: parseFloat(data.battery_kwh) || 0,
    power_hp: parseInt(data.power_hp) || 0,
    charge_time_h: parseFloat(data.charge_time_h) || 0,
    top_speed_kmh: parseInt(data.top_speed_kmh) || 0,
    acceleration_0_100: parseFloat(data.acceleration_0_100) || 0,
    description: data.description.trim(),
    features: parseList(data.features),
    images: parseList(data.images),
    is_featured: data.is_featured === "true",
  }]);

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Ya existe un vehículo con ese slug. Cambia la marca, modelo o año." };
    }
    return { success: false, error: "Error al guardar el vehículo. Intenta de nuevo." };
  }

  revalidatePath("/carros");
  revalidatePath("/admin/carros");
  redirect("/admin/carros");
}

export async function updateCar(id: string, data: CarFormData): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "No autorizado." };

  if (!id) return { success: false, error: "ID de vehículo inválido." };

  const { error } = await supabase.from("cars").update({
    name: data.name.trim(),
    brand: data.brand.trim(),
    model: data.model.trim(),
    year: parseInt(data.year) || 0,
    price: parseFloat(data.price) || 0,
    range_km: parseInt(data.range_km) || 0,
    battery_kwh: parseFloat(data.battery_kwh) || 0,
    power_hp: parseInt(data.power_hp) || 0,
    charge_time_h: parseFloat(data.charge_time_h) || 0,
    top_speed_kmh: parseInt(data.top_speed_kmh) || 0,
    acceleration_0_100: parseFloat(data.acceleration_0_100) || 0,
    description: data.description.trim(),
    features: parseList(data.features),
    images: parseList(data.images),
    is_featured: data.is_featured === "true",
  }).eq("id", id);

  if (error) return { success: false, error: "Error al actualizar el vehículo." };

  revalidatePath("/carros");
  revalidatePath("/admin/carros");
  redirect("/admin/carros");
}

export async function deleteCar(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "No autorizado." };

  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) return { success: false, error: "Error al eliminar el vehículo." };

  revalidatePath("/carros");
  revalidatePath("/admin/carros");
  redirect("/admin/carros");
}
