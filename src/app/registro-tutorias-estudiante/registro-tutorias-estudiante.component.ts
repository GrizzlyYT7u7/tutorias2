import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-tutorias-estudiante',
  templateUrl: './registro-tutorias-estudiante.component.html',
  styleUrls: ['./registro-tutorias-estudiante.component.css'],
})
export class RegistroTutoriasEstudianteComponent {}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario') as HTMLFormElement;
  const inputs = document.querySelectorAll(
    '#formulario input'
  ) as NodeListOf<HTMLInputElement>;

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    tema: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    hora: /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/,
  };

  const campos: { [key: string]: boolean } = {
    nombre: false,
    tema: false,
    hora: false,
  };

  const validarFormulario = (e: Event) => {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'nombre':
        validarCampo(expresiones.nombre, target, 'nombre');
        break;
      case 'tema':
        validarCampo(expresiones.tema, target, 'tema');
        break;
      case 'hora':
        validarCampo(expresiones.hora, target, 'hora');
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
      if (input.value.trim() === '') {
        camposVacios = true;
        document
          .getElementById(`grupo__${input.name}`)!
          .classList.add('formulario__grupo-incorrecto');
      } else {
        document
          .getElementById(`grupo__${input.name}`)!
          .classList.remove('formulario__grupo-incorrecto');
      }
    });

    if (camposVacios) {
      alert('Por favor, completa todos los campos.');
    } else {
      window.location.href = 'materias';
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
