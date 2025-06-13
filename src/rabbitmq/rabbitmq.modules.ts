// src/rabbitmq/rabbitmq.module.ts

import { Module } from '@nestjs/common';
import { RabbitMQConsumerService } from './rabbitmq.consumer.service';

@Module({
  providers: [RabbitMQConsumerService],
  exports: [],
})
export class RabbitMQModule {}