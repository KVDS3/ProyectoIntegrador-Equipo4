import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../../../models/cliente/usuarios';
import { UsuariosService } from '../../../services/cliente/usuarios.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  pasoActual: number = 1;
  totalPasos: number = 5;
  registroForm: FormGroup;
  codigoVerificacion: string = '';
showSuccessModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      // Paso 1: Información básica
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      
      // Paso 2: Credenciales
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContraseña: ['', [Validators.required]],
      
      // Paso 3: Información de contacto
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      
      // Paso 4: Verificación
      codigoIngresado: ['', Validators.required],
      
      // Paso 5: Términos y condiciones
      aceptaTerminos: [false, Validators.requiredTrue]
    }, { validator: this.coincidenContraseñas });
  }

  getPasswordStrength(): string {
    const password = this.registroForm.get('contraseña')?.value;
    if (!password) return '';
    
    const length = password.length;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (length < 6) return 'weak';
    if (length < 8 || !(hasLetters && hasNumbers)) return 'medium';
    if (length >= 8 && hasLetters && hasNumbers && hasSpecial) return 'strong';
    
    return 'medium';
  }

  coincidenContraseñas(group: FormGroup) {
    const pass = group.get('contraseña')?.value;
    const confirmPass = group.get('confirmarContraseña')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  avanzarPaso() {
    if (this.pasoActual < this.totalPasos) {
      this.pasoActual++;
      
      if (this.pasoActual === 4) {
        this.generarYEnviarCodigo(new Event('click'));
      }
    }
  }

  retrocederPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  generarYEnviarCodigo(event: Event): void {
  event.preventDefault();
  const correo = this.registroForm.get('correo')?.value;
  
  this.usuariosService.enviarCodigoVerificacion(correo).subscribe({
    next: (response) => {
      this.codigoVerificacion = response.codigo; // Asumiendo que el backend devuelve el código
      console.log('Código enviado correctamente');
    },
    error: (error) => {
      console.error('Error al enviar código:', error);
      alert('Error al enviar el código de verificación');
    }
  });
}
  verificarCodigo() {
    const codigoIngresado = this.registroForm.get('codigoIngresado')?.value;
    if (codigoIngresado === this.codigoVerificacion) {
      this.avanzarPaso();
    } else {
      alert('Código incorrecto. Intenta nuevamente.');
    }
  }

 registrarUsuario() {
  if (this.registroForm.valid) {
    const usuario: Usuarios = {
      ...this.registroForm.value,
      verificado: true,
      rol: 'cliente',
      fechaRegistro: new Date()
    };
    
    delete usuario.confirmarContraseña;
    delete usuario.aceptaTerminos;
    delete usuario.codigoIngresado;
    
    this.usuariosService.registrarUsuario(usuario).subscribe({
      next: (response) => {
        this.showSuccessModal = true; // Mostrar el modal en lugar del alert
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un error en el registro. Por favor intenta nuevamente.');
      }
    });
  }
}
closeSuccessModal() {
  this.showSuccessModal = false;
  this.router.navigate(['/']);
}
}