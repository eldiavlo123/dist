// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.modules'; // Importaremos este más adelante

@Module({
  imports: [RoutesModule],
})
export class AppModule {}