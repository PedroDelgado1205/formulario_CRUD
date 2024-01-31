import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDtoService } from '../persona-dto.service';
import { MyApiService } from '../my-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public personaService: PersonaDtoService, public myApiService: MyApiService){}

  ver: Boolean = true;
  verR: Boolean = true;
  nombreDeUsuario!: string;
  correoUsuario!: string;
  contrasenaUsuario!: string;
  contrasenaUsuarioR!: string;
  codigoUsuario!: number;

  ngOnInit(){
    this.route.params.subscribe((params) => {
      const objeto = params['us'];
      if (objeto){
        const objetoDeserializado = JSON.parse(decodeURIComponent(objeto));
        this.personaService.setUserDto(objetoDeserializado);
        this.nombreDeUsuario = this.personaService.userDto.nombreUsuario;
        this.correoUsuario = this.personaService.userDto.correoUsuario;
        this.contrasenaUsuario = this.personaService.userDto.contrasenaUsuario;
        this.contrasenaUsuarioR = "";
        this.codigoUsuario = this.personaService.userDto.codigoUsuario;
      }
    });
  }

  validar() {
    if(
      this.validarNombreUsuario() &&
      this.validarCorreo() &&
      this.validarContraseña ()
    ) {
      this.myApiService.insertarUsuario(this.personaService.userDto).subscribe((res) => {
        console.log(res);
      });
      this.router.navigate(['/login']);
    }else{
      console.log("Todos los campos deben ser llenados correctamente");
    }
  }

  validarNombreUsuario():Boolean{
    const nombre = document.getElementById('nombreDeUsuario');
    if(this.nombreDeUsuario == null || this.nombreDeUsuario == undefined || this.nombreDeUsuario == ''){
      nombre?.classList.remove('form-control', 'is-valid');
      nombre?.classList.add('form-control', 'is-invalid');
      nombre?.setAttribute('placeholder','campo obligatorio');
      this.nombreDeUsuario="";
      console.log('campo obligatorio');
      return false;
    }else{
      nombre?.classList.remove('form-control', 'is-invalid');
      nombre?.classList.add('form-control', 'is-valid');
      console.log(this.nombreDeUsuario)
      this.personaService.userDto.nombreUsuario = this.nombreDeUsuario;
      return true;
    }
  }

  validarCorreo():Boolean{
    const email = document.getElementById('correoUsuario');
    if(this.correoUsuario == null || this.correoUsuario == undefined){
      email?.classList.remove('form-control', 'is-valid');
      email?.classList.add('form-control', 'is-invalid');
      this.correoUsuario = '';
      email?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      return false;
    }else{
      const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(EMAIL_REGEX.test(this.correoUsuario)){
        email?.classList.remove('form-control', 'is-invalid');
        email?.classList.add('form-control', 'is-valid');;
        console.log(this.correoUsuario)
        this.personaService.userDto.correoUsuario = this.correoUsuario;
        return true;
      }else{
        email?.classList.remove('form-control', 'is-valid');
        email?.classList.add('form-control', 'is-invalid');
        email?.setAttribute('placeholder','correo invalido');
        this.correoUsuario='';
        console.log('campo obligatorio');
        return false;
      }
    }
  }

  validarContraseña():Boolean{
    const contraseña = document.getElementById('contraseñaUsuario');
    const contraseñaR = document.getElementById('contraseñaUsuarioR');
    if(
      (this.contrasenaUsuario == null || this.contrasenaUsuario == undefined || this.contrasenaUsuario == '') && 
      (this.contrasenaUsuarioR == null || this.contrasenaUsuarioR == undefined || this.contrasenaUsuarioR == ''))
    {
      contraseña?.classList.remove('form-control', 'is-valid');
      contraseña?.classList.add('form-control', 'is-invalid');
      contraseña?.setAttribute('placeholder','campo obligatorio');
      contraseñaR?.classList.remove('form-control', 'is-valid');
      contraseñaR?.classList.add('form-control', 'is-invalid');
      contraseñaR?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      return false;
    }else{
      if(this.contrasenaUsuario == this.contrasenaUsuarioR){
        contraseña?.classList.remove('form-control', 'is-invalid');
        contraseña?.classList.add('form-control', 'is-valid');
        contraseñaR?.classList.remove('form-control', 'is-invalid');
        contraseñaR?.classList.add('form-control', 'is-valid');
        this.personaService.userDto.contrasenaUsuario = this.contrasenaUsuario;
        return true;
      }else{
        contraseña?.classList.remove('form-control', 'is-valid');
        contraseña?.classList.add('form-control', 'is-invalid');
        contraseña?.setAttribute('placeholder','las contraseñas no coinciden');
        contraseñaR?.classList.remove('form-control', 'is-valid');
        contraseñaR?.classList.add('form-control', 'is-invalid');
        contraseñaR?.setAttribute('placeholder','las contraseñas no coinciden');
        console.log('campo obligatorio');
        return false;
      }
    }
  }

  verClave() {
    const contrasena = document.getElementById('contraseñaUsuario');
    const btnVer = document.getElementById('ver');
    if (contrasena && btnVer){
      if (this.ver == true){
        contrasena.removeAttribute('type');
        contrasena.setAttribute('type','text')
        btnVer.innerHTML = `
        <i class="fas fa-eye-slash" style="color: #264570;"></i>
        `
        this.ver = false;
        console.log(this.ver);
      }else{
        contrasena.removeAttribute('type');
        contrasena.setAttribute('type','password')
        btnVer.innerHTML = `
        <i class="fas fa-eye" style="color: #264570;"></i>
        `
        this.ver = true
        console.log(this.ver);
      }
    }
  }

  verClaveR() {
    const contrasena = document.getElementById('contraseñaUsuarioR');
    const btnVer = document.getElementById('verR');
    if (contrasena && btnVer){
      if (this.verR == true){
        contrasena.removeAttribute('type');
        contrasena.setAttribute('type','text')
        btnVer.innerHTML = `
        <i class="fas fa-eye-slash" style="color: #264570;"></i>
        `
        this.verR = false;
        console.log(this.verR);
      }else{
        contrasena.removeAttribute('type');
        contrasena.setAttribute('type','password')
        btnVer.innerHTML = `
        <i class="fas fa-eye" style="color: #264570;"></i>
        `
        this.verR = true
        console.log(this.verR);
      }
    }
  }
}
