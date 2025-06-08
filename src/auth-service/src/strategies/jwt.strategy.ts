import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Valida si el token ha expirado
      secretOrKey: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
    });

    if (!user) throw new Error('Usuario no encontrado');

    return {
      userId: user.id,
      correo: user.correo,
      nombre: user.nombre,
    };
  }
}