import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../../types1/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<{ accessToken: string }> {
    const token = await this.authService.login(body.correo, body.contrasena);
    if (!token) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
    return { accessToken: token };
  }

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(
      body.correo,
      body.contrasena,
      body.nombreUsuario,
      body.nombreCompleto,
    );
  }
}