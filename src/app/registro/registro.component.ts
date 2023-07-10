import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  registrar() {
    // Obtener los elementos del formulario
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const correoInput = document.getElementById('correo') as HTMLInputElement;
    const carreraInput = document.getElementById('carrera') as HTMLInputElement;
    const telefonoInput = document.getElementById(
      'telefono'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const password2Input = document.getElementById(
      'password2'
    ) as HTMLInputElement;

    // Verificar que los campos no estén vacíos
    if (
      nombreInput.value &&
      correoInput.value &&
      carreraInput.value &&
      telefonoInput.value &&
      passwordInput.value &&
      password2Input.value
    ) {
      // Verificar que las contraseñas coincidan
      if (passwordInput.value === password2Input.value) {
        // Registrar el usuario utilizando AngularFireAuth
        this.afAuth
          .createUserWithEmailAndPassword(
            correoInput.value,
            passwordInput.value
          )
          .then((userCredential) => {
            // Registro exitoso
            console.log('Registro exitoso', userCredential);
          })
          .catch((error) => {
            // Error en el registro
            console.log('Error en el registro', error);
          });
      } else {
        // Las contraseñas no coinciden
        console.log('Las contraseñas no coinciden');
      }
    } else {
      // Campos vacíos
      console.log('Por favor, completa todos los campos');
    }
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
      const formulario = document.getElementById(
        'formulario'
      ) as HTMLFormElement;
      const inputs = document.querySelectorAll('#formulario input');

      const expresiones: { [key: string]: RegExp } = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        carrera: /^[a-zA-Z\s]{1,50}$/,
        telefono: /^\d{1,10}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^.{4,12}$/, // 4 a 12 digitos.
      };

      interface Campos {
        [key: string]: boolean;
      }

      const campos: Campos = {
        nombre: false,
        carrera: false,
        telefono: false,
        correo: false,
        password: false,
      };

      const validarFormulario = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const campo = target.name;
        validarCampo(expresiones[campo], target, campo);
      };

      const validarCampo = (
        expresion: RegExp,
        input: HTMLInputElement,
        campo: string
      ) => {
        if (expresion.test(input.value)) {
          document
            .getElementById(`grupo__${campo}`)!
            .classList.remove('formulario__grupo-incorrecto');
          document
            .getElementById(`grupo__${campo}`)!
            .classList.add('formulario__grupo-correcto');
          document
            .querySelector(`#grupo__${campo} i`)!
            .classList.add('fa-check-circle');
          document
            .querySelector(`#grupo__${campo} i`)!
            .classList.remove('fa-times-circle');
          document
            .querySelector(`#grupo__${campo} .formulario__input-error`)!
            .classList.remove('formulario__input-error-activo');
          campos[campo] = true;
        } else {
          document
            .getElementById(`grupo__${campo}`)!
            .classList.add('formulario__grupo-incorrecto');
          document
            .getElementById(`grupo__${campo}`)!
            .classList.remove('formulario__grupo-correcto');
          document
            .querySelector(`#grupo__${campo} i`)!
            .classList.add('fa-times-circle');
          document
            .querySelector(`#grupo__${campo} i`)!
            .classList.remove('fa-check-circle');
          document
            .querySelector(`#grupo__${campo} .formulario__input-error`)!
            .classList.add('formulario__input-error-activo');
          campos[campo] = false;
        }
      };

      const validarPassword2 = () => {
        const inputPassword1 = document.getElementById(
          'password'
        ) as HTMLInputElement;
        const inputPassword2 = document.getElementById(
          'password2'
        ) as HTMLInputElement;

        if (inputPassword1.value !== inputPassword2.value) {
          document
            .getElementById(`grupo__password2`)!
            .classList.add('formulario__grupo-incorrecto');
          document
            .getElementById(`grupo__password2`)!
            .classList.remove('formulario__grupo-correcto');
          document
            .querySelector(`#grupo__password2 i`)!
            .classList.add('fa-times-circle');
          document
            .querySelector(`#grupo__password2 i`)!
            .classList.remove('fa-check-circle');
          document
            .querySelector(`#grupo__password2 .formulario__input-error`)!
            .classList.add('formulario__input-error-activo');
          campos['password'] = false;
        } else {
          document
            .getElementById(`grupo__password2`)!
            .classList.remove('formulario__grupo-incorrecto');
          document
            .getElementById(`grupo__password2`)!
            .classList.add('formulario__grupo-correcto');
          document
            .querySelector(`#grupo__password2 i`)!
            .classList.remove('fa-times-circle');
          document
            .querySelector(`#grupo__password2 i`)!
            .classList.add('fa-check-circle');
          document
            .querySelector(`#grupo__password2 .formulario__input-error`)!
            .classList.remove('formulario__input-error-activo');
          campos['password'] = true;
        }
      };

      const validarCamposVacios = () => {
        let camposVacios = false;

        inputs.forEach((input) => {
          if ((input as HTMLInputElement).value.trim() === '') {
            camposVacios = true;
            document
              .getElementById(`grupo__${(input as HTMLInputElement).name}`)!
              .classList.add('formulario__grupo-incorrecto');
          } else {
            document
              .getElementById(`grupo__${(input as HTMLInputElement).name}`)!
              .classList.remove('formulario__grupo-incorrecto');
          }
        });

        if (camposVacios) {
          alert('Por favor, completa todos los campos.');
        } 
      };

      inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
      });

      formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        validarCamposVacios();
      });
    });
  }
}
