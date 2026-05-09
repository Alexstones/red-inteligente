import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Post('inventory')
  async addProduct(@Request() req, @Body() data: any) {
    return this.businessService.addProduct(req.user.tenantId, data);
  }

  @Post('sale')
  async recordSale(@Request() req, @Body() data: any) {
    return this.businessService.recordSale(req.user.tenantId, data);
  }

  @Post('finance')
  async recordFinance(@Request() req, @Body() data: any) {
    return this.businessService.recordFinancialEntry(req.user.tenantId, data);
  }

  @Get('inventory')
  async getInventory(@Request() req) {
    return this.businessService.getInventory(req.user.tenantId);
  }

  @Get('sales')
  async getSales(@Request() req) {
    return this.businessService.getSales(req.user.tenantId);
  }

  @Get('finance')
  async getFinance(@Request() req) {
    return this.businessService.getFinance(req.user.tenantId);
  }
}
