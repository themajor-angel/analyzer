import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIservice } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
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

  }

  onSubmit(form: NgForm){
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
