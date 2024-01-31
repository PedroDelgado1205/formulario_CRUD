import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../my-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})

export class TablasComponent implements OnInit{

  datosPs: any[] = [];
  datosP: any;
  datosT: any[] = [];
  datosD: any[] = [];
  codP!: string;

  constructor(private route: ActivatedRoute, private myApiService: MyApiService, private router: Router, public personaService: PersonaDtoService) {}

  ngOnInit(){
    this.route.params.subscribe((params) => {
      const codigoUser = params['id'];
      this.myApiService.getDatos(codigoUser).subscribe((datos) => {
        console.log('Personas:', datos);
        this.datosPs = datos.data;
      });
    });
  }

  TelefonDireccion(codigo: string, index: number){
    const tabPersona = document.getElementById('tabPersona');
    const tabTelefono = document.getElementById('tabTelefono');
    const tabDireccion = document.getElementById('tabDireccion');
  

    for (let index = 0; index < this.datosPs.length; index++) {
      const row = tabPersona?.children.item(index);
      if(row){
        row.className = ""
        const tdEliminar = row.children.item(7);
        const tdEditar = row.children.item(8);
        const btnEditar = tdEditar?.children.item(0);
        const btnEliminar = tdEliminar?.children.item(0);
        btnEditar?.setAttribute('disabled', 'true');
        btnEliminar?.setAttribute('disabled', 'true');
      }
    }

    const row = tabPersona?.children.item(index);
    if(row){
      row.className="table-warning";
      const tdEliminar = row.children.item(7);
      const tdEditar = row.children.item(8);
      const btnEditar = tdEditar?.children.item(0);
      const btnEliminar = tdEliminar?.children.item(0);
      btnEliminar?.removeAttribute("disabled");
      btnEditar?.removeAttribute("disabled");
    }

    tabTelefono?.remove();
    tabDireccion?.remove();

    this.myApiService.getDatosPersona(codigo).subscribe((datosE)=>{
      console.log('Persona:',datosE.data);
      console.log('Telefono:', datosE.data.telefono);
      console.log('Direccion:', datosE.data.direccion);
      this.datosT.push(datosE.data.telefono);
      this.datosD.push(datosE.data.direccion);
      this.datosP=datosE.data;
    });

    this.Codigo(codigo);
  }

  Editar(){
    const objetoSerializado = encodeURIComponent(JSON.stringify(this.datosP));
    this.personaService.setEdiIns(true);
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id))
    })
    this.router.navigate(['/persona', objetoSerializado, this.personaService.idUser]);
  }

  Eliminar(){
    console.log(this.codP)
    this.myApiService.eliminarPersona(this.codP).subscribe((res) => {
      console.log(res);
    });
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id))
    })
    this.router.navigate(['/tablas',this.personaService.idUser]);
  }

  Codigo(codigo: string):String{
    this.codP = codigo;
    console.log(this.codP);
    return this.codP;
  }
}
