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
  // Ejemplo de una solicitud GET
  getDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personas`);
  }

  getDatosPersona(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerPersona/${codigo}`);
  }

  insertarPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertarPersona`,persona)
    .pipe(
      catchError(error => {
        // Aquí puedes manejar el error de la manera que desees
        console.log('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }
}
