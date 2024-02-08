// my-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MyApiService {

  constructor(private http: HttpClient) {}

  apiUrl = 'https://localhost:5001/api/Persona'

  getDatos(codigoUser: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personas/${codigoUser}`);
  }

  getTotalPersonas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/TotalPersonas`);
  }

  getDatosPersona(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerPersona/${codigo}`);
  }

  insertarPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertarPersona`,persona)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  editarPersona(persona: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/editarPersona`,persona)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }
  
  eliminarPersona(codigo: string){
    return this.http.get<any>(`${this.apiUrl}/eliminarPersona/${codigo}`)
  }

  getUsers(){
    return this.http.get<any>(`${this.apiUrl}/ObtenerUsuarios`);
  }

  getUser(nombreUsuario: string, contrasenaUsuario: string){
    return this.http.get<any>(`${this.apiUrl}/ObtenerUsuario/${nombreUsuario}/${contrasenaUsuario}`)
  }

  getUserCodigo(codigoUsuario: number){
    return this.http.get<any>(`${this.apiUrl}/ObtenerUsuario/${codigoUsuario}`);
  }

  recuperarClave(codigoUsuario: number, nombreUsuario: string, correoUsuario: string){
    return this.http.get<any>(`${this.apiUrl}/RecuperarContraseña/${codigoUsuario}/${nombreUsuario}/${correoUsuario}`)
  }

  insertarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertarUsuario`,usuario)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  editarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/editarUsuario`,usuario)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  eliminarUsuario(codigoUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/eliminarUsuario/${codigoUsuario}`)
  }

  getHistorial(codigoUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerHistorial/${codigoUsuario}`)
  }

  getHistorialReciente(codigoHistorial: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerHistorialReciente/${codigoHistorial}`)
  }

  insertarHistorail(historial: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/InsertarHistorial`,historial)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    )
  }

  editarHistorial(historial: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/EditarHistorial`,historial)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    )
  }

  getContresania(codUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerContrasenias/${codUsuario}`);
  }

  insertarContrasenias(contrasenia: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/InsertarContrasenias`,contrasenia)
    .pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    )
  }
}
