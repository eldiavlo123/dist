// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../../../shared/dtos/auth.dto'; // Ruta relativa correcta
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'; // Ruta relativa correcta

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('correo') correo: string,
    @Body('contrasena') contrasena: string,
  ) {
    return this.authService.login(correo, contrasena);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return { message: 'Perfil protegido' };
  }
}