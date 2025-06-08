// shared/dtos/usuario.dto.ts
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UsuarioDto {
  id: number;
  correo: string;
  nombre: string;
  biografia?: string;
  fotoPerfil?: string;
  fechaRegistro: Date;
  activo: boolean;
}

export class CreateUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsString()
  nombre: string;

  @IsOptional()
  biografia?: string;

  @IsOptional()
  fotoPerfil?: string;
}

export class UpdateUsuarioDto {
  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
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