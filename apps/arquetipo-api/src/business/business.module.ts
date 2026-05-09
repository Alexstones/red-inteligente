import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { NodesService } from '../nodes/nodes.service';

import { NodesModule } from '../nodes/nodes.module';
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [NodesModule, AIModule],
  providers: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
