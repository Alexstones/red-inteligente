import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SentinelService {
  private readonly logger = new Logger('SentinelDefense');
  private synapseCounter: Map<string, number> = new Map();
  private readonly THRESHOLD = 50; // Max synapses per 10s per node
  private quarantinedNodes: Set<string> = new Set();

  constructor(private prisma: PrismaService) {
    // Reset counter every 10 seconds
    setInterval(() => this.synapseCounter.clear(), 10000);
  }

  /**
   * Monitoriza cada sinapsis entrante para detectar anomalías de tráfico
   */
  async monitor(tenantId: string, nodeId: string) {
    if (this.quarantinedNodes.has(nodeId)) {
      throw new Error('NODE_QUARANTINED: Sentinel has locked this node due to abnormal activity.');
    }

    const currentCount = (this.synapseCounter.get(nodeId) || 0) + 1;
    this.synapseCounter.set(nodeId, currentCount);

    if (currentCount > this.THRESHOLD) {
      await this.quarantine(tenantId, nodeId, 'DDoS / Synapse Flood detected');
    }
  }

  private async quarantine(tenantId: string, nodeId: string, reason: string) {
    this.quarantinedNodes.add(nodeId);
    this.logger.warn(`[SENTINEL] Quarantining node ${nodeId} for tenant ${tenantId}. Reason: ${reason}`);

    // En un sistema real, marcaríamos el nodo en la DB o deshabilitaríamos el API key
    // Por ahora, simulamos el log de seguridad para el dashboard
    await this.prisma.systemLog.create({
      data: {
        type: 'SECURITY_ALERT',
        level: 'CRITICAL',
        message: `Node ${nodeId.substring(0, 8)} quarantined. Reason: ${reason}`,
        metadata: { tenantId, nodeId, reason }
      }
    }).catch((err) => {
      this.logger.error('Failed to log security alert to DB', err);
    });
  }

  isQuarantined(nodeId: string): boolean {
    return this.quarantinedNodes.has(nodeId);
  }
}
