// ─── Tenant Types ───────────────────────────────────
export type TenantType = "empresa" | "sociedad" | "publico";

export interface Tenant {
    id: string;
    name: string;
    type: TenantType;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ─── User & Auth ────────────────────────────────────
export type UserRole = "admin" | "operador" | "viewer";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    tenantId: string;
    avatarUrl?: string;
    isActive: boolean;
    createdAt: string;
}

export interface Permission {
    id: string;
    resource: string;
    action: "create" | "read" | "update" | "delete";
    roleId: UserRole;
}

// ─── Transactions ───────────────────────────────────
export type TransactionStatus = "pendiente" | "confirmado" | "validado" | "rechazado";
export type TransactionType = "ingreso" | "egreso" | "transferencia";

export interface Transaction {
    id: string;
    tenantId: string;
    userId: string;
    type: TransactionType;
    amount: number;
    currency: string;
    status: TransactionStatus;
    description: string;
    hash?: string; // prepared for blockchain anchoring
    createdAt: string;
    updatedAt: string;
}

// ─── Modules ────────────────────────────────────────
export type ModuleStatus = "activo" | "proximo" | "deshabilitado";

export interface Module {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    status: ModuleStatus;
    version?: string;
}

// ─── Dashboard ──────────────────────────────────────
export interface DashboardStats {
    balance: number;
    totalIngresos: number;
    totalEgresos: number;
    transaccionesPendientes: number;
    transaccionesConfirmadas: number;
    transaccionesValidadas: number;
}

// ─── Ledger ─────────────────────────────────────────
export interface LedgerEntry {
    id: string;
    tenantId: string;
    transactionId: string;
    debit: number;
    credit: number;
    balance: number;
    description: string;
    hash?: string;
    createdAt: string;
}

// ─── Audit ──────────────────────────────────────────
export interface AuditRecord {
    id: string;
    tenantId: string;
    userId: string;
    action: string;
    resource: string;
    resourceId: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    timestamp: string;
    hash?: string;
}
