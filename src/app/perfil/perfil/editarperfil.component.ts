import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIservice } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { PerfilService } from '../perfil.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  datos : any;
  
  constructor(
    private perfilService: PerfilService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>,
    private router: Router,
    private cokie: CookieService) { }
    cargos = ["Contable", "Empresario"];
    selected = 'Contable';

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.perfilService.ObtenUsuario(this.perfilService.getIDUser()).subscribe(u => {
      this.datos = u;
      //console.log(u);
    })
    //this.usuarioID = this.perfilService.getUsuario();
    // this.getProductStock();
    //this.data = "hola"
    //this.selected = this.products.cargo;
  }
  async getProductStock() {
    let supplier = await this.perfilService.getSupplier('Arts and Crafts Supplier'); 
    this.products = await this.perfilService.getProductsFromSupplier();
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.perfilService.actualizarUsuario({
      id: this.perfilService.getIDUserModificar(), 
      email: null,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      cargo: form.value.cargo,
      //nombreEmpresa: null,
      nitEmpresa: null,
      ciudad: null,
      pais: null,
      telefono: form.value.telefono
    })
    //console.log("Yaaa");
    }
  }

}
