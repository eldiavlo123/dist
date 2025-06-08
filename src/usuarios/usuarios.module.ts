// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { UsuariosController } from '../usuarios-service/src/controllers/usuarios.controller';
import { UsuariosService } from '../usuarios-service/src/services/usuarios.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
  exports: [UsuariosService]
})
export class UsuariosModule {}