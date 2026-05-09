import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { GovernanceService } from './governance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('governance')
@UseGuards(JwtAuthGuard)
export class GovernanceController {
  constructor(private governanceService: GovernanceService) {}

  @Get('proposals')
  async getProposals() {
    return this.governanceService.getProposals();
  }

  @Post('proposals')
  async createProposal(@Request() req, @Body() data: { title: string; description: string }) {
    return this.governanceService.createProposal(req.user.tenantId, data);
  }

  @Post('proposals/:id/vote')
  async vote(@Request() req, @Param('id') id: string, @Body() data: { vote: 'for' | 'against' }) {
    return this.governanceService.vote(req.user.tenantId, id, data.vote);
  }
}
