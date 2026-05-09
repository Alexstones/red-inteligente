import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tenants')
export class TenantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getTenants() {
    return this.prisma.tenant.findMany({
      include: {
        _count: {
          select: { nodes: true }
        }
      }
    });
  }

  @Post()
  async createTenant(@Body() data: { name: string; type: string; rfc?: string; sector?: string; location?: string }) {
    return this.prisma.tenant.create({
      data: {
        name: data.name,
        type: data.type,
        rfc: data.rfc,
        sector: data.sector,
        location: data.location,
      }
    });
  }
}
