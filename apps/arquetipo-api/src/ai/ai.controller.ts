import { Controller, Post, Body, Get, Query, Inject, forwardRef } from '@nestjs/common';
import { AIOracleService } from '../ai-oracle.service';
import { NodesService } from '../nodes/nodes.service';

@Controller('ai')
export class AIController {
  constructor(
    private aiService: AIOracleService,
    @Inject(forwardRef(() => NodesService))
    private nodesService: NodesService,
  ) {}

  @Get('analyze')
  async analyzeTenant(@Query('tenantId') tenantId: string) {
    const nodes = await this.nodesService.getNodes(tenantId);
    return this.aiService.categorizeBehavior(tenantId, nodes);
  }

  @Post('ask')
  async askOracle(@Body() body: { tenantId: string; prompt: string }) {
    return this.aiService.getReasoning(body.tenantId, body.prompt);
  }
}
