import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { Empresa } from 'src/app/analisis/item.model';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-editarempresa',
  templateUrl: './editarempresa.component.html',
  styleUrls: ['./editarempresa.component.css']
})
export class EditarempresaComponent implements OnInit {
    private coleccionEmpresas: AngularFirestoreCollection<Empresa>;
    ItemEmpresas: Observable<Empresa[]>;
    empres: any[] = [];
    Modempres: any[] = [];
    IDEmpresa;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService,
    private _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    //console.log(this.cokie.get('empresaUPDATE'));
    console.log(this._perfilService.getIDEmp());
    this.db.collection('empresas', ref => ref.where("id", "==", this._perfilService.getIDEmp())).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            //console.log("Vaciooo");
          } else {
            ss.docs.forEach(doc => {
              this.empres.push(doc.data());
            })
          }}
        )
  }
    
  onSubmit(form: NgForm){
    this._perfilService.actualizarEmpresa({
    ciudad: form.value.ciudad,
    id: null, 
    nit: form.value.nit,
    nombreEmpresa: form.value.nombreEmpresa,
    pais: form.value.pais,
    software: form.value.software
  })
  form.reset();
 }

}
