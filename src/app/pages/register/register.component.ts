import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/register.model';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private registroService: RegisterService) { //instanciamos un fb
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  //Getter - computed
  get nombreInvalido(){ return this.forma.get('nombre').invalid && this.forma.get('nombre').touched }
  get correoInvalido(){ return this.forma.get('correo').invalid && this.forma.get('correo').touched }
  get apellidoInvalido(){ return this.forma.get('apellido').invalid && this.forma.get('apellido').touched }
  get telefonoInvalido(){ return this.forma.get('telefono').invalid && this.forma.get('telefono').touched }



  crearFormulario(){
    //asignamos el fb a nuestra forma
    this.forma = this.fb.group({
      nombre:   ['', [Validators.required, Validators.maxLength(50)] ],
      apellido: ['', [Validators.required, Validators.maxLength(50)] ],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('[0-9]*')] ],
    })
  }


  guardar(){
    if ( this.forma.invalid ){
      return Object.values( this.forma.controls ).forEach( control => control.markAllAsTouched());
    }

    const registro = new RegisterModel(this.forma.value);

    this.registroService.crearRegistro(registro)
      .subscribe(
        resp =>  this.handleCorrect(resp),
        err => {
          console.error(err);
          this.handleError();
        }
      );
  }



  handleCorrect(response){
    Swal.fire({
      title: 'Datos guardados corectamente',
      icon: 'success',
      html:
        `<p><b>Nombre Completo:</b> ${response.registro.nombre} ${response.registro.apellido}</p>
        <p><b>Teléfono:</b> ${response.registro.telefono}</p>
        <p><b>Correo:</b> ${response.registro.correo}</p>
        <p><b>Token:</b> ${response.token}</p>`,
      confirmButtonColor: '#A5DC86',
    });

    this.forma.reset();
  }


  handleError(){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'Correo duplicado o incorrecto!',
      confirmButtonColor: '#F27474',
    });

  }



}
