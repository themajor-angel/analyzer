import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/usuario.model';
import { PerfilService } from '../perfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edita-asociados',
  templateUrl: './edita-asociados.component.html',
  styleUrls: ['./edita-asociados.component.css']
})
export class EditaAsociadosComponent implements OnInit {

  private coleccionUsuarios: AngularFirestoreCollection<Usuario>;
  ItemUser: Observable<Usuario[]>;
  usuario: any[] = [];

  constructor(
    private _perfilService: PerfilService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService
  ) { }

  ngOnInit(): void {
        this._perfilService.ObtenUsuario(this._perfilService.getIDUserModificar()).subscribe(u => {
          this.usuario = u;
        });
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this._perfilService.actualizarUsuario({
      id: this._perfilService.getIDUserModificar(), 
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
   // console.log("Yaaa");
    }
  }

}
