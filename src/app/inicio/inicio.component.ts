import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  constructor(private router: Router, public personaService: PersonaDtoService){}

  ngOnInit(): void {

  }

  Nuevo(){
    this.personaService.personaDto.codigoPersona=""
    this.personaService.personaDto.cedulaPersona=""
    this.personaService.personaDto.nombresPersona=""
    this.personaService.personaDto.apellidosPersona=""
    this.personaService.personaDto.edadPersona=0
    this.personaService.personaDto.nacionalidadPersona=""

    const objetoSerializado = encodeURIComponent(JSON.stringify(this.personaService.personaDto));
    this.personaService.setEdiIns(false);
    this.router.navigate(['/persona',objetoSerializado]);
  }
}

