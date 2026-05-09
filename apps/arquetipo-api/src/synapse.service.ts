import { Injectable, OnModuleInit } from '@nestjs/common';
import { Synapse, Obelisk } from '@red-inteligente/neural-core';
import { WalletService } from './wallet.service';
import { P2PClientService } from './p2p-client.service';
import { AlbedrioService } from './albedrio/albedrio.service';

@Injectable()
export class SynapseService implements OnModuleInit {
  private obelisk: Obelisk;
  private lastSynapseHash: string = '0';

  constructor(
    private walletService: WalletService,
    private p2pClient: P2PClientService,
    private albedrio: AlbedrioService
  ) {}

  onModuleInit() {
    this.obelisk = new Obelisk();
    console.log('[Arquetipo] Obelisco inicializado. Sistema listo para procesar sinapsis.');
  }

  /**
   * Registra una acción como una sinapsis en la red.
   */
  async fireSynapse(tenantId: string, source: string, target: string, payload: any, weight: number = 1.0) {
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

    return synapse;
  }

  getObelisk() {
    return this.obelisk;
  }
}
