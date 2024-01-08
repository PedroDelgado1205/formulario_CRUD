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
    if((this.codigoPersona == null)||(this.codigoPersona == undefined)){
      console.log('campo obligatorio');
      return false;
    }else{
      console.log(this.codigoPersona,' es un codigo valido');
      return true;
    }
  }

  verificarCedula(): boolean{
    if((this.cedulaPersona == null)||(this.cedulaPersona == undefined)){
      console.log('campo obligatorio');
      return false;
    }else{
      if (this.cedulaPersona.length !== 10 || !/^\d+$/.test(this.cedulaPersona)) {
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
          console.log('La cedula: ', this.cedulaPersona, ' es verdadera');
          return true;
        }else{
          console.log('La cedula: ', this.cedulaPersona, ' es falsa o esta mal escrita');
          return false;
        }
      }
    }
  }

  verificarNombres(): boolean{
    if(((this.primerNombre == null)||(this.primerNombre == undefined))&&((this.segundoNombre == null)||(this.segundoNombre == undefined))){
      console.log('Campos obligatorio');
      return false
    }else{
      if((!/^[A-Za-z]+$/g.test(this.primerNombre)) && (!/^[A-Za-z]+$/g.test(this.segundoNombre))){
        console.log('Los nombres solo deben contener letras');
        return false;
      }else{
        console.log(this.primerNombre," ",this.segundoNombre);
        return true;
      }
    }
  }

  verificarApellidos(): boolean{
    if(((this.primerApellido == null)||(this.primerApellido == undefined))&&((this.segundoApellido == null)||(this.segundoApellido == undefined))){
      console.log('Campo obligatorio');
      return false
    }else{
      if((!/^[A-Za-z]+$/g.test(this.primerApellido))&&(!/^[A-Za-z]+$/g.test(this.segundoApellido))){
        console.log('Los apellidos solo deben contener letras');
        return false;
      }else{
        console.log(this.primerApellido," ",this.segundoApellido);
        return true;
      }
    }
  }

  verificarEdad(): boolean{
    if((this.edadPersona == null)||(this.edadPersona == undefined)){
      console.log('Campo obligatorio');
      return false
    }else{
      console.log(this.edadPersona);
      return true;
    }
  }

  verificarNacionalidad(): boolean{
    if((this.nacionalidadPersona == null)||(this.nacionalidadPersona == undefined)){
      console.log('Campo obligatorio');
      return false
    }else{
      if(!/^[A-Za-z]+$/g.test(this.nacionalidadPersona)){
        console.log('La nacionalidad solo debe contener letras');
        return false;
      }else{
        console.log(this.nacionalidadPersona);
        return true;
      }
    }
  }
}