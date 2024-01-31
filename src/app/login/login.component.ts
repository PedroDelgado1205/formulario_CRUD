import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyApiService } from '../my-api.service';
import { PersonaDtoService } from '../persona-dto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private myApiService: MyApiService, private router: Router, public personaService: PersonaDtoService) {}
  datosUs: any;
  usuario!: string;
  contrasena!: string;
  datosU: any;
  id!: number;
  ver: boolean = true;

  ngOnInit() {
    this.myApiService.getUsers().subscribe((datos) => {
      //console.log('Usuarios:', datos);
      this.datosUs = datos;
    });
  }

  verClave() {
    const contrasena = document.getElementById('contrasena');
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

  nuevo(){
    this.personaService.userDto.codigoUsuario=this.datosUs.data.length + 1;
    this.personaService.userDto.contrasenaUsuario="";
    this.personaService.userDto.correoUsuario="";
    this.personaService.userDto.nombreUsuario="";

    const objetoSerializadoUSER = encodeURIComponent(JSON.stringify(this.personaService.userDto));
    this.personaService.setEdiIns(false);
    this.router.navigate(['/registrarse',objetoSerializadoUSER]);
  }

  validar() {
    const user = document.getElementById('usuario');
    const pasword = document.getElementById('contrasena');
    if ((this.usuario == null || this.contrasena == null)&&(this.usuario == undefined || this.contrasena == undefined)) {
      user?.classList.remove('form-control', 'is-valid');
      user?.classList.add('form-control', 'is-invalid');
      user?.setAttribute('placeholder','campo obligatorio');
      pasword?.classList.remove('form-control', 'is-valid');
      pasword?.classList.add('form-control', 'is-invalid');
      pasword?.setAttribute('placeholder','campo obligatorio');
      console.log('campos obligatorios');
    }else{
      console.log('Usuarios:', this.datosUs);
      for(let i = 0; i < this.datosUs.data.length; i++){
        console.log(this.datosUs.data[i].nombreUsuario, this.usuario)
        console.log(this.datosUs.data[i].contrasenaUsuario, this.contrasena)
        if (this.datosUs.data[i].nombreUsuario == this.usuario && this.datosUs.data[i].contrasenaUsuario == this.contrasena){
          this.myApiService.getUser(this.usuario, this.contrasena).subscribe((res) => {
            this.datosU = res.data;
            this.personaService.serIdUser(parseInt(res.data.codigoUsuario));
            this.id = this.personaService.idUser
            this.router.navigate(['tablas',this.id]);
          })
        }
      }
      user?.classList.remove('form-control', 'is-valid');
      user?.classList.add('form-control', 'is-invalid');
      user?.setAttribute('placeholder','usuario no encontrado o contraseña incorecta');
      this.usuario = ""
      pasword?.classList.remove('form-control', 'is-valid');
      pasword?.classList.add('form-control', 'is-invalid');
      pasword?.setAttribute('placeholder','usuario no encontrado o contraseña incorecta');
      this.contrasena = ""
      console.log('usuario no encontrado');
    }
  }
}
