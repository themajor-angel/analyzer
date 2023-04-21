import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UIservice } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Router } from '@angular/router';
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
//import { ReCaptchaV3Service } from 'ng-recaptcha';
//import { RECAPTCHA_SETTINGS, RecaptchaModule  } from 'ng-recaptcha';
//import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  token: string|undefined;
  tokenVisible: boolean = false;
  reCAPTCHAToken: string = "";
  //correoID: string;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private router: Router,
    //private recaptchaV3Service: ReCaptchaV3Service
    //private guardaCorreo: GuardaArchivosService
  ) {
    this.token = undefined;
    
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
     this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
    
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    
    /*this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
            this.tokenVisible = true;
            this.reCAPTCHAToken = `Token [${token}] generated`;
        });*/
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }
  
  loginConGoogle(){
    //this.authService.loginGoogle().then(res => console.log(res)).catch(error => console.log(error));
  }
}