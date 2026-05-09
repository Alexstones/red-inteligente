import { Module, forwardRef } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIOracleService } from '../ai-oracle.service';
import { NodesModule } from '../nodes/nodes.module';

@Module({
  imports: [forwardRef(() => NodesModule)],
  controllers: [AIController],
  providers: [AIOracleService],
  exports: [AIOracleService],
})
export class AIModule {}
