// src/comunidades/comunidades.module.ts
import { Module } from '@nestjs/common';
import { ComunidadesController } from '../auth/comunidades.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ComunidadesController],
  providers: [PrismaService],
})
export class ComunidadesModule {}