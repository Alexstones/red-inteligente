import { Module, Global } from '@nestjs/common';
import { SynapseService } from './synapse.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { NodesModule } from './nodes/nodes.module';
import { BusinessModule } from './business/business.module';
import { GovernanceModule } from './governance/governance.module';
import { P2PClientService } from './p2p-client.service';
import { AlbedrioModule } from './albedrio/albedrio.module';
import { BotsModule } from './bots/bots.module';
import { SystemModule } from './system/system.module';
import { AIModule } from './ai/ai.module';
import { TenantModule } from './tenant/tenant.module';
import { WalletModule } from './wallet/wallet.module';

@Global()
@Module({
  providers: [SynapseService, PrismaService, P2PClientService],
  exports: [SynapseService, PrismaService, P2PClientService],
})
export class NeuralModule {}

@Module({
  imports: [
    NeuralModule, 
    AuthModule, 
    NodesModule, 
    BusinessModule, 
    GovernanceModule, 
    AlbedrioModule,
    BotsModule,
    SystemModule,
    AIModule,
    TenantModule,
    WalletModule
  ],
})
export class AppModule {}
