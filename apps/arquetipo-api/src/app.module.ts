import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core.module';
import { NodesModule } from './nodes/nodes.module';
import { SystemModule } from './system/system.module';
import { AlbedrioModule } from './albedrio/albedrio.module';
import { BusinessModule } from './business/business.module';
import { TenantModule } from './tenant/tenant.module';
import { WalletController } from './wallet/wallet.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GovernanceModule } from './governance/governance.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
    CoreModule,
    NodesModule,
    SystemModule,
    AlbedrioModule,
    BusinessModule,
    TenantModule,
    AuthModule,
    GovernanceModule,
  ],
  controllers: [AppController, WalletController],
  providers: [
    AppService, 
  ],
})
export class AppModule {}
