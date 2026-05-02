import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'neural_secret_key_2026',
    });
  }

  async validate(payload: any) {
    // Al validar el token, inyectamos el tenantId en el objeto de la petición (req.user)
    return { 
      userId: payload.sub, 
      email: payload.email, 
      tenantId: payload.tenantId,
      role: payload.role 
    };
  }
}
