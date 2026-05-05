import { NextResponse } from 'next/server';
import { blockchainNode } from '@/lib/blockchain-node';

export async function GET() {
  try {
    const blocks = blockchainNode.getBlocks();
    return NextResponse.json(blocks);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { synapses } = body;
    
    if (!synapses || !Array.isArray(synapses)) {
      return NextResponse.json({ error: 'Invalid synapses' }, { status: 400 });
    }

    const newBlock = blockchainNode.addBlock(synapses);
    return NextResponse.json(newBlock);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
