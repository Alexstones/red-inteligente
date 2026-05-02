import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { GovernanceService, TokenService } from './governance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('governance')
@UseGuards(JwtAuthGuard)
export class GovernanceController {
  constructor(
    private governanceService: GovernanceService,
    private tokenService: TokenService
  ) {}

  @Get('balance')
  async getBalance(@Request() req) {
    return this.tokenService.getBalance(req.user.tenantId);
  }

  @Post('proposals')
  async createProposal(@Request() req, @Body() body: any) {
    return this.governanceService.createProposal(req.user.tenantId, body.title, body.description);
  }

  @Post('proposals/:id/vote')
  async vote(@Param('id') id: string, @Body() body: { type: 'for' | 'against' }) {
    return this.governanceService.vote(id, body.type);
  }
}
