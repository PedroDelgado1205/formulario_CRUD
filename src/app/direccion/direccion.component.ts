import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';
import { MyApiService } from '../my-api.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})


export class DireccionComponent {

  codigoDireccion!: string;
  codigoDueno!: string;
  callePrincipal!: string;
  calleSecundaria!: string;
  sectorDierccion!: string;
  numeroCasa!: string;

  constructor(private route: ActivatedRoute, private router: Router, private personaService: PersonaDtoService, private myApiService: MyApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const objetoSerializado = params['pe'];
      if (objetoSerializado) {
        const objetoDeserializado = JSON.parse(decodeURIComponent(objetoSerializado));
        this.personaService.setPersonaDto(objetoDeserializado);
        this.codigoDireccion = this.personaService.personaDto.direccion.codigoDireccion
        this.codigoDueno = this.personaService.personaDto.direccion.codigoPersona
        this.callePrincipal = this.personaService.personaDto.direccion.callePrincipal
        this.calleSecundaria = this.personaService.personaDto.direccion.calleSecundaria
        this.sectorDierccion = this.personaService.personaDto.direccion.sectorDireccion
        this.numeroCasa = this.personaService.personaDto.direccion.numeroCasa
      }
    }); 
    this.ocultarBtn();
  }
  
  ocultarBtn(){
    const update = document.getElementById('update');
    const insert = document.getElementById('insert');
    if(this.personaService.edit == true){
      console.log('Editando...');
      if(insert){
        console.log('ocultando el boton de insert...');
        insert.hidden = true;
      }
    }else if(this.personaService.edit == false){
      console.log('Agregando...');
      if(update){
        console.log('ocultando el boton de update...');
        update.hidden = true;
      }
    }else{
      alert("Error en la asignación de valor a edit");
    }
  }

  validarInsercion(){
    if(
      this.verificarCodigo() && 
      this.verificarCodigoDueno() && 
      this.verificarCalle1() && 
      this.verificarCalle2() && 
      this.verificarSector() && 
      this.verificarNumeroCasa()
    ){
      console.log(this.personaService.personaDto);
      this.myApiService.insertarPersona(this.personaService.personaDto).subscribe(
        respuesta =>{ 
          console.log(respuesta);
      });
      this.route.params.subscribe((params) =>{
        let id = params['id'];
        this.personaService.serIdUser(parseInt(id))
      })
      this.router.navigate(['/tablas',this.personaService.idUser]);
    }else{
      this.route.params.subscribe((params) =>{
        let id = params['id'];
        this.personaService.serIdUser(parseInt(id))
      })
      this.router.navigate(['/tablas',this.personaService.idUser]);
    }
  }

  validarEdicion(){
    if(
      this.verificarCodigo() && 
      this.verificarCodigoDueno() && 
      this.verificarCalle1() && 
      this.verificarCalle2() && 
      this.verificarSector() && 
      this.verificarNumeroCasa()
    ){
      console.log(this.personaService.personaDto);
      this.myApiService.editarPersona(this.personaService.personaDto).subscribe(
        respuesta =>{ 
          console.log(respuesta);
        });
        this.route.params.subscribe((params) =>{
          let id = params['id'];
          this.personaService.serIdUser(parseInt(id))
        })
      this.router.navigate(['/tablas',this.personaService.idUser]);
    }else{
      this.route.params.subscribe((params) =>{
        let id = params['id'];
        this.personaService.serIdUser(parseInt(id))
      })
      this.router.navigate(['/tablas',this.personaService.idUser]);
    }
  }

  verificarCodigo(): boolean{
    const codigo = document.getElementById('codigoDireccion');
    if((this.codigoDireccion == null)||(this.codigoDireccion == undefined)){
      codigo?.classList.remove('form-control', 'is-valid');
      codigo?.classList.add('form-control', 'is-invalid');
      codigo?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      codigo?.classList.remove('form-control', 'is-invalid');
      codigo?.classList.add('form-control', 'is-valid');
      codigo?.setAttribute('placeholder','');
      console.log(this.codigoDireccion,'es un codigo valido');
      this.personaService.personaDto.direccion.codigoDireccion = `${this.codigoDireccion}`;
      return true;
    }
  }

  verificarCodigoDueno(): boolean{
    const codigoP = document.getElementById('codigoDueno');
    if((this.codigoDueno == null)||(this.codigoDueno == undefined)){
      codigoP?.classList.remove('form-control', 'is-valid');
      codigoP?.classList.add('form-control', 'is-invalid');
      codigoP?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      codigoP?.classList.remove('form-control', 'is-invalid');
      codigoP?.classList.add('form-control', 'is-valid');
      codigoP?.setAttribute('placeholder','');
      console.log(this.codigoDueno,'es un codigo valido');
      this.personaService.personaDto.direccion.codigoPersona = `${this.codigoDueno}`;
      return true;
    }
  }

  verificarCalle1(): boolean{
    const calle1 = document.getElementById('callePrincipal');
    if((this.callePrincipal == null)||(this.callePrincipal == undefined)||(this.callePrincipal == "")){
      calle1?.classList.remove('form-control', 'is-valid');
      calle1?.classList.add('form-control', 'is-invalid');
      calle1?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      calle1?.classList.remove('form-control', 'is-invalid');
      calle1?.classList.add('form-control', 'is-valid');
      calle1?.setAttribute('placeholder','');
      console.log(this.callePrincipal);
      this.personaService.personaDto.direccion.callePrincipal = `${this.callePrincipal}`;
      return true;
    }
  }

  verificarCalle2(): boolean{
    const calle2 = document.getElementById('calleSecundaria');
    if((this.calleSecundaria == null)||(this.calleSecundaria == undefined)){
      calle2?.classList.remove('form-control', 'is-valid');
      calle2?.classList.add('form-control', 'is-invalid');
      calle2?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      calle2?.classList.remove('form-control', 'is-invalid');
      calle2?.classList.add('form-control', 'is-valid');
      calle2?.setAttribute('placeholder','');
      console.log(this.calleSecundaria);
      this.personaService.personaDto.direccion.calleSecundaria= `${this.calleSecundaria}`;
      return true;
    }
  }

  verificarSector(): boolean{
    const sector = document.getElementById('sectorDierccion');
    if((this.sectorDierccion == null)||(this.sectorDierccion == undefined)){
      sector?.classList.remove('form-control', 'is-valid');
      sector?.classList.add('form-control', 'is-invalid');
      sector?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      sector?.classList.remove('form-control', 'is-invalid');
      sector?.classList.add('form-control', 'is-valid');
      sector?.setAttribute('placeholder','');
      console.log(this.sectorDierccion);
      this.personaService.personaDto.direccion.sectorDireccion = `${this.sectorDierccion}`;
      return true;
    }
  }

  verificarNumeroCasa(): boolean{
    const numero = document.getElementById('numeroCasa');
    if((this.numeroCasa == null)||(this.numeroCasa == undefined)){
      numero?.classList.remove('form-control', 'is-valid');
      numero?.classList.add('form-control', 'is-invalid');
      numero?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      numero?.classList.remove('form-control', 'is-invalid');
      numero?.classList.add('form-control', 'is-valid');
      numero?.setAttribute('placeholder','');
      console.log(this.numeroCasa);
      this.personaService.personaDto.direccion.numeroCasa = `${this.numeroCasa}`;
      return true;
    }
  }
}


