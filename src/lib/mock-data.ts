export interface MockUser {
    id: string;
    email: string;
    name: string;
    role: "admin" | "operador" | "viewer";
    tenantId: string;
    tenantName: string;
    tenantType: "empresa" | "sociedad" | "publico";
    avatarUrl?: string;
}

export interface MockTransaction {
    id: string;
    type: "ingreso" | "egreso" | "transferencia";
    amount: number;
    currency: string;
    status: "pendiente" | "confirmado" | "validado" | "rechazado";
    description: string;
    createdAt: string;
    hash?: string;
}

export interface MockModule {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    status: "activo" | "proximo" | "deshabilitado";
    version?: string;
    color: string;
}

export interface MockDashboardStats {
    balance: number;
    totalIngresos: number;
    totalEgresos: number;
    transaccionesPendientes: number;
    transaccionesConfirmadas: number;
    transaccionesValidadas: number;
}

// ─── Mock User ──────────────────────────────────────
export const mockUser: MockUser = {
    id: "usr_001",
    email: "admin@redinteligente.io",
    name: "Alejandro Stones",
    role: "admin",
    tenantId: "tnt_001",
    tenantName: "Red Inteligente Corp",
    tenantType: "empresa",
};

// ─── Mock Dashboard Stats ───────────────────────────
export const mockDashboardStats: MockDashboardStats = {
    balance: 1_284_750.42,
    totalIngresos: 2_450_320.0,
    totalEgresos: 1_165_569.58,
    transaccionesPendientes: 12,
    transaccionesConfirmadas: 85,
    transaccionesValidadas: 347,
};

// ─── Mock Transactions ──────────────────────────────
export const mockTransactions: MockTransaction[] = [
    {
        id: "txn_001",
        type: "ingreso",
        amount: 45_000.0,
        currency: "USD",
        status: "validado",
        description: "Pago de servicios — Cliente Alpha",
        createdAt: "2026-02-19T10:30:00Z",
        hash: "0x8f2e4a6b...",
    },
    {
        id: "txn_002",
        type: "egreso",
        amount: 12_350.0,
        currency: "USD",
        status: "confirmado",
        description: "Nómina — Departamento Ingeniería",
        createdAt: "2026-02-18T15:45:00Z",
    },
    {
        id: "txn_003",
        type: "transferencia",
        amount: 78_500.0,
        currency: "USD",
        status: "pendiente",
        description: "Transferencia interdivisional — Sede Norte",
        createdAt: "2026-02-18T09:12:00Z",
    },
    {
        id: "txn_004",
        type: "ingreso",
        amount: 125_000.0,
        currency: "USD",
        status: "validado",
        description: "Contrato anual — Gobierno Municipal",
        createdAt: "2026-02-17T14:20:00Z",
        hash: "0x3c7d9e1f...",
    },
    {
        id: "txn_005",
        type: "egreso",
        amount: 8_900.0,
        currency: "USD",
        status: "rechazado",
        description: "Compra de equipo — Sin aprobación",
        createdAt: "2026-02-17T11:05:00Z",
    },
    {
        id: "txn_006",
        type: "ingreso",
        amount: 33_200.0,
        currency: "USD",
        status: "confirmado",
        description: "Liquidación parcial — Proyecto Beta",
        createdAt: "2026-02-16T16:30:00Z",
    },
    {
        id: "txn_007",
        type: "transferencia",
        amount: 15_750.0,
        currency: "USD",
        status: "pendiente",
        description: "Reasignación presupuestal — Q1 2026",
        createdAt: "2026-02-16T08:45:00Z",
    },
    {
        id: "txn_008",
        type: "egreso",
        amount: 42_100.0,
        currency: "USD",
        status: "validado",
        description: "Pago a proveedor — Infraestructura Cloud",
        createdAt: "2026-02-15T13:15:00Z",
        hash: "0xa1b2c3d4...",
    },
];

// ─── Mock Modules ───────────────────────────────────
export const mockModules: MockModule[] = [
    {
        id: "mod_001",
        name: "Arquetipo",
        slug: "arquetipo",
        description: "Núcleo ERP — Gestión de entidades, permisos, ledger interno y auditoría.",
        icon: "Database",
        status: "proximo",
        version: "0.1.0",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "mod_002",
        name: "Albedrío",
        slug: "albedrio",
        description: "Motor de decisión — Reglas automáticas, evaluación de riesgo y validación.",
        icon: "BrainCircuit",
        status: "proximo",
        color: "from-violet-500 to-purple-500",
    },
    {
        id: "mod_003",
        name: "Oráculo",
        slug: "oraculo",
        description: "IA de consulta — Chat inteligente con RAG sobre el estado del sistema.",
        icon: "Sparkles",
        status: "proximo",
        color: "from-amber-500 to-orange-500",
    },
    {
        id: "mod_004",
        name: "Módulo IA",
        slug: "modulo-ia",
        description: "Predicción y análisis — Detección de fraude, patrones y optimización.",
        icon: "Cpu",
        status: "deshabilitado",
        color: "from-emerald-500 to-teal-500",
    },
    {
        id: "mod_005",
        name: "Blockchain",
        slug: "blockchain",
        description: "Red propia — Consenso, token nativo, gobernanza y anclaje de auditoría.",
        icon: "Link",
        status: "deshabilitado",
        color: "from-rose-500 to-pink-500",
    },
    {
        id: "mod_006",
        name: "Ominus",
        slug: "ominus",
        description: "Módulo ERP extendido — Funcionalidades empresariales avanzadas.",
        icon: "Layers",
        status: "deshabilitado",
        color: "from-indigo-500 to-blue-500",
    },
];
