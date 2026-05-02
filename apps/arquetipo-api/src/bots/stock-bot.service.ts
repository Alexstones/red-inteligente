import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SynapseService } from '../synapse.service';

@Injectable()
export class StockBot implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private synapseService: SynapseService
  ) {}

  onModuleInit() {
    console.log('[BOTS] StockBot activado. Monitoreando inventario cada 60s...');
    setInterval(() => this.checkStock(), 60000);
  }

  /**
   * Monitoriza el inventario y dispara sinapsis autónomas de reabastecimiento
   */
  async checkStock() {
    const lowStockNodes = await this.prisma.neuralNode.findMany({
      where: {
        type: 'INVENTORY',
        data: {
          path: ['stock'],
          lt: 5 // Menos de 5 unidades
        }
      }
    });

    for (const node of lowStockNodes) {
      console.log(`[BOTS] Alerta: Stock bajo en ${node.id}. Disparando sinapsis de reabastecimiento.`);
      
      await this.synapseService.fireSynapse(
        node.tenantId,
        'BOT_STOCK_MANAGER',
        node.id,
        { action: 'STOCK_REPLENISH_REQUEST', current_stock: (node.data as any).stock },
        0.5
      );
    }
  }
}
