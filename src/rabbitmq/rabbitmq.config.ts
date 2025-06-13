// src/rabbitmq/rabbitmq.config.ts
export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
export const QUEUE_NAME = process.env.QUEUE_NAME || 'eventos';