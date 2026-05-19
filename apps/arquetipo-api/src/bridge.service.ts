import { Injectable, Logger } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Injectable()
export class BridgeService {
  private readonly logger = new Logger('NexusBridge');

  constructor(private walletService: WalletService) {}

  /**
   * Simula un swap de NEX a otra criptomoneda externa
   */
  async swapToExternal(tenantId: string, amount: number, targetChain: 'ETH' | 'SOL') {
    this.logger.log(`[BRIDGE] Requesting Swap: ${amount} NEX -> ${targetChain}`);
    
    const wallet = await this.walletService.getWallet(tenantId);
    if (wallet.balance < amount) throw new Error('INSUFFICIENT_FUNDS');

    // Descontar NEX del sistema local
    await this.walletService.transfer(tenantId, '0x0000_NEXUS_BURN_ADDRESS', amount);

    // Simular recepción en la otra cadena
    const externalTxHash = `0x${Math.random().toString(16).slice(2, 66)}`;
    const rate = targetChain === 'ETH' ? 0.0001 : 0.01;
    const receivedAmount = amount * rate;

    return {
      status: 'success',
      nexusBurnTx: '0xBURN_SUCCESS',
      externalChain: targetChain,
      externalTxHash,
      receivedAmount,
      msg: `Has recibido ${receivedAmount} ${targetChain} en tu billetera externa.`
    };
  }
}
