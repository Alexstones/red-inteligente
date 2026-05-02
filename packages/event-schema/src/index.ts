import type { TransactionStatus, UserRole } from "@red-inteligente/shared-types";

// ─── Base Event ─────────────────────────────────────
export interface BaseEvent {
    id: string;
    type: string;
    tenantId: string;
    userId: string;
    timestamp: string;
    payload: Record<string, unknown>;
    hash?: string; // for blockchain anchoring
}

// ─── User Events ────────────────────────────────────
export type UserEventType =
    | "user.created"
    | "user.updated"
    | "user.deleted"
    | "user.login"
    | "user.logout"
    | "user.role_changed";

export interface UserEvent extends BaseEvent {
    type: UserEventType;
    payload: {
        email: string;
        role?: UserRole;
        previousRole?: UserRole;
        [key: string]: unknown;
    };
}

// ─── Transaction Events ─────────────────────────────
export type TransactionEventType =
    | "transaction.created"
    | "transaction.updated"
    | "transaction.status_changed"
    | "transaction.deleted";

export interface TransactionEvent extends BaseEvent {
    type: TransactionEventType;
    payload: {
        transactionId: string;
        amount?: number;
        status?: TransactionStatus;
        previousStatus?: TransactionStatus;
        [key: string]: unknown;
    };
}

// ─── Module Events ──────────────────────────────────
export type ModuleEventType =
    | "module.activated"
    | "module.deactivated"
    | "module.configured";

export interface ModuleEvent extends BaseEvent {
    type: ModuleEventType;
    payload: {
        moduleId: string;
        moduleName: string;
        [key: string]: unknown;
    };
}

// ─── Audit Events ───────────────────────────────────
export type AuditEventType =
    | "audit.record_created"
    | "audit.hash_anchored";

export interface AuditEvent extends BaseEvent {
    type: AuditEventType;
    payload: {
        resource: string;
        resourceId: string;
        action: string;
        blockchainTxHash?: string;
        [key: string]: unknown;
    };
}

// ─── Decision Events (for Albedrío) ─────────────────
export type DecisionEventType =
    | "decision.rule_evaluated"
    | "decision.approved"
    | "decision.rejected";

export interface DecisionEvent extends BaseEvent {
    type: DecisionEventType;
    payload: {
        ruleId: string;
        ruleName: string;
        result: "approved" | "rejected" | "pending";
        confidence?: number;
        reasons?: string[];
        [key: string]: unknown;
    };
}

// ─── All Events Union ───────────────────────────────
export type AppEvent =
    | UserEvent
    | TransactionEvent
    | ModuleEvent
    | AuditEvent
    | DecisionEvent;

export type AppEventType =
    | UserEventType
    | TransactionEventType
    | ModuleEventType
    | AuditEventType
    | DecisionEventType;
