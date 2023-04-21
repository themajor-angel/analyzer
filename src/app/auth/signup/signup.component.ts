import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIservice } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { PerfilService } from 'src/app/perfil/perfil.service';
import { Store } from '@ngrx/store';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate = new Date();
  softwares : any[] = []; 
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>,
    private db: AngularFirestore) { }
    cargos = ["Contable", "Empresario"];
  ngOnDestroy(): void {
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    /*this.authService.loginAnonimo({
      email: 'pedro@gmail.com',
      password: '123456'
    })*/
    const softwareRef = this.db.collection('sistema_contable').valueChanges().subscribe( soft =>{
      this.softwares = soft;
    });
    /*this.loadingSubs = this.uiService.loadingStateChanged.subscribe( isLoading =>{
      this.isLoading = isLoading;
    })*/
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    
  }

  onSubmit(form: NgForm){
    /*const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};*/

//const auth = getAuth();

/*sendSignInLinkToEmail(auth, form.value.email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', form.value.email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  }); */

        /*// Confirm the link is a sign-in with email link.
const auth = getAuth();
if (isSignInWithEmailLink(auth, window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}*/

    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
    this.perfilService.guardarUsuario({
      id: null, 
      email: null,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      cargo: 'Contable',
      //nombreEmpresa: form.value.nombreEmpresa,
      nitEmpresa: form.value.nitEmpresa,
      ciudad: form.value.ciudad,
      pais: form.value.pais,
      telefono: form.value.telefono
    }, {id: null, ciudad: form.value.ciudad,nit: form.value.nitEmpresa,nombreEmpresa: form.value.nombreEmpresa,pais: form.value.pais,software: form.value.software.nombre}, {id: null, id_empresa: null, id_usuario: null})
  }

}
