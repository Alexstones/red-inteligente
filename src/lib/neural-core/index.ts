import CryptoJS from 'crypto-js';

/**
 * Representa una unidad de datos en el sistema (Neurona).
 * Se define por su posición en un espacio vectorial ("sentido espacial").
 */
export interface Neuron {
  id: string;
  type: string;
  data: any;
  vector: number[]; // El "sentido" espacial (embeddings)
  timestamp: number;
}

/**
 * Representa la conexión entre dos eventos o datos (Sinapsis).
 * El hash de la sinapsis es lo que se ancla en la blockchain.
 */
export class Synapse {
  public hash: string;

  constructor(
    public sourceId: string,
    public targetId: string,
    public weight: number, // Importancia o correlación
    public payload: any,
    public prevHash: string = ''
  ) {
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return CryptoJS.SHA256(
      this.sourceId +
      this.targetId +
      this.weight.toString() +
      JSON.stringify(this.payload) +
      this.prevHash
    ).toString();
  }

  /**
   * Genera un Hash Proteico: Una firma multidimensional que actúa como el ADN del evento.
   */
  generateProteicDNA(vector: number[]): string {
    const vectorStr = vector.join('|');
    return CryptoJS.SHA512(
      this.hash + 
      vectorStr + 
      Math.random().toString() // Simulación de entropía cuántica
    ).toString();
  }
}

/**
 * Representa un Bloque en la Red Inteligente
 */
export class Block {
  public hash: string;
  public timestamp: number;
  public nonce: number = 0;

  constructor(
    public index: number,
    public synapses: Synapse[],
    public prevHash: string = ''
  ) {
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return CryptoJS.SHA256(
      this.index +
      this.prevHash +
      this.timestamp +
      JSON.stringify(this.synapses) +
      this.nonce
    ).toString();
  }

  /**
   * Simulación de Minería Neural (Prueba de Trabajo Simplificada)
   */
  mineBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

/**
 * Simulación de Criptografía Cuántica (QKD - Distribución de Claves Cuánticas)
 */
export class QuantumService {
  /**
   * Simula el protocolo BB84 para generar una clave compartida segura.
   * En un sistema real, esto usaría estados de polarización de fotones.
   */
  static generateSharedKey(length: number = 256): string {
    const aliceBases = Array.from({ length }, () => Math.round(Math.random()));
    const bobBases = Array.from({ length }, () => Math.round(Math.random()));
    const aliceBits = Array.from({ length }, () => Math.round(Math.random()));

    // Solo los bits donde las bases coinciden forman la clave (Sifting)
    const sharedBits = aliceBits.filter((bit, i) => aliceBases[i] === bobBases[i]);
    
    const sharedKey = CryptoJS.SHA256(sharedBits.join('')).toString();
    console.log(`[CUÁNTICA] Nueva clave QKD generada: ${sharedKey.substring(0, 16)}...`);
    return sharedKey;
  }
}

/**
 * El "Obelisco": Gestor de almacenamiento inteligente.
 */
export class Obelisk {
  private nodes: Map<string, Neuron> = new Map();

  addNeuron(neuron: Neuron) {
    this.nodes.set(neuron.id, neuron);
    console.log(`[Obelisco] Neurona integrada: ${neuron.id}`);
  }

  getNeuron(id: string): Neuron | undefined {
    return this.nodes.get(id);
  }
}
