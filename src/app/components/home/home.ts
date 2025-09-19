import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

type Game = {
  key: string;
  title: string;
  desc: string;
  gradientClass: string;
  icon: string;
  ruta: string;
};

@Component({
  selector: 'app-home',
    imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  guestLabel = 'Usuario invitado';

  constructor(private router: Router) { }

  games: Game[] = [
    {
      key: 'ahorcado',
      title: 'Ahorcado',
      desc: 'Adivina la palabra sin quedarte sin intentos.',
      gradientClass: 'grad-fuchsia-indigo',
      icon: 'quiz',
      ruta: '/ahorcado'
    },
    {
      key: 'mayorMenor',
      title: 'Mayor o Menor',
      desc: '¿La carta siguiente será mayor o menor?',
      gradientClass: 'grad-cyan-blue',
      icon: 'bar_chart',
      ruta: '/mayor-menor'
    },
    {
      key: 'preguntados',
      title: 'Preguntados',
      desc: 'Elegí la opción correcta.',
      gradientClass: 'grad-emerald-teal',
      icon: 'psychology',
      ruta: '/preguntados'
    },
    {
      key: 'juegoPropio',
      title: 'Mi juego',
      desc: 'En construccion.',
      gradientClass: 'grad-amber-rose',
      icon: 'auto_awesome',
      ruta: '/juego-propio'
    },
  ];

  irAJuego(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
