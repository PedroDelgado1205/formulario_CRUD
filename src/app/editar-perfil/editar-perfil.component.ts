import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from '../my-api.service';
import { PersonaDtoService } from '../persona-dto.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit{

ver: boolean = true;
edi: boolean = true;
codigo!: number;
usuario!: string;
correo!: string;
contrasena!: string;
contrasenaR!: string;
codigoPersonas: string [] = []
datos: any;

  constructor(private myApiService: MyApiService, private router: Router, private route: ActivatedRoute, public personaService: PersonaDtoService) {}

  ngOnInit(){
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id))
      let idH = params['hi'];
      this.personaService.setIdHistorial(parseInt(idH))
    })
    console.log(this.personaService.idUser);
    this.myApiService.getUserCodigo(this.personaService.idUser).subscribe((res) => {
      this.datos = res;
      this.personaService.setUserDto(res.data);
      this.codigo = this.personaService.userDto.codigoUsuario
      this.usuario = this.personaService.userDto.nombreUsuario; 
      this.correo = this.personaService.userDto.correoUsuario;
      this.contrasena = this.personaService.userDto.contrasenaUsuario;
      this.contrasenaR = this.contrasena;
      console.log(this.datos)
    });
  }

  editarMensaje(mensaje: string){
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id))
      let idH = params['hi'];
    this.personaService.setIdHistorial(parseInt(idH))
    })
    this.myApiService.getHistorialReciente(this.personaService.idHistorial).subscribe((res)=>{
      console.log(res);
      this.personaService.setHistorialDto(res.data);
      this.personaService.historilaDto.mensaje = this.personaService.historilaDto.mensaje + mensaje;
      console.log(this.personaService.historilaDto.mensaje);
      this.myApiService.editarHistorial(this.personaService.historilaDto).subscribe((res)=>{
        console.log(res);
      })
    })
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

  eliminar(){
    this.route.params.subscribe((params) =>{
      let id = params['id'];
      this.personaService.serIdUser(parseInt(id));
    })
    this.myApiService.getDatos(this.codigo).subscribe((personas)=>{
      for (let i = 0; i < personas.data.length; i++) {
        this.codigoPersonas.push(personas.data[i].codigoPersona)
      }
      for(let i = 0; i < this.codigoPersonas.length; i++){
        this.myApiService.eliminarPersona(this.codigoPersonas[i].toString()).subscribe((r)=>{
          console.log(r);
        })
      }
      this.myApiService.eliminarUsuario(this.personaService.idUser).subscribe((res)=>{
        console.log(res)
      })
      this.router.navigate(['/login']);
    })
  }

  editar(){
    const contraRep = document.getElementById('contraRep');
    const iptUsuario = document.getElementById('usuario');
    const iptCorreo = document.getElementById('correo');
    const iptContrasena = document.getElementById('contrasena');
    const iptContrasenaR = document.getElementById('contrasenaR');

    if(this.edi == true){
      contraRep?.removeAttribute('hidden');
      iptUsuario?.removeAttribute('disabled');
      iptCorreo?.removeAttribute('disabled');
      iptContrasena?.removeAttribute('disabled');
      iptContrasenaR?.removeAttribute('disabled');
      this.edi = false;
    }else{
      contraRep?.setAttribute('hidden', 'true');
      iptUsuario?.setAttribute('disabled', 'true');
      iptCorreo?.setAttribute('disabled', 'true');
      iptContrasena?.setAttribute('disabled', 'true');
      iptContrasenaR?.setAttribute('disabled', 'true');
      this.edi = true
      this.validar();
    }
  }

  validar() {
    if(
      this.validarNombreUsuario() &&
      this.validarCorreo() &&
      this.validarContraseña ()
    ) {
      this.myApiService.editarUsuario(this.personaService.userDto).subscribe((res)=>{
        console.log(res);
      });
      let mensaje = ' Perfil Editado';
      this.editarMensaje(mensaje)
      this.router.navigate(['/tablas',this.personaService.idUser,this.personaService.idHistorial]);
    }else{
      console.log("Todos los campos deben ser llenados correctamente");
    }
  }

  validarNombreUsuario():Boolean{
    const nombre = document.getElementById('usuario');
    if(this.usuario == null || this.usuario == undefined || this.usuario == ''){
      nombre?.classList.remove('form-control', 'is-valid');
      nombre?.classList.add('form-control', 'is-invalid');
      nombre?.setAttribute('placeholder','campo obligatorio');
      this.usuario="";
      console.log('campo obligatorio');
      return false;
    }else{
      nombre?.classList.remove('form-control', 'is-invalid');
      nombre?.classList.add('form-control', 'is-valid');
      console.log(this.usuario)
      this.personaService.userDto.nombreUsuario = this.usuario;
      return true;
    }
  }

  validarCorreo():Boolean{
    const email = document.getElementById('correo');
    if(this.correo == null || this.correo == undefined){
      email?.classList.remove('form-control', 'is-valid');
      email?.classList.add('form-control', 'is-invalid');
      this.correo = '';
      email?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      return false;
    }else{
      const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(EMAIL_REGEX.test(this.correo)){
        email?.classList.remove('form-control', 'is-invalid');
        email?.classList.add('form-control', 'is-valid');;
        console.log(this.correo)
        this.personaService.userDto.correoUsuario = this.correo;
        return true;
      }else{
        email?.classList.remove('form-control', 'is-valid');
        email?.classList.add('form-control', 'is-invalid');
        email?.setAttribute('placeholder','correo invalido');
        this.correo='';
        console.log('campo obligatorio');
        return false;
      }
    }
  }

  validarContraseña():Boolean{
    const contraseña = document.getElementById('contrasena');
    const contraseñaR = document.getElementById('contrasenaR');
    if(
      (this.contrasena == null || this.contrasena == undefined || this.contrasena == '') && 
      (this.contrasenaR == null || this.contrasenaR == undefined || this.contrasenaR == ''))
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
      if(this.contrasena == this.contrasenaR){
        contraseña?.classList.remove('form-control', 'is-invalid');
        contraseña?.classList.add('form-control', 'is-valid');
        contraseñaR?.classList.remove('form-control', 'is-invalid');
        contraseñaR?.classList.add('form-control', 'is-valid');
        this.personaService.userDto.contrasenaUsuario = this.contrasena;
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
}
