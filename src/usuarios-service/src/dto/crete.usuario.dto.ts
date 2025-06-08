// usuarios-service/src/dtos/create-usuario.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsString()
  nombre: string;

  biografia?: string;
  fotoPerfil?: string;
}