// my-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {

  constructor(private http: HttpClient) {}

  // Ejemplo de una solicitud GET
  getDatos(): Observable<any> {
    return this.http.get<any>(`https://localhost:5001/api/Persona/personas`);
  }

  getDatosPersona(codigo: string): Observable<any> {
    return this.http.get<any>(`https://localhost:5001/api/Persona/ObtenerPersona/${codigo}`);
  }

  // Ejemplo de una solicitud POST
  enviarDatos(datos: any): Observable<any> {
    return this.http.post<any>(``, datos);
  }
}
