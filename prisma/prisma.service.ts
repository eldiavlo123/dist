// prisma/prisma.service.ts
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    app.use((req, res, next) => {
      process.on('SIGINT', async () => {
        await this.$disconnect();
        await app.close();
      });
    });
  }
}