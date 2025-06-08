// usuarios-service/src/usuarios.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'; // Ajusta la ruta relativa

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUsuario(@Param('id') id: string) {
    return this.usuariosService.getUsuarioById(+id);
  }
}