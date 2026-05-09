import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SynapseService } from '../synapse.service';
import { AIOracleService } from '../ai-oracle.service';

@Injectable()
export class NodesService {
  constructor(
    private prisma: PrismaService,
    private synapseService: SynapseService,
    @Inject(forwardRef(() => AIOracleService))
    private aiOracle: AIOracleService,
  ) {}

  /**
   * Crea una nueva Neurona (Dato) y dispara la Sinapsis correspondiente
   */
  async createNode(tenantId: string, type: string, data: any, vector: number[] = [], neuralIndex?: string) {
    // 1. Auto-clasificación Neural
    let finalIndex = neuralIndex;
    if (!finalIndex) {
      if (['SALE', 'INVENTORY', 'FINANCE'].includes(type)) {
        finalIndex = 'LIMB';
      } else if (['GOVERNANCE', 'IDENTITY'].includes(type)) {
        finalIndex = 'HEAD';
      } else {
        finalIndex = 'BACKBONE';
      }
    }

    // 2. Crear el Nodo en la DB
    const node = await this.prisma.neuralNode.create({
      data: {
        type,
        data,
        vector,
        tenantId,
        neuralIndex: finalIndex,
      },
    });

    // 3. Disparar Sinapsis de Creación (Anclaje)
    await this.synapseService.fireSynapse(
      tenantId,      // Nodo dueño
      'SYSTEM_INIT', // Origen: El sistema
      node.id,       // Destino: El nuevo nodo
      { action: 'CREATE', type, neuralIndex: finalIndex },
      1.0
    );

    // 4. Análisis Profundo del Oráculo (Async)
    this.aiOracle.categorizeBehavior(tenantId, [node]).catch(e => console.error("AI Oracle error:", e.message));

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
