import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.apiUrl, environment.publicAnonKey)
  }
  
  async iniciarSesion(email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.error('Error al iniciar sesión:', error.message);
        return false;
      }
      const user = data.user;
      if (!user) {
        console.error('No se encontró el usuario.');
        return false;
      }
      await this.saveLog(email);
      return true;
    } catch (e: any) {
      console.error('Error inesperado en iniciarSesion():', e?.message ?? e);
      Swal.fire('Error inesperado', e?.message ?? e, 'error');
      return false;
    } 
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error("Error en cerrar sesion",error);
      Swal.fire('Error al cerrar sesión', error.message, 'error');
      return;
    }
    console.log('Sesión cerrada exitosamente.');
    Swal.fire('Sesión cerrada', 'Has cerrado sesión exitosamente.', 'success');
  }

  async registro(email: string, password: string, nombre: string): Promise<boolean> {    
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        console.error('Error al registrarse:', error.message);
        if (error.message.includes('already registered')) {
          Swal.fire('El email ya está registrado.', 'Intenta iniciar sesión.', 'error');
        }
        else if (error.message.includes('invalid format')) {
          Swal.fire('El email no es válido',  'Verifícalo e intenta nuevamente.', 'error');
        }
        else if(error.message.includes('Password should be at least')) {
          Swal.fire('Contraseña inválida', 'La contraseña debe tener al menos 6 caracteres.', 'error');
        }
        else if(error.message.includes('rate limit')) {
          Swal.fire('Demasiados intentos.', 'Probá de nuevo en unos minutos.', 'error');
        }
        else {
          Swal.fire(error.message, '', 'error');
        }
        return false;
      }
      
      const user = data.user;
      if (!user) {
        console.log('No se creó el usuario.');
        Swal.fire('No se creo el usuario correctamente.');
        return false;
      }

      const saved = await this.saveUserData(user, nombre);
      if (saved) {
        return true
      }
      else {
        Swal.fire('Error al guardar datos del usuario.', '', 'error');
        console.error('Error al guardar datos del usuario.');
        return false
      }
    } catch (e: any) {
      console.error('Error inesperado en registro():', e?.message ?? e);
      Swal.fire(e?.message ?? e, '', 'error');
      return false;
    }
  }

  private async saveLog(email: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('logs')
        .insert({
          email: email,
          fecha: new Date()
        });
      if (error) {
        console.error('Error insertando en logs:', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      console.error('Error inesperado en saveLog():', e?.message ?? e);
      return false;
    }
  }

  private async saveUserData(user: User, nombre: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('usuarios')
        .insert({
          auth_id: user.id,
          nombre: nombre,
          email: user.email
        });

      if (error) {
        console.error('Error insertando en usuarios:', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      console.error('Error inesperado en saveUserData():', e?.message ?? e);
      return false;
    }
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.log('obtener la sesión', error);
      return null;
    }
    
    return data.session;
  }
}
