import { Routes } from '@angular/router';
import { HomeComponent } from './components/cliente/home/home.component'; 
import { LoginComponent } from './components/auth/login/login.component';
import { CarritoComponent } from './components/cliente/carrito/carrito.component';
import { GestionDeProductosComponent } from './components/admin/gestion-de-productos/gestion-de-productos.component';
import { RegistroComponent } from './components/auth/registro/registro.component';

export const routes: Routes = [{
    
    path: '',
    component: LoginComponent
},
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'carrito',
    component: CarritoComponent
},
{
    path: 'GestionDeProductos',
    component: GestionDeProductosComponent
},
{
    path: 'registro',
    component: RegistroComponent
}

];
