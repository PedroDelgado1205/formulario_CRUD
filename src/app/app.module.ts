import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { PersonaComponent } from './persona/persona.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { DireccionComponent } from './direccion/direccion.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PersonaComponent,
    TelefonosComponent,
    DireccionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
