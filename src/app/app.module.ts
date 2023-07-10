import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ListaDocentesComponent } from './lista-docentes/lista-docentes.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroTutoriasDocenteComponent } from './registro-tutorias-docente/registro-tutorias-docente.component';
import { RegistroTutoriasEstudianteComponent } from './registro-tutorias-estudiante/registro-tutorias-estudiante.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    ListaDocentesComponent,
    ListaMateriasComponent,
    NotificacionesComponent,
    RegistroComponent,
    RegistroTutoriasDocenteComponent,
    RegistroTutoriasEstudianteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
