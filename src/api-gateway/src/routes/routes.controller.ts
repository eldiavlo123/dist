// api-gateway/src/routes/routes.controller.ts
import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service';

@Controller()
export class RoutesController {
  constructor(private gatewayService: GatewayService) {}

  @Post('auth/register')
  async register(@Body() body: any) {
    return this.gatewayService.register(body);
  }

  @Post('auth/login')
  async login(@Body() body: any) {
    return this.gatewayService.login(body);
  }

  @Get('auth/profile')
  async getProfile(@Request() req: any) {
    const token = req.headers.authorization;
    return this.gatewayService.getProfile(token);
  }

  @Get('usuarios/:id')
async getUsuario(@Request() req: any) {
  const token = req.headers.authorization;
  const usuarioId = req.params.id;

  const res = await this.gatewayService.getUsuario(usuarioId, token);
  return res;
}

  @Get('comunidades')
  async getComunidades(@Request() req: any) {
    const token = req.headers.authorization;
    return this.gatewayService.getComunidades(token);
  }
}