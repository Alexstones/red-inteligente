import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SynapseService } from './synapse.service';
import { WalletService } from './wallet.service';
import { P2PClientService } from './p2p-client.service';
import { SentinelService } from './sentinel.service';
import { MarketOracleService } from './market-oracle.service';
import { BridgeService } from './bridge.service';
import { StakingService } from './staking.service';
import { NexusVMService } from './nexus-vm.service';
import { PrivacyService } from './privacy.service';
import { BigDataService } from './big-data.service';
import { ComplianceService } from './compliance.service';

@Global()
@Module({
  providers: [
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
  exports: [
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
export class CoreModule {}
