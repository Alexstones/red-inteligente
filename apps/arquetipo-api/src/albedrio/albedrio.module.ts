import { Module, Global } from '@nestjs/common';
import { AlbedrioService } from './albedrio.service';

@Global()
@Module({
  providers: [AlbedrioService],
  exports: [AlbedrioService],
})
export class AlbedrioModule {}
