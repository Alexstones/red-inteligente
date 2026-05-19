import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { NodesModule } from './nodes/nodes.module';
import { SynapseService } from './synapse.service';
import { SystemModule } from './system/system.module';
import { AlbedrioModule } from './albedrio/albedrio.module';
import { BusinessModule } from './business/business.module';
import { TenantModule } from './tenant/tenant.module';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet/wallet.controller';
import { P2PClientService } from './p2p-client.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GovernanceModule } from './governance/governance.module';
import { SentinelService } from './sentinel.service';
import { MarketOracleService } from './market-oracle.service';
import { BridgeService } from './bridge.service';
import { StakingService } from './staking.service';
import { NexusVMService } from './nexus-vm.service';
import { PrivacyService } from './privacy.service';
import { BigDataService } from './big-data.service';
import { ComplianceService } from './compliance.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
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
    PrismaService, 
    SynapseService, 
    WalletService, 
    P2PClientService, 
    SentinelService,
    MarketOracleService,
    BridgeService,
    StakingService,
    NexusVMService,
    PrivacyService,
    BigDataService,
    ComplianceService
  ],
})
export class AppModule {}
