import { Component } from '@angular/core';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})


export class DireccionComponent {

  

  codigoDireccion!: number;
  codigoDueno!: number;
  callePrincipal!: string;
  calleSecundaria!: string;
  sectorDierccion!: string;
  numeroCasa!: string;

  validar(){
    if((this.verificarCodigo() == true) && (this.verificarCodigoDueno() == true) && (this.verificarCalle1() == true) && (this.verificarCalle2() == true) && (this.verificarSector() == true) && (this.verificarNumeroCasa() == true)){
      console.log('Guardando...');
    }
  }

  verificarCodigo(): boolean{
    if((this.codigoDireccion == null)||(this.codigoDireccion == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      console.log(this.codigoDireccion,'es un codigo valido');
      return true;
    }
  }

  verificarCodigoDueno(): boolean{
    if((this.codigoDueno == null)||(this.codigoDueno == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      console.log(this.codigoDueno,'es un codigo valido');
      return true;
    }
  }

  verificarCalle1(): boolean{
    if((this.callePrincipal == null)||(this.callePrincipal == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      console.log(this.callePrincipal);
      return true;
    }
  }

  verificarCalle2(): boolean{
    if((this.calleSecundaria == null)||(this.calleSecundaria == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      console.log(this.calleSecundaria);
      return true;
    }
  }

  verificarSector(): boolean{
    if((this.sectorDierccion == null)||(this.sectorDierccion == undefined)){
      console.log('Campo obligatorio');
      return true;
    }else{
      console.log(this.sectorDierccion);
      return false;
    }
  }

  verificarNumeroCasa(): boolean{
    if((this.numeroCasa == null)||(this.numeroCasa == undefined)){
      console.log('Campo obligatorio');
      return false;
    }else{
      console.log('El número de casa es',this.numeroCasa);
      return true;
    }
  }
}
