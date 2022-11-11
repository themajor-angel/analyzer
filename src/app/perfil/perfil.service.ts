import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "../auth/auth-data.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { UIservice } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from '../auth/auth.actions'
import { map, Observable, of, switchMap } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "firebase";
import { Usuario } from "../shared/usuario.model";

@Injectable()
export class PerfilService{
    private user: Observable<any> | null = null;
    private datosUsuario;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth,
        private db: AngularFirestore, 
        private trainingService: TrainingService,
        private uiService: UIservice,
        private store: Store<fromRoot.State>){
        
    }

    guardarUsuario(usuario: Usuario){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.datosUsuario = user;
                usuario.id = this.datosUsuario.uid;
                usuario.email = this.datosUsuario.email;
                console.log("datos ", usuario);
                this.db.collection('usuarios').add(usuario);
                this.router.navigate(['/verperfil']);
                return user;
            } else {
                return null;                
            }
        });
    }

}