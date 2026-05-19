import { Injectable, Logger } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Injectable()
export class StakingService {
  private readonly logger = new Logger('NexusStaking');
  private stakes: Map<string, { amount: number, timestamp: number }> = new Map();
  private readonly APY = 0.12; // 12% Annual Yield

  constructor(private walletService: WalletService) {}

  async stake(tenantId: string, amount: number) {
    const wallet = await this.walletService.getWallet(tenantId);
    if (wallet.balance < amount) throw new Error('INSUFFICIENT_FUNDS');

    await this.walletService.transfer(tenantId, '0xSTAKING_POOL', amount);
    this.stakes.set(tenantId, { amount, timestamp: Date.now() });
    
    this.logger.log(`[STAKING] Tenant ${tenantId} staked ${amount} NEX.`);
    return { status: 'success', msg: 'Tokens staked successfully.' };
  }

  async calculateRewards(tenantId: string) {
    const stake = this.stakes.get(tenantId);
    if (!stake) return 0;

    const days = (Date.now() - stake.timestamp) / (1000 * 60 * 60 * 24);
    const reward = stake.amount * (this.APY / 365) * days;
    return reward;
  }
}
