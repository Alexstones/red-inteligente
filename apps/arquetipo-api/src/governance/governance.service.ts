import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  /**
   * Inicializa la billetera de un tenant con su dirección única (DID)
   */
  async initWallet(tenantId: string) {
    const address = `did:neural:${Math.random().toString(36).substring(2, 15)}`;
    return this.prisma.wallet.create({
      data: {
        tenantId,
        address,
        balance: 100, // Bono de bienvenida (Airdrop)
      }
    });
  }

  /**
   * Recompensa por Minería de Datos: Genera tokens basados en el peso de la sinapsis
   */
  async rewardSynapse(tenantId: string, synapseWeight: number) {
    const reward = synapseWeight * 10; // 10 tokens por cada 1.0 de peso
    
    return this.prisma.wallet.update({
      where: { tenantId },
      data: {
        balance: { increment: reward }
      }
    });
  }

  async getBalance(tenantId: string) {
    return this.prisma.wallet.findUnique({
      where: { tenantId }
    });
  }

  /**
   * Transferencia entre Billeteras (Criptografía y Red)
   */
  async transfer(fromTenantId: string, toAddress: string, amount: number) {
    // 1. Verificar origen
    const sourceWallet = await this.prisma.wallet.findUnique({ where: { tenantId: fromTenantId } });
    if (!sourceWallet || sourceWallet.balance < amount) throw new Error('Créditos insuficientes');

    // 2. Ejecutar transferencia (Transacción Atómica)
    return this.prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { tenantId: fromTenantId },
        data: { balance: { decrement: amount } }
      });

      return tx.wallet.update({
        where: { address: toAddress },
        data: { balance: { increment: amount } }
      });
    });
  }
}

@Injectable()
export class GovernanceService {
  constructor(private prisma: PrismaService) {}

  async createProposal(tenantId: string, title: string, description: string) {
    return this.prisma.proposal.create({
      data: {
        title,
        description,
        tenantId
      }
    });
  }

  async vote(proposalId: string, type: 'for' | 'against') {
    return this.prisma.proposal.update({
      where: { id: proposalId },
      data: {
        votesFor: type === 'for' ? { increment: 1 } : undefined,
        votesAgainst: type === 'against' ? { increment: 1 } : undefined,
      }
    });
  }
}
