import { Module, forwardRef } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [forwardRef(() => AIModule)],
  providers: [NodesService],
  controllers: [NodesController],
  exports: [NodesService]
})
export class NodesModule {}
