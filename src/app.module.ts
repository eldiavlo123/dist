import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// === Módulos Propios ===
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrismaModule } from './prisma.module';

// === Servicios y Controladores ===

import { AuthService } from './auth-service/src/services/auth.service';
import { AuthController } from './auth-service/src/controllers/auth.controller';
// === Estrategias ===
import { JwtStrategy } from './auth-service/src/strategies/jwt.strategy';
import { LocalStrategy } from './auth-service/src/strategies/local.strategy';

@Module({
  imports: [
    // Módulos internos
    UsuariosModule,
    PrismaModule, // 👈 Importante: provee PrismaService

    // Configuración de Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
      signOptions: { expiresIn: '3600s' }, // 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PassportModule,
    JwtModule,
  ]
})
export class AppModule {}