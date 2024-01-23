import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../my-api.service';
import { Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})

export class TablasComponent implements OnInit{
  codigop!: string;
  cedula!: string;
  nombre!: string;
  apellidos!: string;
  edad!: string;
  nacionalidad!: string;
  datosPs: any;
  datosP: any;
  datosT: any[] = [];
  datosD: any[] = [];

  constructor(private myApiService: MyApiService, private router: Router, public personaService: PersonaDtoService) {}

  ngOnInit(){
    this.myApiService.getDatos().subscribe((datos) => {
      console.log('Personas:', datos);
      this.datosPs = datos.data;
    });
  }

  TelefonDireccion(condigo: string){
    this.myApiService.getDatosPersona(condigo).subscribe((datosE)=>{
      console.log('Persona:',datosE.data);
      console.log('Telefono:', datosE.data.telefono);
      console.log('Direccion:', datosE.data.direccion);
      this.datosT.push(datosE.data.telefono);
      this.datosD.push(datosE.data.direccion);
      this.datosP=datosE.data;
    });
    const btnEditar = document.getElementById("btnEditar");
    const btnEliminar = document.getElementById("btnEliminar");
    btnEditar?.removeAttribute('disabled');
    btnEliminar?.removeAttribute('disabled');
  }

  Editar(){
    const objetoSerializado = encodeURIComponent(JSON.stringify(this.datosP));
    this.personaService.setEdiIns(true);
    this.router.navigate(['/persona', objetoSerializado]);
  }

  Eliminar(condigo: string){
  }
}
