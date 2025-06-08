import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
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
            creadorId: true,
            fechaCreacion: true,
          },
        },
      },
    });
  }
}