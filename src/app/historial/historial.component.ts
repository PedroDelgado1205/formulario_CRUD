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
  reporte:  string = "";

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

  verDetalle(i: number){
    console.log(i)
    console.log(this.datosH[i-1])
    let fecha = new Date();
    let day = fecha.getDay();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();
    this.reporte = `                                                                                                                                                                                                                                         ${day}/${month}/${year}
    
            ${this.datosH[i-1].codigoHistorial}
            ${this.datosH[i-1].codigoUsuario}
            ${this.datosH[i-1].nombreUsuario}
            ${this.datosH[i-1].fecha}
            ${this.datosH[i-1].mensaje}
    `
  }
}
