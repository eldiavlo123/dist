// usuarios-service/src/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene un usuario por su ID desde la base de datos.
   * @param id - ID del usuario a buscar.
   * @returns Datos del usuario (sin contraseña ni salt).
   */
  async getUsuarioById(id: number): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        correo: true,
        nombre: true,
        biografia: true,
        fotoPerfil: true,
        fechaRegistro: true,
        activo: true,
      },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  /**
   * Actualiza los datos de un usuario.
   * @param id - ID del usuario a actualizar.
   * @param data - Datos actualizados del usuario.
   * @returns Usuario actualizado.
   */
  async updateUsuario(id: number, data: any): Promise<any> {
    const updatedUser = await this.prisma.usuario.update({
      where: { id },
      data,
    });

    if (!updatedUser) {
      throw new Error('No se pudo actualizar el usuario');
    }

    return updatedUser;
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - ID del usuario a eliminar.
   * @returns Confirmación de eliminación.
   */
  async deleteUsuario(id: number): Promise<void> {
    const deletedUser = await this.prisma.usuario.delete({
      where: { id },
    });

    if (!deletedUser) {
      throw new Error('No se pudo eliminar el usuario');
    }
  }
}