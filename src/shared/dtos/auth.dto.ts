// shared/dtos/auth.dto.ts
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

export class LoginDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;
}