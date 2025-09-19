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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    if (!this.email || !this.password) {
      console.error('Completa email y contraseña.');
      Swal.fire({title:"Error en login", text:'Completa email y contraseña.', icon: 'warning'});
      return;
    }
    this.email = this.normalizar(this.email);
    const loggedIn = await this.authService.iniciarSesion(this.email, this.password);
    if (loggedIn) {
      Swal.fire({
        icon: "success",
        title: '¡Bienvenido!',
        showConfirmButton: false,
        timer: 2000
      });
      await this.router.navigate(['/home']);
    }
    else {
      Swal.fire('Error al iniciar sesión', 'Verifica tus credenciales e intenta nuevamente.', 'error');
    }
  }

  private normalizar(email: string): string {
    return email.trim().toLowerCase();
  }

  async quickFill() {
    console.log('Inicio rápido con usuario:', 'demo@gmail.com');
    this.email = 'demo@gmail.com';
    this.password = '1234567';
  }
}
