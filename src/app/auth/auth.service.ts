import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { UIservice } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Authe from './auth.actions'
import { map, Observable, of, ReplaySubject, Subject, switchMap } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { User } from "firebase/auth";
import { Usuario } from "../shared/usuario.model";
import { Empresa, UsuarioEmpresa } from "../analisis/item.model";
import { PerfilService } from "../perfil/perfil.service";
import { GuardaArchivosService } from "../analisis/guarda-archivos.service";
import { CookieService } from "ngx-cookie-service";
//import { signInWithPopup, GoogleAuthProvider, Auth  } from "@angular/fire/auth"

@Injectable()
export class AuthService{
    private user: Observable<any> | null = null;
    loggedIn$ = new ReplaySubject<boolean>(1);
    private datosUsuario;
    private datosEmpresa;
    usuario;
    usuarioID;
    cargo: string;
    public verificado: boolean;
    
    constructor(
        private router: Router, 
        public afAuth: AngularFireAuth,
        private fs: AngularFirestore, 
        private db: AngularFirestore,
        private trainingService: TrainingService,
        private uiService: UIservice,
        private store: Store<fromRoot.State>,
        private perfilServicio: PerfilService,
        private garchivo: GuardaArchivosService,
        private cookieService:CookieService,
        //private auten: Auth
        ){
        
    }

    initAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if(user && user.emailVerified){
                this.loggedIn$.next(true);
                this.store.dispatch(new Authe.SetAuthenticated());
                this.userInfo();
                
            } else {
                this.loggedIn$.next(false);
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new Authe.SetUnauthenticated());
                if(user){
                    this.EnviarVerificacionEmail();
                    this.router.navigate(['/auth/verification']);
                }
            }
        });
    }

    userInfo(){
        
        this.user = this.afAuth.authState.pipe(switchMap(user => {
            if (user === null || user === undefined) return of(null);
            console.log(this.fs.doc<User>(`users/${user.uid}`).valueChanges());
            return this.fs.doc<User>(`users/${user.uid}`).valueChanges();
          }));
    }

    registerUser(authData: AuthData){
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth
        .createUserWithEmailAndPassword(
              authData.email, 
              authData.password)
       .then(result => {
            //ENVIO MENSAJE DE VERIFICACION AL EMAIL
            //this.EnviarVerificacionEmail();
            //this.router.navigate(['/auth/verification']);
            this.EnviarVerificacionEmail();
            //this.router.navigate(['/auth/verification']);
            this.store.dispatch(new UI.StopLoading());
            this.loggedIn$.next(true);
          
       })
       .catch(error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
       });
       

    }

    login(authData: AuthData){
        //this.uiService.loadingStateChanged.next(true);
        //this.store.dispatch(new UI.StartLoading());
        this.afAuth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                
                //this.cookieService.set('userIDlog',result.user.uid);
                //this.usuarioID = result.user.uid;
                if(result.user.emailVerified){
                this.store.dispatch(new UI.StartLoading());
                this.store.dispatch(new UI.StopLoading());
                //this.perfilServicio.ObtenUsuario
                //this.perfilServicio.SetIDUser(result.user.uid);
                  this.perfilServicio.ObtenerUsuario(authData.email);
                  this.loggedIn$.next(true);
                } else{
                    this.EnviarVerificacionEmail();
                    this.router.navigate(['/auth/verification']);
                }
                 
           })
           .catch(error => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
           });
    }

    loginAnonimo(authData: AuthData){
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                //this.cookieService.set('userIDlog',result.user.uid);
                //this.usuarioID = result.user.uid;
                this.store.dispatch(new UI.StopLoading());
                //this.perfilServicio.ObtenUsuario
                //this.perfilServicio.SetIDUser(result.user.uid);
                //this.perfilServicio.ObtenerUsuario(authData.email);
                //this.loggedIn$.next(true);
                
                 
           })
           .catch(error => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
           });
    }

    /*loginGoogle(){
       return signInWithPopup(this.auten, new GoogleAuthProvider());
    }*/

    async EnviarVerificacionEmail(): Promise<void>{
        return (await this.afAuth.currentUser).sendEmailVerification();
    }

    logout(){
        this.afAuth.signOut();
        this.perfilServicio.SetIDEmp(null);
        this.perfilServicio.SetIDUser(null);
        this.loggedIn$.next(false);
    }

    
}