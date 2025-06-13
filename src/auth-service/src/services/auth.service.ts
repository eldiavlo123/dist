// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma.service';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { correo, contrasena, nombre } = dto;

    // Verificar si el correo ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (existingUser) {
      throw new UnauthorizedException('El correo ya está en uso');
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(contrasena, salt);

    // Crear usuario en la base de datos
    const user = await this.prisma.usuario.create({
      data: {
        correo,
        contrasenaHash: hash,
        salt,
        nombre,
        activo: true,
        fechaRegistro: new Date(),
      },
    });

    return this.generateToken(user.id, user.correo);
  }

  async login(correo: string, contrasena: string) {
    const user = await this.validateUser(correo, contrasena);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateToken(user.id, user.correo);
  }

  // Método de logout vacío
  async logout() {
    return { message: 'Sesión cerrada' };
  }

  // Generar token JWT con tiempo de vida corto
  generateToken(userId: number, email: string) {
    const payload = { email, sub: userId };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }), // Token dura 15 minutos
    };
  }

  async validateUser(correo: string, contrasena: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!user) {
      return null; // Usuario no encontrado
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasenaHash);

    if (!isMatch) {
      return null; // Contraseña incorrecta
    }

    // Devolver usuario sin datos sensibles
    const { contrasenaHash, salt, ...result } = user;
    return result;
  }
}