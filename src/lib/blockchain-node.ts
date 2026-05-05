import { Block } from './neural-core';

class BlockchainNode {
  public blockchain: Block[] = [];
  private static instance: BlockchainNode;

  private constructor() {
    this.createGenesisBlock();
  }

  public static getInstance(): BlockchainNode {
    if (!BlockchainNode.instance) {
      BlockchainNode.instance = new BlockchainNode();
    }
    return BlockchainNode.instance;
  }

  private createGenesisBlock() {
    const genesis = new Block(0, [], '0');
    this.blockchain.push(genesis);
  }

  public getBlocks() {
    return this.blockchain;
  }

  public addBlock(synapses: any[]) {
    const lastBlock = this.blockchain[this.blockchain.length - 1];
    const newBlock = new Block(
      this.blockchain.length,
      synapses,
      lastBlock.hash
    );
    // En un entorno real aquí iría el mineBlock
    this.blockchain.push(newBlock);
    return newBlock;
  }
}

export const blockchainNode = BlockchainNode.getInstance();
