import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent {
  static persona: Persona;

  constructor(private router: Router){}


  codigoPersona!: string;
  cedulaPersona!: string;
  nombresPersona!: string;
  apellidosPersona!: string;
  edadPersona!: number;
  nacionalidadPersona!: string;

  persona: Persona = new Persona;

  validar(){
    if((this.verificarCodigo()==true) && (this.verificarCedula()==true) && (this.verificarNombres()==true) && (this.verificarApellidos()==true) && (this.verificarEdad()==true) && (this.verificarNacionalidad()==true)){
      console.log(this.persona);
      this.router.navigate([`/telefonos/${this.persona}`]);
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
      this.persona.codigoPersona = this.codigoPersona;
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
          this.persona.cedulaPersona = this.cedulaPersona;
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
    const nombres = document.getElementById('nombresPersona');
    if(((this.nombresPersona == null)||(this.nombresPersona == undefined))){
      nombres?.classList.remove('form-control', 'is-valid');
      nombres?.classList.add('form-control', 'is-invalid');
      nombres?.setAttribute('placeholder', 'Campo obligatorio');
      console.log('Campos obligatorio');
      return false
    }else{
      if((!/^[A-Za-z A-Za-z]+$/g.test(this.nombresPersona))){
        nombres?.classList.remove('form-control', 'is-valid');
        nombres?.classList.add('form-control', 'is-invalid');
        nombres?.setAttribute('placeholder', 'Los nombres solo deben contener letras');
        console.log('Los nombres solo deben contener letras');
        return false;
      }else{
        nombres?.classList.remove('form-control', 'is-invalid');
        nombres?.classList.add('form-control', 'is-valid');
        nombres?.setAttribute('placeholder', '');     
        console.log(this.nombresPersona);
        this.persona.nombresPersona = this.nombresPersona;
        return true;
      }
    }
  }

  verificarApellidos(): boolean{
    const apellidos = document.getElementById('apellidosPersona');
    if(((this.apellidosPersona == null)||(this.apellidosPersona == undefined))){
      apellidos?.classList.remove('form-control', 'is-valid');
      apellidos?.classList.add('form-control', 'is-invalid');
      console.log('Campo obligatorio');
      return false
    }else{
      if((!/^[A-Za-z A-Za-z]+$/g.test(this.apellidosPersona))){
        apellidos?.classList.remove('form-control', 'is-valid');
        apellidos?.classList.add('form-control', 'is-invalid');
        console.log('Los apellidos solo deben contener letras');
        return false;
      }else{
        apellidos?.classList.remove('form-control', 'is-invalid');
        apellidos?.classList.add('form-control', 'is-valid');
        console.log(this.apellidosPersona);
        this.persona.apellidosPersona = this.apellidosPersona;
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
      this.persona.edadPersona = this.edadPersona;
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
        this.persona.nacionalidadPersona = this.nacionalidadPersona;
        return true;
      }
    }
  }
}

class Direccion {
  codigoDireccion!: string;
  codigoPersona!: string;
  callePrincipal!: string;
  calleSecundaria!: string;
  sectorDireccion!: string;
  numeroCasa!: string;
}

class Telefono {
  codigoTelefono!: string;
  codigoPersona!: string;
  numeroTelefono!: string;
  operadoraTelefono!: string;
}

class Persona {
  codigoPersona!: string;
  cedulaPersona!: string;
  nombresPersona!: string;
  apellidosPersona!: string;
  edadPersona!: number;
  nacionalidadPersona!: string;

  telefono: Telefono = new Telefono;

  direccion: Direccion = new Direccion;
}

