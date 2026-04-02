import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { EspaciosComponent } from './pages/espacios/espacios';
import { PisosComponent} from './pages/pisos/pisos';
import { PreciosComponent } from './pages/precios/precios';
import { HomeComponent } from './pages/home/home';
import { VehiculoComponent } from './pages/vehiculo/vehiculo';
import { authGuard } from './auth-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: HomeComponent,
  //  canActivate: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'espacios', component: EspaciosComponent },
      { path: 'pisos', component: PisosComponent },
      { path: 'precios', component: PreciosComponent },
      { path: 'vehiculo', component: VehiculoComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];