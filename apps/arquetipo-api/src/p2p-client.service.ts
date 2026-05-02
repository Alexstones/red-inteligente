import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebSocket } from 'ws';

@Injectable()
export class P2PClientService implements OnModuleInit {
  private socket: WebSocket;
  private blockchainUrl = process.env.BLOCKCHAIN_URL || 'ws://localhost:6001';

  onModuleInit() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.blockchainUrl);
    
    this.socket.on('open', () => {
      console.log('[Arquetipo] Conectado a la Red P2P (Nodo Blockchain)');
    });

    this.socket.on('error', () => {
      console.log('[Arquetipo] Error de conexión P2P. Reintentando en 5s...');
      setTimeout(() => this.connect(), 5000);
    });
  }

  /**
   * Envía una sinapsis a la red P2P para su anclaje y propagación
   */
  broadcastSynapse(synapse: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'SYNAPSE',
        data: synapse
      }));
    }
  }
}
