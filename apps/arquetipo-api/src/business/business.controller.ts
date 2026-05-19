import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
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
  async getInventory(@Request() req, @Query('tenantId') tenantId?: string) {
    const targetTenantId = (req.user.role === 'admin' && tenantId) ? tenantId : req.user.tenantId;
    return this.businessService.getInventory(targetTenantId);
  }

  @Get('sales')
  async getSales(@Request() req, @Query('tenantId') tenantId?: string) {
    const targetTenantId = (req.user.role === 'admin' && tenantId) ? tenantId : req.user.tenantId;
    return this.businessService.getSales(targetTenantId);
  }

  @Get('finance')
  async getFinance(@Request() req, @Query('tenantId') tenantId?: string) {
    const targetTenantId = (req.user.role === 'admin' && tenantId) ? tenantId : req.user.tenantId;
    return this.businessService.getFinance(targetTenantId);
  }
}
