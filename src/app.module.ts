// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProfileController } from './profile/profile.controller';
import { ComunidadesModule } from './comunidades/comunidades.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuariosModule, ComunidadesModule],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
