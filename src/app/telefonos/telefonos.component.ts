import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css']
})
export class TelefonosComponent {

  codiogoTelefono!: number;
  codiogoDueno!: number;
  numeroTelefono!: string;
  operadoraTelefono!: string;

  constructor(private router: Router){}
  
  validar(){
    if((this.verifiarCodigoTelefono() == true) && (this.verificarCodigoDueno() == true) && (this.verificarNumeroTelefono() == true) && (this.verificarOperadora() == true)){
      this.router.navigate(['/direccion']);
    }
  }

  verifiarCodigoTelefono(): boolean{
    if((this.codiogoTelefono == null)||(this.codiogoTelefono == undefined)){
      console.log('Campo obliagtorio');
      return false;
    }else{
      console.log(this.codiogoTelefono, 'es un codigo valido');
      return true;
    }
  }

  verificarCodigoDueno(): boolean{
    if((this.codiogoDueno == null)||(this.codiogoDueno == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      console.log(this.codiogoDueno, 'es un codigo valido');
      return true;
    }
  }

  verificarNumeroTelefono(): boolean{
    if((this.numeroTelefono == null)||(this.numeroTelefono == undefined)){
      console.log('Campo obliagotrio');
      return false;
    }else{
      if(/^[A-Za-z]+$/g.test(this.numeroTelefono)){
        console.log('El número no puede contener letras');
        return false;
      }else{
        console.log(this.numeroTelefono);
        return true;
      }
    }
  }

  verificarOperadora(): boolean{
    if((this.operadoraTelefono == null)||(this.operadoraTelefono == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      if(!/^[A-Za-z]+$/g.test(this.operadoraTelefono)){
        console.log('El nombre de la operadora no piede contener números');
        return false;
      }else{
        console.log(this.operadoraTelefono,'es una operadora valida');
        return true;
      }
    }
  }
}
