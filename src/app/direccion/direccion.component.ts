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
      }
    });
  }
  
  validar(){
    if((this.verificarCodigo() == true) && (this.verificarCodigoDueno() == true) && (this.verificarCalle1() == true) && (this.verificarCalle2() == true) && (this.verificarSector() == true) && (this.verificarNumeroCasa() == true)){
      console.log(this.personaService.personaDto);
      this.myApiService.insertarPersona(this.personaService.personaDto).subscribe(
        respuesta =>{ console.log(respuesta);
        });
      this.router.navigate(['/tablas']);
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
      this.personaService.personaDto.Direccion.CodigoDireccion = `${this.codigoDireccion}`;
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
      this.personaService.personaDto.Direccion.CodigoPersona = `${this.codigoDueno}`;
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
      this.personaService.personaDto.Direccion.CallePrincipal = `${this.callePrincipal}`;
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
      this.personaService.personaDto.Direccion.CalleSecundaria= `${this.calleSecundaria}`;
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
      this.personaService.personaDto.Direccion.SectorDireccion = `${this.sectorDierccion}`;
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
      this.personaService.personaDto.Direccion.NumeroCasa = `${this.numeroCasa}`;
      return true;
    }
  }
}


