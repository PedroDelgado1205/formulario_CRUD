// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PersonaComponent } from './persona/persona.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { DireccionComponent } from './direccion/direccion.component';
import { TablasComponent } from './tablas/tablas.component';
import { LoginComponent } from './login/login.component';
import { RecuperarContraseniaComponent } from './recuperar-contrasenia/recuperar-contrasenia.component';
import { RegistroComponent } from './registro/registro.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'persona/:pe/:id/:hi', component: PersonaComponent },
  { path: 'telefonos/:pe/:id/:hi', component: TelefonosComponent },
  { path: 'direccion/:pe/:id/:hi', component: DireccionComponent },
  { path: 'tablas/:id/:hi', component: TablasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarContraseniaComponent },
  { path: 'registrarse/:us', component: RegistroComponent },
  { path: 'editarPrfil/:id/:hi', component: EditarPerfilComponent },
  { path: 'historial/:id/:hi', component: HistorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
