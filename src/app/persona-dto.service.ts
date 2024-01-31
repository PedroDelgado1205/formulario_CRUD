import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaDtoService {

  personaDto: PersonaRequest;
  userDto: UsuarioRequest;
  edit!: Boolean;
  idUser!: number;

  constructor() { 
    this.personaDto = new PersonaRequest;
    this.userDto = new UsuarioRequest;
  }

  serIdUser(id: number){
    this.idUser = id
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
    this.personaDto.codigoUsuario = objetoDeserializado.codigoUsuario;

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

  setUserDto(objetoDeserializadoUSER: any): void{
    this.userDto.codigoUsuario = objetoDeserializadoUSER.codigoUsuario;
    this.userDto.contrasenaUsuario = objetoDeserializadoUSER.contrasenaUsuario;
    this.userDto.correoUsuario = objetoDeserializadoUSER.correoUsuario;
    this.userDto.nombreUsuario = objetoDeserializadoUSER.nombreUsuario;
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
  codigoUsuario!: number;
  direccion: DireccionRequest = new DireccionRequest;
  telefono: TelefonoRequest = new TelefonoRequest;
}

class UsuarioRequest {
  codigoUsuario!: number;
  nombreUsuario!: string;
  correoUsuario!: string;
  contrasenaUsuario!: string;
}
