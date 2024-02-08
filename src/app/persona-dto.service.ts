import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaDtoService {

  personaDto: PersonaRequest;
  userDto: UsuarioRequest;
  historilaDto: HistorialRequest;
  contraseniaDto: ContraseniaRequest;
  edit!: Boolean;
  idUser!: number;
  idHistorial!: number;

  constructor() { 
    this.personaDto = new PersonaRequest;
    this.userDto = new UsuarioRequest;
    this.historilaDto = new HistorialRequest;
    this.contraseniaDto = new ContraseniaRequest;
  }

  setIdHistorial(idH: number){
    this.idHistorial = idH
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

  setHistorialDto(objetoDeserializadoHistorial: any): void{
    this.historilaDto.codigoHistorial = objetoDeserializadoHistorial.codigoHistorial;
    this.historilaDto.nombreUsuario = objetoDeserializadoHistorial.nombreUsuario;
    this.historilaDto.fecha = objetoDeserializadoHistorial.fecha;
    this.historilaDto.mensaje = objetoDeserializadoHistorial.mensaje;
    this.historilaDto.codigoUsuario = objetoDeserializadoHistorial.codigoUsuario;
  }

  setContraseniaDto(objetoDeserializadoContrasenia: any): void{
    if(objetoDeserializadoContrasenia && objetoDeserializadoContrasenia.contraseniaPasada){
      this.contraseniaDto.codigoContrasenias = objetoDeserializadoContrasenia.codigoContrasenias
      this.contraseniaDto.codigoUsuario = objetoDeserializadoContrasenia.codigoUsuario;
      this.contraseniaDto.contraseniaPasada = objetoDeserializadoContrasenia.contraseniaPasada;
    }
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

class HistorialRequest {
  codigoHistorial!: number;
  nombreUsuario!: string;
  fecha!: string;
  mensaje!: string;
  codigoUsuario!: number;
}

class ContraseniaRequest {
  codigoContrasenias!: number;
  codigoUsuario!: number;
  contraseniaPasada!: string;
}