import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toJakartaTime(utcDate: Date | string) {
  const date = new Date(utcDate);
  // Add 7 hours to convert UTC to Jakarta time (UTC+7)
  return new Date(date.getTime() + (7 * 60 * 60 * 1000));
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
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
