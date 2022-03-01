import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = 'http://localhost:8000/api'

  constructor( private http: HttpClient) { }


  crearRegistro(registro: RegisterModel){
    // return registro;
    return this.http.post(`${this.url}/register`, registro)
      .pipe(resp => resp);
  }

}
