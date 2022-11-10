import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIservice } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate = new Date();
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>) { }

  ngOnDestroy(): void {
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    /*this.loadingSubs = this.uiService.loadingStateChanged.subscribe( isLoading =>{
      this.isLoading = isLoading;
    })*/
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)

  }

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

}
