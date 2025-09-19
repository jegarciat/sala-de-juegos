import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})

export class Registro {
  
  email = ''
  password = ''
  name = ''
  
  constructor(private authService: AuthService, private router: Router) {}

  async registro() { 
    if (!this.email || !this.password || !this.name) {
      console.error('Completa email, contraseña y nombre.');
      Swal.fire({title:"Error en registro", text:'Completa email, contraseña y nombre.', icon: 'warning'});
      return;
    }
    this.email = this.normalizar(this.email);
    const registrado = await this.authService.registro(this.email, this.password, this.name);
    if (registrado) {
      await this.authService.iniciarSesion(this.email, this.password);
      const mensaje = `¡Bienvenido/a, ${this.name}!`
      Swal.fire(mensaje, '', 'success');
      Swal.fire({
        icon: "success",
        title: 'Registro exitoso',
        text: mensaje,
        showConfirmButton: false,
        timer: 2000
      });
      await this.router.navigate(['/home']);
    }
    else {
      return; // Los errores ya se manejan en el servicio
    }
  }

  private normalizar(email: string): string {
    return email.trim().toLowerCase();
  }
}
