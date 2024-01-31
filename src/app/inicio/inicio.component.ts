import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';
import { MyApiService } from '../my-api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  constructor(private router: Router, public personaService: PersonaDtoService, private route: ActivatedRoute, private myApiService: MyApiService){}
  
  totalCodigos!: string;

  ngOnInit(){
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id))
    })
    this.myApiService.getTotalPersonas().subscribe((res)=>{
      this.totalCodigos = res.data.length;
      console.log(this.totalCodigos);
    });
  }

  editarPerfil(){
    this.router.navigate(['/editarPrfil',this.personaService.idUser]);
  }

  regresar(){
    this.router.navigate(['/tablas',this.personaService.idUser]);
  }

  Nuevo(){
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id))
    })
    this.personaService.personaDto.codigoPersona=this.totalCodigos;
    this.personaService.personaDto.cedulaPersona="";
    this.personaService.personaDto.nombresPersona="";
    this.personaService.personaDto.apellidosPersona="";
    this.personaService.personaDto.edadPersona=0;
    this.personaService.personaDto.nacionalidadPersona="";
    this.personaService.personaDto.codigoUsuario=this.personaService.idUser;

    this.personaService.personaDto.telefono.codigoTelefono=this.totalCodigos;
    this.personaService.personaDto.telefono.codigoPersona=this.totalCodigos;
    this.personaService.personaDto.telefono.numeroTelefono="";
    this.personaService.personaDto.telefono.operadoraTelefono="";

    this.personaService.personaDto.direccion.codigoDireccion=this.totalCodigos;
    this.personaService.personaDto.direccion.codigoPersona=this.totalCodigos;
    this.personaService.personaDto.direccion.callePrincipal="";
    this.personaService.personaDto.direccion.calleSecundaria="";
    this.personaService.personaDto.direccion.numeroCasa=""
    this.personaService.personaDto.direccion.sectorDireccion="";

    const objetoSerializado = encodeURIComponent(JSON.stringify(this.personaService.personaDto));
    this.personaService.setEdiIns(false);
    this.router.navigate(['/persona',objetoSerializado,this.personaService.idUser]);
  }
}

