// src/rabbitmq/rabbitmq.consumer.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { Connection, Channel, ConsumeMessage } from 'amqplib';

import { RABBITMQ_URL, QUEUE_NAME } from './rabbitmq.config';

@Injectable()
export class RabbitMQConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQConsumerService.name);
  private connection: Connection;
  private channel: Channel;

  async onModuleInit() {
    try {
      await this.connect();
    } catch (error) {
      this.logger.error('Error al inicializar RabbitMQ Consumer:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      this.logger.log('Conectando a RabbitMQ...');
      
      // Establecer conexión
      //this.connection = await amqp.connect(RABBITMQ_URL);
      
      // Crear canal
      //this.channel = await this.connection.createChannel();

      // Asegurar que la cola existe
      await this.channel.assertQueue(QUEUE_NAME, { durable: true });
      this.logger.log(`[*] Esperando mensajes en ${QUEUE_NAME}.`);

      // Configurar consumer
      await this.channel.consume(
        QUEUE_NAME, 
        (msg: ConsumeMessage | null) => {
          if (msg !== null) {
            this.handleMessage(msg);
          }
        },
        { noAck: false }
      );

      // Manejar eventos de conexión
      this.connection.on('error', (error: Error) => {
        this.logger.error('Error de conexión RabbitMQ:', error);
      });

      this.connection.on('close', () => {
        this.logger.warn('Conexión RabbitMQ cerrada');
      });

      this.logger.log('RabbitMQ Consumer conectado exitosamente');

    } catch (error) {
      this.logger.error('Error conectando a RabbitMQ:', error);
      throw error;
    }
  }

  private async handleMessage(msg: ConsumeMessage) {
    try {
      const evento = JSON.parse(msg.content.toString());
      this.logger.log('[+] Evento recibido:', evento);

      // Procesar el evento
      await this.procesarEvento(evento);

      // Confirmar recepción del mensaje
      this.channel.ack(msg);
      
    } catch (error) {
      this.logger.error('Error procesando mensaje:', error);
      
      // Rechazar el mensaje sin reenvío
      this.channel.nack(msg, false, false);
    }
  }

  private async disconnect() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        //await this.connection.close();
      }
      this.logger.log('Desconectado de RabbitMQ');
    } catch (error) {
      this.logger.error('Error al desconectar de RabbitMQ:', error);
    }
  }

  private async procesarEvento(evento: any): Promise<void> {
    try {
      switch (evento.evento) {
        case 'mensaje_enviado':
          this.logger.log(`Nuevo mensaje recibido para chat ${evento.chat_id}`);
          // Aquí puedes llamar a un servicio NestJS para notificar al cliente
          break;
        case 'usuario_conectado':
          this.logger.log(`Usuario ${evento.usuario_id} se conectó`);
          break;
        case 'usuario_desconectado':
          this.logger.log(`Usuario ${evento.usuario_id} se desconectó`);
          break;
        default:
          this.logger.warn('[!] Evento desconocido:', evento);
      }
    } catch (error) {
      this.logger.error('Error en procesarEvento:', error);
      throw error;
    }
  }

  // Método público para verificar el estado de la conexión
  public isConnected(): boolean {
    return !!(this.connection && this.channel);
  }

  // Método público para obtener estadísticas del canal
  public async getChannelStats(): Promise<any> {
    if (!this.channel) {
      throw new Error('Canal no disponible');
    }
    
    try {
      return await this.channel.checkQueue(QUEUE_NAME);
    } catch (error) {
      this.logger.error('Error obteniendo estadísticas del canal:', error);
      throw error;
    }
  }
}