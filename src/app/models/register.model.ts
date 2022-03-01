export class RegisterModel {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;


  constructor(registro: RegisterModel){
    this.nombre = registro.nombre;
    this.apellido = registro.apellido;
    this.correo = registro.correo;
    this.telefono = registro.telefono;
  }


}
