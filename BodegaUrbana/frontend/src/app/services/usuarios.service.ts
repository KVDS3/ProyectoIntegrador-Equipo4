import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiurl = 'http://localhost:3000/usuarios';
  constructor() { }
}
