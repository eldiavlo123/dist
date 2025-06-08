// shared/interfaces/usuario.interface.ts
export interface UsuarioDto {
  id: number;
  correo: string;
  nombre: string;
  biografia?: string;
  fotoPerfil?: string;
  activo: boolean;
}