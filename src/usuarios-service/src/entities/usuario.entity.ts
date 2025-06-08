// usuarios-service/src/entities/usuario.entity.ts
export class UsuarioEntity {
  id: number;
  correo: string;
  nombre: string;
  biografia?: string;
  fotoPerfil?: string;
  fechaRegistro: Date;
}