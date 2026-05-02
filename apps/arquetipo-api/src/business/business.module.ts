import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { NodesService } from '../nodes/nodes.service';

@Module({
  providers: [BusinessService, NodesService],
  controllers: [BusinessController],
})
export class BusinessModule {}
