import { Injectable, OnModuleInit } from '@nestjs/common';
import { Synapse, Obelisk } from '@red-inteligente/neural-core';
import { WalletService } from './wallet.service';
import { P2PClientService } from './p2p-client.service';
import { AlbedrioService } from './albedrio/albedrio.service';

import { SentinelService } from './sentinel.service';

@Injectable()
export class SynapseService implements OnModuleInit {
  private obelisk: Obelisk;
  private lastSynapseHash: string = '0';
  private cluster: any[] = []; // Almacena las coordenadas 3D de las unidades

  constructor(
    private walletService: WalletService,
    private p2pClient: P2PClientService,
    private albedrio: AlbedrioService,
    private sentinel: SentinelService
  ) {}

  onModuleInit() {
    this.obelisk = new Obelisk();
    console.log('[Arquetipo] Obelisco inicializado. Sistema listo para procesar sinapsis.');
  }

  /**
   * Registra una acción como una sinapsis en la red.
   */
  async fireSynapse(tenantId: string, source: string, target: string, payload: any, weight: number = 1.0) {
    // 0. Sentinel Defense
    await this.sentinel.monitor(tenantId, source);

    const synapse = new Synapse(
      source,
      target,
      weight,
      payload,
      this.lastSynapseHash
    );

    this.lastSynapseHash = synapse.hash;
    
    // Minería de datos: Recompensar al nodo/tenant
    await this.walletService.addReward(tenantId, weight, 'SYNAPSE_MINING');
    
    console.log(`[Sinapsis] Evento registrado: ${synapse.hash.substring(0, 8)}...`);
    
    // Difundir en la red P2P (Criptografía y Red)
    this.p2pClient.broadcastSynapse(synapse);

    // Albedrío: Evaluación de decisiones determinísticas
    const decisions = await this.albedrio.evaluate(payload);
    if (decisions.length > 0) {
      console.log(`[Albedrío] Decisiones tomadas: ${decisions.map(d => d.type).join(', ')}`);
      // Aquí se podrían disparar nuevas sinapsis automáticas
    }

    // Actualizar topología 3D para el Cortex
    this.updateTopology(synapse);

    return synapse;
  }

  private updateTopology(synapse: Synapse) {
    const node = {
      id: synapse.hash,
      type: synapse.payload.type || 'SYNAPSE',
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 400,
      weight: synapse.weight,
      timestamp: Date.now()
    };
    
    this.cluster.push(node);
    if (this.cluster.length > 100) this.cluster.shift(); // Mantener solo las últimas 100 unidades activas
  }

  getTopology() {
    return this.cluster;
  }

  getObelisk() {
    return this.obelisk;
  }
}
