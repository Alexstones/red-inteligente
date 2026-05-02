import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('nodes')
@UseGuards(JwtAuthGuard)
export class NodesController {
  constructor(private nodesService: NodesService) {}

  @Post()
  async create(@Request() req, @Body() body: any) {
    const { type, data, vector } = body;
    return this.nodesService.createNode(req.user.tenantId, type, data, vector);
  }

  @Get()
  async findAll(@Request() req) {
    return this.nodesService.getNodes(req.user.tenantId);
  }
}
