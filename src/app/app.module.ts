import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';

import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { UIservice } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { PerfilModule } from './perfil/perfil.module';
import { PerfilService } from './perfil/perfil.service';
import { AnalisisModule } from './analisis/analisis.module'
import { ReadexcelDirective } from './directives/readexcel.directive';
import { ComparativeexcelDirective } from './directives/comparativeexcel.directive';
import { AnalisisService } from './analisis/analisis.service';
import { AnalisisService2 } from './analisis/analisis2.service';
import { MostrarAnalisisComponent } from './analisis/mostrar-analisis/mostrar-analisis.component';
import { IndicadoresComponent } from './analisis/indicadores/indicadores.component';
//Formularios
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
//import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
//import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    IndicadoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    ReactiveFormsModule,
    //RecaptchaV3Module
    //RecaptchaModule,
    //RecaptchaFormsModule,
  ],
  providers: [AuthService, TrainingService, UIservice, PerfilService, AnalisisService, AnalisisService2, CookieService,
    /*{
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },*/
  /*{
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: "6LfKNi0cAAAAACeYwFRY9_d_qjGhpiwYUo5gNW5-" } as RecaptchaSettings,
    }*/],
  bootstrap: [AppComponent],
})
export class AppModule { }
