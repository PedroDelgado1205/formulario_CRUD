import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../my-api.service';

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
  datosP: any;
  datosTD: any;
  


  constructor(private myApiService: MyApiService) {}

  ngOnInit(): void {
    const sleccionar = document.getElementById('sleccionar');
    // Ejemplo de cómo utilizar el servicio en tu componente
    this.myApiService.getDatos().subscribe((datos) => {
      console.log('Personas:', datos);
      this.datosP = datos;
    });
  }

  TelefonDireccion(condigo: string){
    this.myApiService.getDatosPersona(condigo).subscribe((datosE)=>{
      console.log('Telefono:', datosE.data.telefono);
      console.log('Direccion:', datosE.data.direccion);
      this.datosTD=datosE;
    });
    const btnEditar = document.getElementById("btnEditar");
    const btnEliminar = document.getElementById("btnEliminar");
    btnEditar?.removeAttribute('disabled');
    btnEliminar?.removeAttribute('disabled');
  }

  editar(){
    const btnEditar = document.getElementById("btnEditar");
    btnEditar!.setAttribute('disabled','true');
    const btnEliminar = document.getElementById("btnEliminar");
    btnEliminar?.setAttribute('disabled','true');
  }

  eliminar(){
    const btnEliminar = document.getElementById("btnEliminar");
    btnEliminar?.setAttribute('disabled','true');
    const btnEditar = document.getElementById("btnEditar");
    btnEditar!.setAttribute('disabled','true');
  }
}
