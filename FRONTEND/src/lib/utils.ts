import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const USD_RATE = 520; // colones por dólar (actualizar según tipo de cambio)

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceUSD(priceInCRC: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(priceInCRC / USD_RATE));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-CR").format(n);
}
