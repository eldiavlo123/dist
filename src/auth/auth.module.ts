// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/usuarios.module';

import { AuthService } from '../auth-service/src/services/auth.service';
import { AuthController } from '../auth-service/src/controllers/auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../auth-service/src/strategies/jwt.strategy';

import { PrismaModule } from '../prisma.module'; // ✅ Importamos el módulo con PrismaService


@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tu_secreto_super_seguro',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}