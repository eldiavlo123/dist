// comunidades-service/src/dtos/chat.dto.ts
import { IsString, IsBoolean } from 'class-validator';

export class ChatDto {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  privado: boolean;
  activo: boolean;
  categoriaId: number;
  creadorId: number;
}