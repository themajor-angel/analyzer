import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { UIservice } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions'
import { map, Observable, of, switchMap } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "firebase";

@Injectable()
export class AuthService{
    private user: Observable<any> | null = null;
    
    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth,
        private fs: AngularFirestore, 
        private trainingService: TrainingService,
        private uiService: UIservice,
        private store: Store<fromRoot.State>){
        
    }

    initAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.store.dispatch(new Auth.SetAuthenticated());
                //this.router.navigate(['/training']);
                this.userInfo();
               // console.log(user);
            } else {
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/login']);
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
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
       })
       .catch(error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
       });
    }

    login(authData: AuthData){
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                //this.uiService.loadingStateChanged.next(false);
           })
           .catch(error => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
           });
    }

    logout(){
        this.afAuth.signOut();
    }
}