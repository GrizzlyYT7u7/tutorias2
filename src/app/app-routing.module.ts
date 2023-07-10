import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ListaDocentesComponent } from './lista-docentes/lista-docentes.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroTutoriasDocenteComponent } from './registro-tutorias-docente/registro-tutorias-docente.component';
import { RegistroTutoriasEstudianteComponent } from './registro-tutorias-estudiante/registro-tutorias-estudiante.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },
  { path: 'docentes', component: ListaDocentesComponent },
  { path: 'materias', component: ListaMateriasComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tutorias_docente', component: RegistroTutoriasDocenteComponent },
  {
    path: 'tutorias_estudiante',
    component: RegistroTutoriasEstudianteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
