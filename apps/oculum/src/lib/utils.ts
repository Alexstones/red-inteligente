import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency,
    }).format(amount);
}

export function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat("es-MX", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateStr));
}

export function getStatusColor(status: string): string {
    switch (status) {
        case "pendiente":
            return "text-amber-400 bg-amber-400/10 border-amber-400/20";
        case "confirmado":
            return "text-blue-400 bg-blue-400/10 border-blue-400/20";
        case "validado":
            return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        case "rechazado":
            return "text-red-400 bg-red-400/10 border-red-400/20";
        default:
            return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
}
