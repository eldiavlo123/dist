// api-gateway/src/services/gateway.service.ts
import { Injectable } from '@nestjs/common';
import * as axios from 'axios';

@Injectable()
export class GatewayService {
  private authServiceUrl = 'http://auth:3000'; // Nombre del contenedor en docker-compose
  private usuariosServiceUrl = 'http://usuarios:3001';
  private comunidadesServiceUrl = 'http://comunidades:3002';
}