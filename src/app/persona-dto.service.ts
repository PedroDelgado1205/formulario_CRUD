import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaDtoService {

  personaDto: PersonaRequest;

  constructor() { 
    this.personaDto = new PersonaRequest;
  }

  setPersonaDto(objetoDeserializado: any): void {
    this.personaDto = objetoDeserializado;
  }
}
class DireccionRequest {
  CodigoDireccion!: string;
  CodigoPersona!: string;
  CallePrincipal!: string;
  CalleSecundaria!: string;
  SectorDireccion!: string;
  NumeroCasa!: string;
}

class TelefonoRequest {
  CodigoTelefono!: string;
  CodigoPersona!: string;
  NumeroTelefono!: string;
  OperadoraTelefono!: string;
}

class PersonaRequest {
  CodigoPersona!: string;
  CedulaPersona!: string;
  NombresPersona!: string;
  ApellidosPersona!: string;
  EdadPersona!: number;
  NacionalidadPersona!: string;
  Direccion: DireccionRequest = new DireccionRequest;
  Telefono: TelefonoRequest = new TelefonoRequest;
}
