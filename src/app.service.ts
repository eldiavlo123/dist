// usuarios-service/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUsuarioById(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        correo: true,
        nombre: true,
        biografia: true,
        fotoPerfil: true,
        fechaRegistro: true,
      },
    });

    if (!user) throw new Error('Usuario no encontrado');

    return user;
  }
}