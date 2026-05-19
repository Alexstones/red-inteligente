import { WebSocket, WebSocketServer } from 'ws';
import { Synapse, Block } from '@red-inteligente/neural-core';
import express from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';

const P2P_PORT = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 6001;
const HTTP_PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3002;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];
const DIFFICULTY = 2;
const DATA_PATH = path.join(__dirname, '../data/blockchain.json');

class P2PNode {
  public blockchain: Block[] = [];
  private sockets: WebSocket[] = [];
  private synapsePool: Synapse[] = [];

  constructor(private port: number) {
    // 1. Cargar o Inicializar Cadena
    this.initChain();

    // 2. Servidor P2P
    const server = new WebSocketServer({ port });
    server.on('connection', (socket) => this.initConnection(socket));
    console.log(`[P2P] Nodo Neural escuchando en puerto: ${port}`);

    // 3. Intervalo de Minado (Creación de bloques)
    setInterval(() => this.minePendingSynapses(), 10000); // Intenta minar cada 10s
  }

  private initChain() {
    if (fs.existsSync(DATA_PATH)) {
      try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        this.blockchain = JSON.parse(data);
        console.log(`[BLOCKCHAIN] Cadena cargada desde disco: ${this.blockchain.length} bloques.`);
      } catch (error) {
        console.error('[BLOCKCHAIN] Error al cargar cadena, generando nueva...', error);
        this.createGenesisBlock();
      }
    } else {
      this.createGenesisBlock();
    }
  }

  private saveChain() {
    try {
      const dir = path.dirname(DATA_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_PATH, JSON.stringify(this.blockchain, null, 2));
      console.log('[BLOCKCHAIN] Cadena persistida en disco.');
    } catch (error) {
      console.error('[BLOCKCHAIN] Error al persistir cadena:', error);
    }
  }

  private createGenesisBlock() {
    const genesis = new Block(0, [], '0');
    this.blockchain = [genesis];
    this.saveChain();
    console.log('[BLOCKCHAIN] Bloque Génesis generado y persistido.');
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
      this.saveChain();
      console.log('[BLOCKCHAIN] Cadena sincronizada y persistida con éxito.');
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

    this.saveChain();
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
