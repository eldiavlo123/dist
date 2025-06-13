// src/auth/auth.controller.ts
import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../../../shared/dtos/auth.dto'; // Ruta relativa correcta
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'; // Ruta relativa correcta


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() dto: LoginDto) {
    // El guard 'local' ya validó al usuario, está disponible en req.user
    return this.authService.generateToken(req.user.id, req.user.correo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'Perfil protegido', user: req.user };
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}