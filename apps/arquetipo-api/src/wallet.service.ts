import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getWallet(tenantId: string) {
    let wallet = await this.prisma.wallet.findUnique({
      where: { tenantId },
      include: { transactions: { take: 10, orderBy: { createdAt: 'desc' } } }
    });

    if (!wallet) {
      // Crear billetera si no existe
      wallet = await this.prisma.wallet.create({
        data: {
          tenantId,
          address: `0x${Math.random().toString(16).slice(2, 42)}`,
          balance: 0.0,
        },
        include: { transactions: true }
      });
    }

    return wallet;
  }

  async addReward(tenantId: string, amount: number, reason: string) {
    const wallet = await this.getWallet(tenantId);
    
    return this.prisma.$transaction(async (tx) => {
      // Actualizar Balance
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: amount } }
      });

      // Registrar Transacción
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'REWARD',
          toAddress: wallet.address,
          metadata: { reason }
        }
      });

      return updatedWallet;
    });
  }

  async transfer(fromTenantId: string, toAddress: string, amount: number) {
    const fromWallet = await this.getWallet(fromTenantId);
    const toWallet = await this.prisma.wallet.findUnique({ where: { address: toAddress } });

    if (fromWallet.balance < amount) throw new Error('Saldo insuficiente');

    return this.prisma.$transaction(async (tx) => {
      // Descontar
      await tx.wallet.update({
        where: { id: fromWallet.id },
        data: { balance: { decrement: amount } }
      });

      // Incrementar (si es interno)
      if (toWallet) {
        await tx.wallet.update({
          where: { id: toWallet.id },
          data: { balance: { increment: amount } }
        });
      }

      // Registrar
      await tx.transaction.create({
        data: {
          walletId: fromWallet.id,
          amount: -amount,
          type: 'TRANSFER',
          fromAddress: fromWallet.address,
          toAddress,
        }
      });

      return { status: 'success' };
    });
  }
}
