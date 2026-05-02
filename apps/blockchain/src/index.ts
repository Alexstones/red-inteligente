import { WebSocket, WebSocketServer } from 'ws';
import { Synapse, Block } from '@red-inteligente/neural-core';
import express from 'express';
import cors from 'cors';

const P2P_PORT = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 6001;
const HTTP_PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3002;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];
const DIFFICULTY = 2;

class P2PNode {
  public blockchain: Block[] = [];
  private sockets: WebSocket[] = [];
  private synapsePool: Synapse[] = [];

  constructor(private port: number) {
    // 1. Bloque Génesis
    this.createGenesisBlock();

    // 2. Servidor P2P
    const server = new WebSocketServer({ port });
    server.on('connection', (socket) => this.initConnection(socket));
    console.log(`[P2P] Nodo Neural escuchando en puerto: ${port}`);

    // 3. Intervalo de Minado (Creación de bloques)
    setInterval(() => this.minePendingSynapses(), 10000); // Intenta minar cada 10s
  }

  private createGenesisBlock() {
    const genesis = new Block(0, [], '0');
    this.blockchain.push(genesis);
    console.log('[BLOCKCHAIN] Bloque Génesis generado.');
  }

  private initConnection(socket: WebSocket) {
    this.sockets.push(socket);
    
    socket.on('message', (data: string) => {
      const message = JSON.parse(data);
      this.handleMessage(socket, message);
    });

    socket.on('close', () => {
      this.sockets = this.sockets.filter((s) => s !== socket);
    });

    // Sincronizar cadena al conectar
    socket.send(JSON.stringify({ type: 'CHAIN', data: this.blockchain }));
  }

  public connectToPeers(newPeers: string[]) {
    newPeers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.initConnection(socket));
    });
  }

  private handleMessage(socket: WebSocket, message: any) {
    switch (message.type) {
      case 'SYNAPSE':
        console.log(`[POOL] Nueva sinapsis para procesar: ${message.data.hash.substring(0, 8)}`);
        this.synapsePool.push(message.data);
        this.broadcast(message);
        break;
      case 'CHAIN':
        this.handleChainSync(message.data);
        break;
    }
  }

  private handleChainSync(newChain: Block[]) {
    if (newChain.length > this.blockchain.length) {
      this.blockchain = newChain;
      console.log('[BLOCKCHAIN] Cadena sincronizada con éxito.');
    }
  }

  private minePendingSynapses() {
    if (this.synapsePool.length === 0) return;

    console.log(`[MINERÍA] Iniciando minado de ${this.synapsePool.length} sinapsis...`);
    
    const lastBlock = this.blockchain[this.blockchain.length - 1];
    const newBlock = new Block(
      this.blockchain.length,
      this.synapsePool,
      lastBlock.hash
    );

    newBlock.mineBlock(DIFFICULTY);
    this.blockchain.push(newBlock);
    this.synapsePool = [];

    this.broadcast({ type: 'CHAIN', data: this.blockchain });
  }

  public broadcast(message: any) {
    this.sockets.forEach((socket) => socket.send(JSON.stringify(message)));
  }
}

const node = new P2PNode(P2P_PORT);
node.connectToPeers(PEERS);

// Explorer API
const app = express();
app.use(cors());
app.get('/blocks', (req, res) => res.json(node.blockchain));
app.listen(HTTP_PORT, () => {
  console.log(`[EXPLORER] Servidor HTTP escuchando en puerto: ${HTTP_PORT}`);
});
