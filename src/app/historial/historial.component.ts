import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from '../my-api.service';
import { PersonaDtoService } from '../persona-dto.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent implements OnInit{

  constructor(private router: Router, public personaService: PersonaDtoService, private route: ActivatedRoute, private myApiService: MyApiService){}

  datosH: any;
  fechaReporte!:  string;
  codigoHistorial!: string;
  codigoUsuario!: string;
  nombreUsuario!: string;
  fechaInicio!: string;
  acionesRealizadas: any[] = [];
  acciones: any[] = [];

  ngOnInit(){
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id));
      this.myApiService.getHistorial(id).subscribe((res) => {
        this.datosH = res.data;
        console.log("Respuesta historial", this.datosH);
      });
    })
  }

  verDetalle(i: number, index: number){
    const tablaReporte = document.getElementById('tablaReporte');
    for(let id = 0; id <  tablaReporte!.childElementCount ; id++){
      tablaReporte?.children.item(id)?.classList.remove('table-warning')
    }

    const row = tablaReporte?.children.item(index);
    if(row){
      row.className="table-warning";
    }

    this.acciones=[];
    console.log(i)
    console.log(this.datosH[i-1])
    let fecha = new Date().toLocaleDateString();
    let tiempo = new Date().toLocaleTimeString();

    this.fechaReporte = `${fecha} : ${tiempo}`;
    this.codigoHistorial = `${this.datosH[i-1].codigoHistorial}`;
    this.codigoUsuario = `${this.datosH[i-1].codigoUsuario}`;
    this.nombreUsuario = `${this.datosH[i-1].nombreUsuario}`;
    this.fechaInicio = `${this.datosH[i-1].fecha}`;
    const mensajes = this.datosH[i-1].mensaje.split('-');

    let otpmsg = ['Perfil Editado','Nuevo inicio de sesion','Contacto Agregado','Contacto Editado','Contacto Eliminado'];
    this.acionesRealizadas = mensajes;

    let counter: { [key: string]: number } = {};
    for (let msg of this.acionesRealizadas) {
      if (counter[msg]) {
        counter[msg]++;
      } else {
        counter[msg] = 1;
      } 
    }
    console.log(counter);
    console.log(this.acionesRealizadas);
    for (let index = 0; index < this.acionesRealizadas.length; index++) {
      this.acionesRealizadas[index] = `${this.acionesRealizadas[index]} - Veces realizada: ${counter[this.acionesRealizadas[index]]}`;
    }

    for (let index = 0; index< this.acionesRealizadas.length; index++) {
      if(this.acionesRealizadas[index] != this.acionesRealizadas[index + 1]){
        this.acciones.push(this.acionesRealizadas[index]);
      }
    }
    console.log(this.acciones);
  }
}
