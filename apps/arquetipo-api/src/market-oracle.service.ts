import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MarketOracleService implements OnModuleInit {
  private readonly logger = new Logger('MarketOracle');
  private nexPrice: number = 0.85; // Initial price in USD

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    // Update price every minute based on network activity
    setInterval(() => this.updatePrice(), 60000);
  }

  private async updatePrice() {
    try {
      // Logic: Price increases with more nodes and synapses, and decreases with supply
      const nodesCount = await this.prisma.neuralNode.count();
      const synapsesCount = await this.prisma.synapse.count(); // Actually using synapses now
      
      const utilityFactor = (nodesCount * 0.1) + (synapsesCount * 0.01);
      const volatility = (Math.random() - 0.5) * 0.05; // 5% random volatility
      
      this.nexPrice = Math.max(0.01, 0.85 + utilityFactor + volatility);
      
      this.logger.log(`[ECONOMY] Current NEX Price updated: $${this.nexPrice.toFixed(4)} USD`);
    } catch (error) {
      this.logger.error('Error updating NEX price', error);
    }
  }

  getCurrentPrice() {
    return this.nexPrice;
  }

  /**
   * Simulates external "Neural Inputs" (Market trends, Weather, etc.)
   */
  getNeuralInputs() {
    return [
      { source: 'NASDAQ_SIM', value: 14500 + Math.random() * 100, trend: 'UP' },
      { source: 'GLOBAL_ADOPTION', value: 0.65, trend: 'STABLE' },
      { source: 'ENERGY_EFFICIENCY', value: 0.98, trend: 'UP' }
    ];
  }
}
