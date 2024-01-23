// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PersonaComponent } from './persona/persona.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { DireccionComponent } from './direccion/direccion.component';
import { TablasComponent } from './tablas/tablas.component';

const routes: Routes = [
  { path: '', redirectTo: '/tablas', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'persona/:pe', component: PersonaComponent },
  { path: 'telefonos/:pe', component: TelefonosComponent },
  { path: 'direccion/:pe', component: DireccionComponent },
  { path: 'tablas', component: TablasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
