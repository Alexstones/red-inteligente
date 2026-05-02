import { Injectable, NotFoundException } from '@nestjs/common';
import { NodesService } from '../nodes/nodes.service';
import { PrismaService } from '../prisma.service';
import { SynapseService } from '../synapse.service';

@Injectable()
export class BusinessService {
  constructor(
    private nodesService: NodesService,
    private prisma: PrismaService,
    private synapseService: SynapseService,
  ) {}

  /**
   * Crea un producto (Neurona de Inventario)
   */
  async addProduct(tenantId: string, productData: { name: string; price: number; stock: number }) {
    return this.nodesService.createNode(
      tenantId,
      'INVENTORY',
      productData,
      [0.1, 0.5, 0.9] // Vector simulado (Categoría, Precio, Stock)
    );
  }

  /**
   * Registra una venta (Neurona de Venta) y crea la sinapsis con el producto
   */
  async recordSale(tenantId: string, saleData: { productId: string; quantity: number; total: number }) {
    // 1. Verificar que el producto existe
    const productNode = await this.prisma.neuralNode.findUnique({
      where: { id: saleData.productId }
    });

    if (!productNode || productNode.tenantId !== tenantId) {
      throw new NotFoundException('Producto no encontrado en este nodo');
    }

    // 2. Crear el Nodo de Venta
    const saleNode = await this.nodesService.createNode(
      tenantId,
      'SALE',
      saleData,
      [0.9, 0.2, 0.1] // Vector simulado (Venta, Volumen, Prioridad)
    );

    // 3. ENTLAZAMIENTO: Crear Sinapsis entre Venta e Inventario
    await this.synapseService.fireSynapse(
      tenantId,
      saleNode.id,      // Origen: La Venta
      productNode.id,   // Destino: El Producto
      { action: 'SALE_REDUCE_STOCK', quantity: saleData.quantity },
      0.8 // Peso de la relación
    );

    // 4. AUTOMATIZACIÓN FINANCIERA: Crear Registro de Ingreso
    await this.recordFinancialEntry(tenantId, {
      type: 'REVENUE',
      amount: saleData.total,
      description: `Ingreso por venta de ${productNode.data.name}`,
      referenceId: saleNode.id
    });

    return { saleNode, productNode };
  }

  /**
   * Registra un movimiento financiero (Neurona Contable)
   */
  async recordFinancialEntry(tenantId: string, entryData: { type: string; amount: number; description: string; referenceId: string }) {
    const financeNode = await this.nodesService.createNode(
      tenantId,
      'FINANCE',
      entryData,
      [0.2, 0.9, 0.5] // Vector simulado (Finanzas, Monto, Liquidez)
    );

    // Sinapsis con la referencia (Venta o Gasto)
    await this.synapseService.fireSynapse(
      tenantId,
      financeNode.id,
      entryData.referenceId,
      { action: 'FINANCIAL_RECONCILIATION' },
      1.0
    );

    return financeNode;
  }
}
