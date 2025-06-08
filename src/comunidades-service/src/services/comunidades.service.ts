// comunidades-service/src/services/comunidades.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ComunidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.categoria.findMany({
      where: { activa: true },
      include: {
        chats: {
          where: { privado: false, activo: true },
          select: {
            id: true,
            nombre: true,
            descripcion: true,
            imagen: true,
          },
        },
      },
    });
  }
}