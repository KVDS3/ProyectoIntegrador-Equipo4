// models/cliente/usuarios.model.ts
export interface Usuarios {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  confirmarContraseña?: string;
  direccion: string;
  telefono: string;
  codigoVerificacion?: string;
  codigoIngresado?: string; // Añade esta línea
  verificado?: boolean;
  fechaRegistro?: Date;
  rol?: string;
  aceptaTerminos?: boolean;
}