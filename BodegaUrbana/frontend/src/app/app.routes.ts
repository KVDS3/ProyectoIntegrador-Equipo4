import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { LoginComponent } from './components/login/login.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { GestionDeProductosComponent } from './components/gestion-de-productos/gestion-de-productos.component';

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
}

];
