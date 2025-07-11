import { Routes } from '@angular/router';
import { HomeComponent } from './components/cliente/home/home.component'; 
import { LoginComponent } from './components/auth/login/login.component';
import { CarritoComponent } from './components/cliente/carrito/carrito.component';
import { GestionDeProductosComponent } from './components/admin/gestion-de-productos/gestion-de-productos.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { RecuperacionContrasenaComponent } from './components/auth/recuperacion-contrasena/recuperacion-contrasena.component';
import { CatalogoProductosComponent } from './components/cliente/catalogo-productos/catalogo-productos.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

export const routes: Routes = [
//auth
{
    
    path: '',
    component: LoginComponent
},
{
    path: 'registro',
    component: RegistroComponent
},
{
    path: 'recuperar-contraseña',
    component: RecuperacionContrasenaComponent
},



//Cliente
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'carrito',
    component: CarritoComponent
},
{
    path: 'catalogos-p',
    component: CatalogoProductosComponent
},



//admin
{
    path: 'dashboard',
    component: DashboardComponent
},
{
    path: 'GestionDeProductos',
    component: GestionDeProductosComponent
}

];
