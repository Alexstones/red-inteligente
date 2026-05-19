import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MarketOracleService } from './market-oracle.service';
import { SynapseService } from './synapse.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly marketOracle: MarketOracleService,
    private readonly synapseService: SynapseService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('economy')
  getEconomy() {
    return {
      nexPrice: this.marketOracle.getCurrentPrice(),
      neuralInputs: this.marketOracle.getNeuralInputs(),
      timestamp: new Date().toISOString()
    };
  }

  @Get('cortex/topology')
  getTopology() {
    return this.synapseService.getTopology();
  }

  @Post('synapse/fire')
  async fireSynapse(@Body() body: { tenantId: string, source: string, target: string, payload: any, weight: number }) {
    const { tenantId, source, target, payload, weight } = body;
    return this.synapseService.fireSynapse(tenantId, source, target, payload, weight);
  }
}
