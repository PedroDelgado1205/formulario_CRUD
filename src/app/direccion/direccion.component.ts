import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaComponent } from '../persona/persona.component';
import { TelefonosComponent } from '../telefonos/telefonos.component';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})


export class DireccionComponent {

  constructor(private router: Router){}

  codigoDireccion!: string;
  codigoDueno!: string;
  callePrincipal!: string;
  calleSecundaria!: string;
  sectorDierccion!: string;
  numeroCasa!: string;

  persona: TelefonosComponent["persona"] = PersonaComponent.persona;
  validar(){
    if((this.verificarCodigo() == true) && (this.verificarCodigoDueno() == true) && (this.verificarCalle1() == true) && (this.verificarCalle2() == true) && (this.verificarSector() == true) && (this.verificarNumeroCasa() == true)){
      console.log(this.persona);
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
      this.persona.direccion.codigoDireccion = this.codigoDireccion
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
      this.persona.direccion.codigoPersona = this.codigoDueno;
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
      this.persona.direccion.callePrincipal = this.callePrincipal;
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
      this.persona.direccion.calleSecundaria= this.calleSecundaria;
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
      this.persona.direccion.sectorDireccion = this.sectorDierccion;
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
      this.persona.direccion.numeroCasa = this.numeroCasa;
      return true;
    }
  }
}


class Direccion {
  codigo!: string;
  codigoPersona!: string;
  callePrincipal!: string;
  calleSecundaria!: string;
  sector!: string;
  numero!: string;
}

