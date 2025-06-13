export class LoginDto {
  correo: string;
  contrasena: string;
}

export class RegisterDto {
  correo: string;
  contrasena: string;
  nombreUsuario: string;
  nombreCompleto?: string | null;
}