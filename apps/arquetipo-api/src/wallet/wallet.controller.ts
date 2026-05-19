import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { WalletService } from '../wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async getWallet(@Request() req) {
    return this.walletService.getWallet(req.user.tenantId);
  }

  @Post('transfer')
  async transfer(@Request() req, @Body() data: { toAddress: string, amount: number }) {
    return this.walletService.transfer(req.user.tenantId, data.toAddress, data.amount);
  }

  @Post('mine')
  async claimMine(@Request() req, @Body() data: { hashrate: number }) {
    return this.walletService.claimMiningReward(req.user.tenantId, data.hashrate);
  }
}
