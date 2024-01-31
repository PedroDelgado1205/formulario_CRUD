import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyApiService } from '../my-api.service';
import { PersonaDtoService } from '../persona-dto.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit{

  constructor(private myApiService: MyApiService, private router: Router, public personaService: PersonaDtoService) {}

  codigo!: number;
  usuario!: string;
  correo!: string;

  contrasena!: string;
  clave!: string;
  datos: any;

  ngOnInit() {
    this.myApiService.getUsers().subscribe((datps) =>{
      this.datos = datps;
      console.log(this.datos);
    });
  }

  recuperar(){
    if(this.validarCampos()){
      for (let i = 0; i < this.datos.data.length; i++) {
        if (
          this.datos.data[i].nombreUsuario = this.usuario && 
          this.datos.data[i].correoUsuario == this.correo && 
          this.datos.data[i].codigoUsuario == this.codigo
        ){
          this.userFind();
        }else{
          this.clave = 'No se encontro al usuario';
        }
      }
    }else{
      this.clave = 'Campos obligatorios'
    }
  }

  userFind(){
      this.myApiService.recuperarClave(this.codigo, this.usuario, this.correo).subscribe((res) =>{
        console.log(res.data.contrasenaUsuario);
        this.contrasena =  res.data.contrasenaUsuario;
        this.clave = `Su contraseña es ${this.contrasena}`;
        console.log(this.clave);
    });
  }

  validarCampos(): boolean{
    const codigo = document.getElementById('codigo');
    const usuario = document.getElementById('usuario');
    const correo = document.getElementById('correo');
    if(
      (this.codigo == null  || this.usuario == null || this.correo == null)||
      (this.codigo == undefined || this.usuario == undefined || this.correo == undefined))
    {
      codigo?.classList.remove('form-control', 'is-valid');
      codigo?.classList.add('form-control', 'is-invalid');
      codigo?.setAttribute('placeholder','campo obligatorio');
      this.codigo = 0
      console.log('campo obligatorio');
      usuario?.classList.remove('form-control', 'is-valid');
      usuario?.classList.add('form-control', 'is-invalid');
      usuario?.setAttribute('placeholder','campo obligatorio');
      this.usuario = ""
      console.log('campo obligatorio');
      correo?.classList.remove('form-control', 'is-valid');
      correo?.classList.add('form-control', 'is-invalid');
      correo?.setAttribute('placeholder','campo obligatorio');
      this.correo = ""
      console.log('campo obligatorio');
      return false;
    }else{
      codigo?.classList.remove('form-control', 'is-invalid');
      codigo?.classList.add('form-control', 'is-valid');
      codigo?.setAttribute('placeholder','campo obligatorio');

      usuario?.classList.remove('form-control', 'is-invalid');
      usuario?.classList.add('form-control', 'is-valid');
      usuario?.setAttribute('placeholder','campo obligatorio');

      correo?.classList.remove('form-control', 'is-invalid');
      correo?.classList.add('form-control', 'is-valid');
      correo?.setAttribute('placeholder','campo obligatorio');

      return true
    }
  }
}
