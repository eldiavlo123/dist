// src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsString()
  nombre: string;
}