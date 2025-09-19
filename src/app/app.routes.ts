import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { About } from './components/about/about';
import { Registro } from './components/registro/registro';

export const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: 'home', component: Home },
{ path: 'login', component: Login }, 
{ path: 'registro', component: Registro }, 
{ path: 'about', component: About },
{path: '**', redirectTo:'home', pathMatch:'full'},
];
