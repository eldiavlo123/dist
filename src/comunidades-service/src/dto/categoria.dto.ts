// comunidades-service/src/dtos/categoria.dto.ts
import { IsString, IsBoolean } from 'class-validator';

export class CategoriaDto {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  activa: boolean;
}