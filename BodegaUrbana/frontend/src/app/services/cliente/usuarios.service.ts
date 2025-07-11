import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../../models/cliente/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarios: Usuarios): Observable<any> {
    return this.http.post(this.apiUrl, usuarios);
  }

  enviarCodigoVerificacion(correo: string, codigo: string): Observable<any> {
    // Este endpoint debería existir en tu backend
    return this.http.post(`${this.apiUrl}/enviar-codigo`, { correo, codigo });
  }

  verificarCorreo(correo: string, codigo: string): Observable<any> {
    // Este endpoint debería existir en tu backend
    return this.http.post(`${this.apiUrl}/verificar`, { correo, codigo });
  }
}