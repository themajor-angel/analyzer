import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIservice } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { PerfilService } from 'src/app/perfil/perfil.service';
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
    private perfilService: PerfilService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>) { }

    cargos = ["Contable", "Empresario"];
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

    this.perfilService.guardarUsuario({
      id: null, 
      email: null,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      cargo: form.value.cargo,
      nombreEmpresa: form.value.nombreEmpresa,
      nitEmpresa: form.value.nitEmpresa,
      ciudad: form.value.ciudad,
      pais: form.value.pais
    })
  }

}
