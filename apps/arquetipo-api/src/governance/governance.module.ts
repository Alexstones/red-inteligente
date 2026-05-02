import { Module, Global } from '@nestjs/common';
import { GovernanceService, TokenService } from './governance.service';
import { GovernanceController } from './governance.controller';

@Global()
@Module({
  providers: [GovernanceService, TokenService],
  controllers: [GovernanceController],
  exports: [GovernanceService, TokenService],
})
export class GovernanceModule {}
