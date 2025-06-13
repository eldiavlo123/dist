import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(correo: string, contrasena: string): Promise<string | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasenaHash))) {
      return null;
    }

    // Generar token JWT
    const payload = { sub: usuario.id, correo: usuario.correo };
    return this.jwtService.sign(payload);
  }

  async register(
    correo: string,
    contrasena: string,
    nombre: string,
    biografia?: string | null,
  ): Promise<void> {
    // Generar salt y hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(contrasena, salt);

    await this.prisma.usuario.create({
      data: {
        correo,
        contrasenaHash,
        salt,
        nombre,
        biografia,
      },
    });
  }

  // Método adicional para validar usuario (útil para estrategias de Passport)
  async validateUser(correo: string, contrasena: string): Promise<any> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (usuario && (await bcrypt.compare(contrasena, usuario.contrasenaHash))) {
      // Excluir información sensible del objeto devuelto
      const { contrasenaHash, salt, claveRecuperacion, ...result } = usuario;
      return result;
    }
    return null;
  }

  // Método para encontrar usuario por ID
  async findById(id: number): Promise<any> {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        correo: true,
        nombre: true,
        biografia: true,
        fotoPerfil: true,
        fechaRegistro: true,
        activo: true,
        ultimoAcceso: true,
        // Excluir campos sensibles
      }
    });
  }

  // Método para actualizar último acceso
  async updateLastAccess(id: number): Promise<void> {
    await this.prisma.usuario.update({
      where: { id },
      data: {
        ultimoAcceso: new Date(),
      },
    });
  }

  // Método para bloquear/desbloquear usuario
  async toggleUserBlock(id: number, blocked: boolean): Promise<void> {
    await this.prisma.usuario.update({
      where: { id },
      data: {
        bloqueado: blocked,
      },
    });
  }
}