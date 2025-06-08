// api-gateway/src/services/gateway.service.ts
import { Injectable } from '@nestjs/common';
import * as axios from 'axios';

@Injectable()
export class GatewayService {
  private authServiceUrl = 'http://auth:3000'; // Nombre del contenedor en docker-compose
  private usuariosServiceUrl = 'http://usuarios:3001';
  private comunidadesServiceUrl = 'http://comunidades:3002';

  async register(body: any) {
    const res = await axios.post(`${this.authServiceUrl}/auth/register`, body);
    return res.data;
  }

  async login(body: any) {
    const res = await axios.post(`${this.authServiceUrl}/auth/login`, body);
    return res.data;
  }

  async getProfile(token: string) {
    const res = await axios.get(`${this.authServiceUrl}/auth/profile`, {
      headers: { authorization: token },
    });
    return res.data;
  }

  async getUsuario(usuarioId: string, token: string) {
  const res = await axios.get(
    `${this.usuariosServiceUrl}/usuarios/${usuarioId}`,
    {
      headers: { authorization: token },
    }
  );
  return res.data;
}

  async getComunidades(token: string) {
    const res = await axios.get(`${this.comunidadesServiceUrl}/comunidades`, {
      headers: { authorization: token },
    });
    return res.data;
  }
}