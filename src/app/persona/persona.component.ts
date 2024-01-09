import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  constructor(private router: Router){}

  codigoPersona!: number;
  cedulaPersona!: string;
  primerNombre!: string;
  segundoNombre!: string;
  primerApellido!: string;
  segundoApellido!: string;
  edadPersona!: number;
  nacionalidadPersona!: string;

  validar(){
    if((this.verificarCodigo()==true) && (this.verificarCedula()==true) && (this.verificarNombres()==true) && (this.verificarApellidos()==true) && (this.verificarEdad()==true) && (this.verificarNacionalidad()==true)){
      this.router.navigate(['/telefonos']);
    }
  }

  verificarCodigo():boolean{
    const codigo = document.getElementById('codigoPersona');
    if((this.codigoPersona == null)||(this.codigoPersona == undefined)){
      codigo?.classList.remove('form-control', 'is-valid');
      codigo?.classList.add('form-control', 'is-invalid');
      codigo?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      return false;
    }else{
      codigo?.classList.remove('form-control', 'is-invalid');
      codigo?.classList.add('form-control', 'is-valid');
      codigo?.setAttribute('placeholder','');
      console.log(this.codigoPersona,' es un codigo valido');
      return true;
    }
  }

  verificarCedula(): boolean{
    const cedula = document.getElementById('cedulaPersona');
    if((this.cedulaPersona == null)||(this.cedulaPersona == undefined)){
      cedula?.classList.remove('form-control', 'is-valid');
      cedula?.classList.add('form-control', 'is-invalid');
      cedula?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      return false;
    }else{
      if (this.cedulaPersona.length !== 10 || !/^\d+$/.test(this.cedulaPersona)) {
        cedula?.classList.remove('form-control', 'is-valid');
        cedula?.classList.add('form-control', 'is-invalid');
        cedula?.setAttribute('placeholder','La cédula debe tener 10 dígitos numéricos');
        console.log("La cédula debe tener 10 dígitos numéricos.");
        return false;
      }else{
        const digitoVerificador = parseInt(this.cedulaPersona[9]);

        const digitos = this.cedulaPersona.slice(0, 9).split("").map(Number);

        const impares = digitos.filter((_, index) => index % 2 === 0);
        const pares = digitos.filter((_, index) => index % 2 !== 0);

        const imparesMultiplicados = impares.map((d) => {
          let resultado = d * 2;
          if (resultado > 9) {
            resultado -= 9;
          }
          return resultado;
        });

        const sumaTotal = pares.reduce((acc, d) => acc + d, 0) + imparesMultiplicados.reduce((acc, d) => acc + d, 0);

        const modulo10 = sumaTotal % 10;

        if ((modulo10 === 0 && digitoVerificador === 0) || (10 - modulo10 === digitoVerificador)){
          cedula?.classList.remove('form-control', 'is-invalid');
          cedula?.classList.add('form-control', 'is-valid');
          cedula?.setAttribute('placeholder', '');
          console.log('La cedula: ', this.cedulaPersona, ' es verdadera');
          return true;
        }else{
          cedula?.classList.remove('form-control', 'is-valid');
          cedula?.classList.add('form-control', 'is-invalid');
          cedula?.setAttribute('placeholder',`La cedula: ${this.cedulaPersona} es falsa o esta mal escrita`);
          console.log('La cedula: ', this.cedulaPersona, ' es falsa o esta mal escrita');
          return false;
        }
      }
    }
  }

  verificarNombres(): boolean{
    const nombre1 = document.getElementById('primerNombre');
    const nombre2 = document.getElementById('segundoNombre');
    if(((this.primerNombre == null)||(this.primerNombre == undefined))&&((this.segundoNombre == null)||(this.segundoNombre == undefined))){
      nombre1?.classList.remove('form-control', 'is-valid');
      nombre2?.classList.remove('form-control', 'is-valid');
      nombre1?.classList.add('form-control', 'is-invalid');
      nombre2?.classList.add('form-control', 'is-invalid');
      nombre1?.setAttribute('placeholder', 'Campo obligatorio');
      nombre2?.setAttribute('placeholder', 'Campo obligatorio');
      console.log('Campos obligatorio');
      return false
    }else{
      if((!/^[A-Za-z]+$/g.test(this.primerNombre)) && (!/^[A-Za-z]+$/g.test(this.segundoNombre))){
        nombre1?.classList.remove('form-control', 'is-valid');
        nombre2?.classList.remove('form-control', 'is-valid');
        nombre1?.classList.add('form-control', 'is-invalid');
        nombre2?.classList.add('form-control', 'is-invalid');
        nombre1?.setAttribute('placeholder', 'Los nombres solo deben contener letras');
        nombre2?.setAttribute('placeholder', 'Los nombres solo deben contener letras');
        console.log('Los nombres solo deben contener letras');
        return false;
      }else{
        nombre1?.classList.remove('form-control', 'is-invalid');
        nombre2?.classList.remove('form-control', 'is-invalid');
        nombre1?.classList.add('form-control', 'is-valid');
        nombre2?.classList.add('form-control', 'is-valid');
        nombre1?.setAttribute('placeholder', '');
        nombre2?.setAttribute('placeholder', '');        
        console.log(this.primerNombre," ",this.segundoNombre);
        return true;
      }
    }
  }

  verificarApellidos(): boolean{
    const apellido1 = document.getElementById('primerApellido')
    const apellido2 = document.getElementById('segundoApellido')
    if(((this.primerApellido == null)||(this.primerApellido == undefined))&&((this.segundoApellido == null)||(this.segundoApellido == undefined))){
      apellido1?.classList.remove('form-control', 'is-valid');
      apellido2?.classList.remove('form-control', 'is-valid');
      apellido1?.classList.add('form-control', 'is-invalid');
      apellido2?.classList.add('form-control', 'is-invalid');
      console.log('Campo obligatorio');
      return false
    }else{
      if((!/^[A-Za-z]+$/g.test(this.primerApellido))&&(!/^[A-Za-z]+$/g.test(this.segundoApellido))){
        apellido1?.classList.remove('form-control', 'is-valid');
        apellido2?.classList.remove('form-control', 'is-valid');
        apellido1?.classList.add('form-control', 'is-invalid');
        apellido2?.classList.add('form-control', 'is-invalid');
        console.log('Los apellidos solo deben contener letras');
        return false;
      }else{
        apellido1?.classList.remove('form-control', 'is-invalid');
        apellido2?.classList.remove('form-control', 'is-invalid');
        apellido1?.classList.add('form-control', 'is-valid');
        apellido2?.classList.add('form-control', 'is-valid');
        console.log(this.primerApellido," ",this.segundoApellido);
        return true;
      }
    }
  }

  verificarEdad(): boolean{
    const edad = document.getElementById('edadPersona');
    if((this.edadPersona == null)||(this.edadPersona == undefined)){
      edad?.classList.remove('form-control', 'is-valid');
      edad?.classList.add('form-control', 'is-invalid');
      console.log('Campo obligatorio');
      return false
    }else{
      edad?.classList.remove('form-control', 'is-invalid');
      edad?.classList.add('form-control', 'is-valid');
      console.log(this.edadPersona);
      return true;
    }
  }

  verificarNacionalidad(): boolean{
    const nacionalidad = document.getElementById('nacionalidadPersona');
    if((this.nacionalidadPersona == null)||(this.nacionalidadPersona == undefined)){
      nacionalidad?.classList.remove('form-control', 'is-valid');
      nacionalidad?.classList.add('form-control', 'is-invalid');
      console.log('Campo obligatorio');
      return false
    }else{
      if(!/^[A-Za-z]+$/g.test(this.nacionalidadPersona)){
        nacionalidad?.classList.remove('form-control', 'is-valid');
        nacionalidad?.classList.add('form-control', 'is-invalid');
        console.log('La nacionalidad solo debe contener letras');
        return false;
      }else{
        nacionalidad?.classList.remove('form-control', 'is-invalid');
        nacionalidad?.classList.add('form-control', 'is-valid');
        console.log(this.nacionalidadPersona);
        return true;
      }
    }
  }
}