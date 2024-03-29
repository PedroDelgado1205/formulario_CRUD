import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css']
})
export class TelefonosComponent implements OnInit {

  codiogoTelefono!: string;
  codiogoDueno!: string;
  numeroTelefono!: string;
  operadoraTelefono!: string;

  constructor(private route: ActivatedRoute, private router: Router, private personaService: PersonaDtoService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const objetoSerializado = params['pe'];
      if (objetoSerializado) {
        const objetoDeserializado = JSON.parse(decodeURIComponent(objetoSerializado));
        this.personaService.setPersonaDto(objetoDeserializado);
        console.log(this.personaService.personaDto);
        this.codiogoTelefono = this.personaService.personaDto.telefono.codigoTelefono;
        this.codiogoDueno = this.personaService.personaDto.telefono.codigoPersona;
        this.numeroTelefono = this.personaService.personaDto.telefono.numeroTelefono;
        this.operadoraTelefono = this.personaService.personaDto.telefono.operadoraTelefono;
      }
    });
  }
  
  validar(){
    if(
      this.verifiarCodigoTelefono() && 
      this.verificarCodigoDueno() && 
      this.verificarNumeroTelefono() && 
      this.verificarOperadora()
    ){
      console.log(this.personaService.personaDto);
      this.route.params.subscribe((params) =>{
        let id = params['id'];
        this.personaService.serIdUser(parseInt(id))
        let idH = params['hi'];
        this.personaService.setIdHistorial(parseInt(idH))
      })
      const objetoSerializado = encodeURIComponent(JSON.stringify(this.personaService.personaDto));
      this.router.navigate(['/direccion', objetoSerializado, this.personaService.idUser,this.personaService.idHistorial]);
    }
  }

  verifiarCodigoTelefono(): boolean{
    const codigo = document.getElementById('codiogoTelefono');
    if((this.codiogoTelefono == null)||(this.codiogoTelefono == undefined)){
      codigo?.classList.remove('form-control', 'is-valid');
      codigo?.classList.add('form-control', 'is-invalid');
      codigo?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obliagtorio');
      return false;
    }else{
      codigo?.classList.remove('form-control', 'is-invalid');
      codigo?.classList.add('form-control', 'is-valid');
      codigo?.setAttribute('placeholder','');
      console.log(this.codiogoTelefono, 'es un codigo valido');
      this.personaService.personaDto.telefono.codigoTelefono = `${this.codiogoTelefono}`;
      return true;
    }
  }

  verificarCodigoDueno(): boolean{
    const codigoP = document.getElementById('codiogoDueno');
    if((this.codiogoDueno == null)||(this.codiogoDueno == undefined)){
      codigoP?.classList.remove('form-control', 'is-valid');
      codigoP?.classList.add('form-control', 'is-invalid');
      codigoP?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      codigoP?.classList.remove('form-control', 'is-invalid');
      codigoP?.classList.add('form-control', 'is-valid');
      codigoP?.setAttribute('placeholder','');
      console.log(this.codiogoDueno, 'es un codigo valido');
      this.personaService.personaDto.telefono.codigoPersona = `${this.codiogoDueno}`;
      return true;
    }
  }

  verificarNumeroTelefono(): boolean{
    const numero = document.getElementById('numeroTelefono');
    if((this.numeroTelefono == null)||(this.numeroTelefono == undefined)){
      numero?.classList.remove('form-control', 'is-valid');
      numero?.classList.add('form-control', 'is-invalid');
      numero?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obliagotrio');
      return false;
    }else{
      if(/^[A-Za-z]+$/g.test(this.numeroTelefono)){
        numero?.classList.remove('form-control', 'is-valid');
        numero?.classList.add('form-control', 'is-invalid');
        numero?.setAttribute('placeholder','El número no puede contener letras');
        console.log('El número no puede contener letras');
        return false;
      }else{
        numero?.classList.remove('form-control', 'is-invalid');
        numero?.classList.add('form-control', 'is-valid');
        numero?.setAttribute('placeholder','');
        console.log(this.numeroTelefono);
        this.personaService.personaDto.telefono.numeroTelefono = `${this.numeroTelefono}`;
        return true;
      }
    }
  }

  verificarOperadora(): boolean{
    const operadora = document.getElementById('operadoraTelefono');
    if((this.operadoraTelefono == null)||(this.operadoraTelefono == undefined)){
      operadora?.classList.remove('form-control', 'is-valid');
      operadora?.classList.add('form-control', 'is-invalid');
      operadora?.setAttribute('placeholder','campo obligatorio');
      console.log('Campo obligatorio');
      return false;
    }else{
      if(!/^[A-Za-z]+$/g.test(this.operadoraTelefono)){
        operadora?.classList.remove('form-control', 'is-valid');
        operadora?.classList.add('form-control', 'is-invalid');
        operadora?.setAttribute('placeholder','El nombre de la operadora no piede contener números');
        console.log('El nombre de la operadora no piede contener números');
        return false;
      }else{
        operadora?.classList.remove('form-control', 'is-invalid');
      operadora?.classList.add('form-control', 'is-valid');
      operadora?.setAttribute('placeholder','');
        console.log(this.operadoraTelefono,'es una operadora valida');
        this.personaService.personaDto.telefono.operadoraTelefono = `${this.operadoraTelefono}`;
        return true;
      }
    }
  }
}



