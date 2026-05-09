import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GovernanceService {
  constructor(private prisma: PrismaService) {}

  async createProposal(tenantId: string, data: { title: string; description: string }) {
    return this.prisma.proposal.create({
      data: {
        tenantId,
        title: data.title,
        description: data.description,
        status: 'active',
        votesFor: 0,
        votesAgainst: 0,
      },
    });
  }

  async getProposals() {
    return this.prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
      include: { tenant: { select: { name: true, reputation: true } } }
    });
  }

  async vote(tenantId: string, proposalId: string, vote: 'for' | 'against') {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    const proposal = await this.prisma.proposal.findUnique({ where: { id: proposalId } });

    if (!proposal || proposal.status !== 'active') throw new Error('Propuesta no activa');

    // El peso del voto depende de la reputación del tenant
    const weight = Math.floor(tenant?.reputation || 1);

    return this.prisma.proposal.update({
      where: { id: proposalId },
      data: {
        votesFor: vote === 'for' ? { increment: weight } : undefined,
        votesAgainst: vote === 'against' ? { increment: weight } : undefined,
      }
    });
  }

  async closeProposal(proposalId: string) {
    const proposal = await this.prisma.proposal.findUnique({ where: { id: proposalId } });
    if (!proposal) return;

    const finalStatus = proposal.votesFor > proposal.votesAgainst ? 'passed' : 'rejected';

    return this.prisma.proposal.update({
      where: { id: proposalId },
      data: { status: finalStatus }
    });
  }
}
