import { Block, Synapse } from './index';

describe('Neural Core - Block & Synapse', () => {
  it('should create a valid synapse hash', () => {
    const synapse = new Synapse('A', 'B', 1.0, { test: true }, '0');
    expect(synapse.hash).toBeDefined();
    expect(synapse.hash.length).toBe(64);
  });

  it('should mine a block with given difficulty', () => {
    const synapses = [new Synapse('A', 'B', 1.0, {}, '0')];
    const block = new Block(1, synapses, '0000');
    const difficulty = 1;
    
    block.mineBlock(difficulty);
    
    expect(block.hash.substring(0, difficulty)).toBe('0'.repeat(difficulty));
  });

  it('should maintain hash chain integrity', () => {
    const s1 = new Synapse('A', 'B', 1.0, {}, '0');
    const s2 = new Synapse('B', 'C', 1.0, {}, s1.hash);
    
    expect(s2.prevHash).toBe(s1.hash);
  });
});
