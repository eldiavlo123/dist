// usuarios-service/src/dtos/update-usuario.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  contrasena?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsOptional()
  biografia?: string;

  @IsOptional()
  fotoPerfil?: string;
}