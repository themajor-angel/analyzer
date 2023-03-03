import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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
  usuarioID;
  data;
  products: any;
  
  constructor(
    private perfilService: PerfilService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>) { }
    cargos = ["Contable", "Empresario"];
    selected = 'Contable';

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.usuarioID = this.perfilService.getUsuario();
     this.getProductStock();
    this.data = "hola"
    this.selected = this.products.cargo;
  }
  async getProductStock() {
    let supplier = await this.perfilService.getSupplier('Arts and Crafts Supplier'); 
    this.products = await this.perfilService.getProductsFromSupplier();
  }

  onSubmit(form: NgForm){
    this.perfilService.actualizarUsuario({
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
