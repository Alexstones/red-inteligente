import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
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
}
