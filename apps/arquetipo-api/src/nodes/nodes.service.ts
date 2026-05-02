import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SynapseService } from '../synapse.service';

@Injectable()
export class NodesService {
  constructor(
    private prisma: PrismaService,
    private synapseService: SynapseService,
  ) {}

  /**
   * Crea una nueva Neurona (Dato) y dispara la Sinapsis correspondiente
   */
  async createNode(tenantId: string, type: string, data: any, vector: number[] = []) {
    // 1. Crear el Nodo en la DB
    const node = await this.prisma.neuralNode.create({
      data: {
        type,
        data,
        vector,
        tenantId,
      },
    });

    // 2. Disparar Sinapsis de Creación (Anclaje)
    await this.synapseService.fireSynapse(
      tenantId,      // Nodo dueño
      'SYSTEM_INIT', // Origen: El sistema
      node.id,       // Destino: El nuevo nodo
      { action: 'CREATE', type },
      1.0
    );

    return node;
  }

  async getNodes(tenantId: string) {
    return this.prisma.neuralNode.findMany({
      where: { tenantId },
      include: {
        synapsesTarget: true,
      }
    });
  }
}
