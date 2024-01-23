import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaDtoService {

  personaDto: PersonaRequest;
  edit!: Boolean;

  constructor() { 
    this.personaDto = new PersonaRequest;
  }

  setEdiIns(trFa : boolean){
    this.edit = trFa
  }

  setPersonaDto(objetoDeserializado: any): void {
    console.log(objetoDeserializado);

    this.personaDto.codigoPersona = objetoDeserializado.codigoPersona;
    this.personaDto.cedulaPersona = objetoDeserializado.cedulaPersona;
    this.personaDto.nombresPersona = objetoDeserializado.nombresPersona;
    this.personaDto.apellidosPersona = objetoDeserializado.apellidosPersona;
    this.personaDto.edadPersona = objetoDeserializado.edadPersona;
    this.personaDto.nacionalidadPersona = objetoDeserializado.nacionalidadPersona;

    this.personaDto.telefono.codigoTelefono = objetoDeserializado.telefono.codigoTelefono;
    this.personaDto.telefono.codigoPersona = objetoDeserializado.telefono.codigoPersona;
    this.personaDto.telefono.numeroTelefono = objetoDeserializado.telefono.numeroTelefono;
    this.personaDto.telefono.operadoraTelefono = objetoDeserializado.telefono.operadoraTelefono;

    this.personaDto.direccion.codigoDireccion = objetoDeserializado.direccion.codigoDireccion;
    this.personaDto.direccion.codigoPersona = objetoDeserializado.direccion.codigoPersona;
    this.personaDto.direccion.callePrincipal = objetoDeserializado.direccion.callePrincipal;
    this.personaDto.direccion.calleSecundaria = objetoDeserializado.direccion.calleSecundaria;
    this.personaDto.direccion.sectorDireccion = objetoDeserializado.direccion.sectorDireccion;
    this.personaDto.direccion.numeroCasa = objetoDeserializado.direccion.numeroCasa;

  }
}
class DireccionRequest {
  codigoDireccion!: string;
  codigoPersona!: string;
  callePrincipal!: string;
  calleSecundaria!: string;
  sectorDireccion!: string;
  numeroCasa!: string;
}

class TelefonoRequest {
  codigoTelefono!: string;
  codigoPersona!: string;
  numeroTelefono!: string;
  operadoraTelefono!: string;
}

class PersonaRequest {
  codigoPersona!: string;
  cedulaPersona!: string;
  nombresPersona!: string;
  apellidosPersona!: string;
  edadPersona!: number;
  nacionalidadPersona!: string;
  direccion: DireccionRequest = new DireccionRequest;
  telefono: TelefonoRequest = new TelefonoRequest;
}
