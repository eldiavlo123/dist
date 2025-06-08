// api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080); // Puerto del Gateway
}

bootstrap();