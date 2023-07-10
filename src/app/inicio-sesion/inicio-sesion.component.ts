import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  email: any;
  password: any;
  error: any;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    const formulario = document.getElementById('formulario') as HTMLFormElement;
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      password: /^.{4,12}$/, // 4 a 12 digitos.
    };

    const campos: { [key: string]: boolean } = {
      correo: false,
      password: false,
    };

    const validarFormulario = (e: Event) => {
      const target = e.target as HTMLInputElement;
      switch (target.name) {
        case 'correo':
          validarCampo(expresiones.correo, target, 'correo');
          break;
        case 'password':
          validarCampo(expresiones.password, target, 'password');
          break;
      }
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

    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      validarCamposVacios();

      // Verificar si todos los campos están completos
      const todosCamposCompletos = Object.values(campos).every(
        (campo) => campo === true
      );

      if (todosCamposCompletos) {
        try {
          await this.signInWithEmailAndPassword();
          console.log('Inicio de sesión exitoso');

          // Realizar acciones adicionales después del inicio de sesión exitoso
        } catch (error) {
          console.log('Error al iniciar sesión', error);
          this.error = 'Credenciales inválidas'; // Mostrar el mensaje de error en la interfaz de usuario
        }
      }
    });
  }

  async signInWithEmailAndPassword() {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('Inicio de sesión exitoso', result);
      window.location.href = 'materias'
    } catch (error) {
      console.log('Error al iniciar sesión', error);
      throw error; // Relanzar el error para capturarlo en el evento 'submit'
    }
  }
}
