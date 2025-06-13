import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard'; // Ajusta la ruta relativa

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUsuario(@Param('id') id: string) {
    return this.appService.getUsuarioById(+id);
  }
  
}