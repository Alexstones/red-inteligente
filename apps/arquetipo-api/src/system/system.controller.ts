import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('system')
export class SystemController {
  constructor(private prisma: PrismaService) {}

  @Get('nodes')
  async getNodes(@Query('index') index: string, @Query('tenantId') tenantId: string) {
    return this.prisma.neuralNode.findMany({
      where: {
        tenantId,
        neuralIndex: index,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get('stats')
  async getStats(@Query('tenantId') tenantId: string) {
    const [backboneCount, limbsCount, headCount] = await Promise.all([
      this.prisma.neuralNode.count({ where: { tenantId, neuralIndex: 'BACKBONE' } }),
      this.prisma.neuralNode.count({ where: { tenantId, neuralIndex: 'LIMB' } }),
      this.prisma.neuralNode.count({ where: { tenantId, neuralIndex: 'HEAD' } }),
    ]);

    return {
      backbone: backboneCount,
      limbs: limbsCount,
      head: headCount,
      total: backboneCount + limbsCount + headCount,
    };
  }
}
