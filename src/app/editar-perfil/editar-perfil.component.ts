import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from '../my-api.service';
import { PersonaDtoService } from '../persona-dto.service';
import { identifierName } from '@angular/compiler';
import { Observable, map } from 'rxjs';
import { flush } from '@angular/core/testing';

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
contrasenaA!: string;
contrasenaAe!: string;
codigoPersonas: string [] = []
datos: any;
contrasenasAntiguas: any;
contasenaPas!: string;
tf: boolean = false;
ft: boolean = false;
verificador!: boolean;

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
      this.codigo = this.personaService.userDto.codigoUsuario;
      this.usuario = this.personaService.userDto.nombreUsuario; 
      this.correo = this.personaService.userDto.correoUsuario;
      this.contrasena = this.personaService.userDto.contrasenaUsuario;
      this.contrasenaR = this.contrasena;
      this.contasenaPas = this.contrasena;
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
    });
  }

  editar(){
    const contraRep = document.getElementById('contraRep');
    const iptUsuario = document.getElementById('usuario');
    const iptCorreo = document.getElementById('correo');
    const iptContrasena = document.getElementById('contrasena');
    const iptContrasenaR = document.getElementById('contrasenaR');
    const contrasenaA = document.getElementById('contrasenaAedi')

    if(this.edi == true){
      contraRep?.removeAttribute('hidden');
      iptUsuario?.removeAttribute('disabled');
      iptCorreo?.removeAttribute('disabled');
      iptContrasena?.removeAttribute('disabled');
      iptContrasenaR?.removeAttribute('disabled');
      contrasenaA?.removeAttribute('hidden');
      this.edi = false;
    }else{
      contraRep?.setAttribute('hidden', 'true');
      iptUsuario?.setAttribute('disabled', 'true');
      iptCorreo?.setAttribute('disabled', 'true');
      iptContrasena?.setAttribute('disabled', 'true');
      iptContrasenaR?.setAttribute('disabled', 'true');
      contrasenaA?.setAttribute('hidden','true');
      this.edi = true
      if(this.validarContraseñaPasadaEdicion()){
        this.validar();
      }
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
      let mensaje = '-Perfil Editado';
      this.editarMensaje(mensaje)
      this.router.navigate(['/tablas',this.personaService.idUser,this.personaService.idHistorial]);
    }else{
      console.log("Todos los campos deben ser llenados correctamente");
    }
  }

  validarEliminacion(){
    if(this.validarContraseñaPasada()){
      this.eliminar();
    }
  }

  validarContraseñaPasadaEdicion(): Boolean {
    const contraseñaA = document.getElementById('contrasenaAe')
    if(this.contrasenaAe == null || this.contrasenaAe == undefined || this.contrasenaAe == ""){
      contraseñaA?.classList.remove('form-control', 'is-valid');
      contraseñaA?.classList.add('form-control','is-invalid');
      contraseñaA?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      this.contrasenaA = "";
      console.log("f")
      return false;
    } else {
      if(this.contrasenaAe == this.contasenaPas){
        contraseñaA?.classList.remove('form-control','is-invalid');
        contraseñaA?.classList.add('form-control', 'is-valid');
        console.log("t")
        return true;
      }else{
        contraseñaA?.classList.remove('form-control', 'is-valid');
        contraseñaA?.classList.add('form-control','is-invalid');
        contraseñaA?.setAttribute('placeholder','no coincide con su contraseña antigua');
        console.log('no coincide con su contraseña antigua');
        this.contrasenaAe = "";
        console.log("f")
        return false;
      }  
    }
  }

  validarContraseñaPasada(): Boolean {
    const contraseñaA = document.getElementById('contrasenaA')
    if(this.contrasenaA == null || this.contrasenaA == undefined || this.contrasenaA == ""){
      contraseñaA?.classList.remove('form-control', 'is-valid');
      contraseñaA?.classList.add('form-control','is-invalid');
      contraseñaA?.setAttribute('placeholder','campo obligatorio');
      console.log('campo obligatorio');
      this.contrasenaA = "";
      console.log("f")
      return false;
    } else {
      if(this.contrasenaA != this.contasenaPas){
        contraseñaA?.classList.remove('form-control', 'is-valid');
        contraseñaA?.classList.add('form-control','is-invalid');
        contraseñaA?.setAttribute('placeholder','no coincide con su contraseña antigua');
        console.log('no coincide con su contraseña antigua');
        this.contrasenaA = "";
        console.log("f")
        return false;
      }else{
        contraseñaA?.classList.remove('form-control','is-invalid');
        contraseñaA?.classList.add('form-control', 'is-valid');
        console.log("t")
        return true;
      }  
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
      console.log("f")
      return false;
    }else{
      nombre?.classList.remove('form-control', 'is-invalid');
      nombre?.classList.add('form-control', 'is-valid');
      console.log(this.usuario)
      this.personaService.userDto.nombreUsuario = this.usuario;
      console.log("t")
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
      console.log("f")
      return false;
    }else{
      const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(EMAIL_REGEX.test(this.correo)){
        email?.classList.remove('form-control', 'is-invalid');
        email?.classList.add('form-control', 'is-valid');;
        console.log(this.correo)
        this.personaService.userDto.correoUsuario = this.correo;
        console.log("t")
        return true;
      }else{
        email?.classList.remove('form-control', 'is-valid');
        email?.classList.add('form-control', 'is-invalid');
        email?.setAttribute('placeholder','correo invalido');
        this.correo='';
        console.log('campo obligatorio');
        console.log("f")
        return false;
      }
    }
  }

  validarContraseña(): boolean {
    const contraseña = document.getElementById('contrasena');
    const contraseñaR = document.getElementById('contrasenaR');

    if ((this.contrasena == null || this.contrasena == undefined || this.contrasena == '') && (this.contrasenaR == null || this.contrasenaR == undefined || this.contrasenaR == '')) {
      contraseña?.classList.remove('form-control', 'is-valid');
      contraseña?.classList.add('form-control', 'is-invalid');
      contraseña?.setAttribute('placeholder', 'campo obligatorio');
      contraseñaR?.classList.remove('form-control', 'is-valid');
      contraseñaR?.classList.add('form-control', 'is-invalid');
      contraseñaR?.setAttribute('placeholder', 'campo obligatorio');
      console.log('campo obligatorio');
      this.contrasena = "";
      this.contrasenaR = "";
      console.log("f")
      this.ft = false;
    } else {
      if (this.contrasena != this.contrasenaR) {
        contraseña?.classList.remove('form-control', 'is-valid');
        contraseña?.classList.add('form-control', 'is-invalid');
        contraseña?.setAttribute('placeholder', 'las contraseñas no coinciden');
        contraseñaR?.classList.remove('form-control', 'is-valid');
        contraseñaR?.classList.add('form-control', 'is-invalid');
        contraseñaR?.setAttribute('placeholder', 'las contraseñas no coinciden');
        console.log('las contraseñas no coinciden');
        this.contrasena = "";
        this.contrasenaR = "";
        console.log("f")
        this.ft = false;
      } else {
        if (this.contrasena.length < 8) {
          contraseña?.classList.remove('form-control', 'is-valid');
          contraseña?.classList.add('form-control', 'is-invalid');
          contraseña?.setAttribute('placeholder', 'la contraseña debe tener un mínimo de 8 caracteres');
          contraseñaR?.classList.remove('form-control', 'is-valid');
          contraseñaR?.classList.add('form-control', 'is-invalid');
          contraseñaR?.setAttribute('placeholder', 'la contraseña debe tener un mínimo de 8 caracteres');
          console.log('la contraseña debe tener un mínimo de 8 caracteres');
          this.contrasena = "";
          this.contrasenaR = "";
          console.log("f")
          this.ft = false;
        } else {
          if (this.contrasena.length > 16) {
            contraseña?.classList.remove('form-control', 'is-valid');
            contraseña?.classList.add('form-control', 'is-invalid');
            contraseña?.setAttribute('placeholder', 'la contraseña debe tener un máximo de 16 caracteres');
            contraseñaR?.classList.remove('form-control', 'is-valid');
            contraseñaR?.classList.add('form-control', 'is-invalid');
            contraseñaR?.setAttribute('placeholder', 'la contraseña debe tener un máximo de 16 caracteres');
            console.log('la contraseña debe tener un máximo de 16 caracteres');
            this.contrasena = "";
            this.contrasenaR = "";
            console.log("f")
            this.ft = false;
          } else {
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.contrasena)) {
              contraseña?.classList.remove('form-control', 'is-valid');
              contraseña?.classList.add('form-control', 'is-invalid');
              contraseña?.setAttribute('placeholder', 'la contraseña debe contener al menos un carácter especial');
              contraseñaR?.classList.remove('form-control', 'is-valid');
              contraseñaR?.classList.add('form-control', 'is-invalid');
              contraseñaR?.setAttribute('placeholder', 'la contraseña debe contener al menos un carácter especial');
              console.log('la contraseña debe contener al menos un carácter especial');
              this.contrasena = "";
              this.contrasenaR = "";
              console.log("f")
              this.ft = false;
            } else {
              this.contraseñaPasadas().subscribe( tf => {
                if (tf == true){
                  contraseña?.classList.remove('form-control', 'is-valid');
                  contraseña?.classList.add('form-control', 'is-invalid');
                  contraseña?.setAttribute('placeholder', 'No puede usar una contraseña pasada');
                  contraseñaR?.classList.remove('form-control', 'is-valid');
                  contraseñaR?.classList.add('form-control', 'is-invalid');
                  contraseñaR?.setAttribute('placeholder', 'No puede usar una contraseña pasada');
                  console.log('No puede usar una contraseña pasada');
                  this.contrasena = "";
                  this.contrasenaR = "";
                  return this.ft = false;
                }else{
                  contraseña?.classList.remove('form-control', 'is-invalid');
                  contraseña?.classList.add('form-control', 'is-valid');
                  contraseñaR?.classList.remove('form-control', 'is-invalid');
                  contraseñaR?.classList.add('form-control', 'is-valid');
                  return this.ft = true;
                }
              })
            }
          }
        }
      }
    }
    console.log(this.ft)
    return this.ft;
  }

  contraseñaPasadas(): Observable<boolean> {
    return this.myApiService.getContresania(this.codigo).pipe(
      map((res) => {
        const tf = res.data.some((item: any) => {
          this.personaService.setContraseniaDto(item);
          console.log(this.contrasena, "=", item.contraseniaPasada);
          console.log(this.contrasena == this.personaService.contraseniaDto.contraseniaPasada)
          return this.contrasena == this.personaService.contraseniaDto.contraseniaPasada;
        });
        console.log(tf);
        if (tf == false){
          this.personaService.userDto.contrasenaUsuario = this.contrasena;
          this.personaService.contraseniaDto.codigoUsuario = this.personaService.userDto.codigoUsuario;
          this.personaService.contraseniaDto.contraseniaPasada = this.contrasena;
          this.personaService.contraseniaDto.codigoContrasenias = res.data.length + 1; 
          this.myApiService.insertarContrasenias(this.personaService.contraseniaDto).subscribe((res)=> {
            console.log(res);
          })
        }
        return tf;
      })
    );
  }
}  
