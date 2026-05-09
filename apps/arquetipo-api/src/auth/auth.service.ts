import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { WalletService } from '../wallet.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private walletService: WalletService,
  ) {}

  /**
   * Registro Multi-tenant: Crea el Tenant (Empresa/Sociedad) y el primer Usuario (Admin)
   */
  async register(data: any) {
    const { email, password, name, tenantName, tenantType } = data;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('El correo ya está registrado');

    // 1. Crear el Tenant (La célula inteligente)
    const tenant = await this.prisma.tenant.create({
      data: {
        name: tenantName,
        type: tenantType,
      },
    });

    // 2. Inicializar Billetera Digital (Nativa)
    await this.walletService.getWallet(tenant.id);

    // 3. Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear el Usuario vinculado al Tenant
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        tenantId: tenant.id,
        role: 'admin',
      },
    });

    return this.login(user);
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      tenantId: user.tenantId,
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId,
      }
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
