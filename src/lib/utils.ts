import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toJakartaTime(utcDate: Date | string) {
  const date = new Date(utcDate);
  // Add 7 hours to convert UTC to Jakarta time (UTC+7)
  return new Date(date.getTime() + 7 * 60 * 60 * 1000);
}

export function formatJakartaTime(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
) {
  const dateObj = toJakartaTime(date);
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  }).format(dateObj);
}

export function formatPrice(price: number) {
  const absPrice = Math.abs(price);
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: absPrice < 1 ? 4 : 0,
    maximumFractionDigits: absPrice < 1 ? 4 : 0,
  }).format(absPrice);

  return price < 0 ? `-${formatted}` : formatted;
}

export function formatCompactPrice(price: number | null) {
  if (!price) return "0";
  const absPrice = Math.abs(price);
  const formatted = new Intl.NumberFormat("id-ID", {
    notation: "compact",
    minimumFractionDigits: absPrice < 1 ? 4 : 1,
    maximumFractionDigits: absPrice < 1 ? 4 : 1,
    compactDisplay: "short",
  }).format(absPrice);

  return price < 0 ? `-${formatted}` : formatted;
}

export function formatNonCompactPrice(price: number | null) {
  if (!price) return "0.0000";
  const absPrice = Math.abs(price);
  const formatted = absPrice.toLocaleString("id-ID", {
    minimumFractionDigits: absPrice < 1 ? 4 : 2,
    maximumFractionDigits: absPrice < 1 ? 4 : 2,
  });

  return price < 0 ? `-${formatted}` : formatted;
}
