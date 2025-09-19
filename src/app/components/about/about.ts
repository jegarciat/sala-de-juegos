import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage  } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatIconModule, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  title = 'Sobre mi';
  photoSrc = '../../../assets/sobre_mi.png';
  photoAlt = 'Foto de Jorge';
}
