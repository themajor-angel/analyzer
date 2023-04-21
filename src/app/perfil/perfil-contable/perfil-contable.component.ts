import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/usuario.model';
import { PerfilService } from '../perfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { Empresa, UsuarioEmpresa } from 'src/app/analisis/item.model';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-perfil-contable',
  templateUrl: './perfil-contable.component.html',
  styleUrls: ['./perfil-contable.component.css']
})
export class PerfilContableComponent implements OnInit {
  private coleccionUsuarios: AngularFirestoreCollection<UsuarioEmpresa>;
  private coleccionEmpresas: AngularFirestoreCollection<Empresa>;
  private coleccionUser: AngularFirestoreCollection<Usuario>;
  ItemUser: Observable<UsuarioEmpresa[]>;
  ItemUsuario: Observable<Usuario[]>;
  ItemEmpresas: Observable<Empresa[]>;
  usuarEmpres: any[] = [];
  empres: any[] = [];
  usuar: any[] = [];
  idusuario: any;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(
    private _perfilService: PerfilService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.db.collection('usuarios', ref => ref.where("id", "==", this._perfilService.getIDUser())).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
          } else {
            ss.docs.forEach(doc => {
              this.usuar.push(doc.data());
            })
          }}
        )
        
        this.db.collection('usuario_empresa', ref => ref.where("id_usuario", "==", this._perfilService.getIDUser())).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
          } else {
            ss.docs.forEach(doc => {
              this.usuarEmpres.push(doc.data());
            })
            //console.log(this.usuarEmpres);
            for(let i of this.usuarEmpres){
             this.db.collection('empresas', ref => ref.where("id", "==", i.id_empresa)).get()
               .subscribe(ss => {
                 if (ss.docs.length === 0) {
                  this.empres = [];
                 } else {
                   ss.docs.forEach(doc => {
                     this.empres.push(doc.data());
                     //console.log(this.empres);
                   })
                 }
                }
               )
           }
          }
           
         }
        )
    
  }

  submit(){
    this.router.navigate(['/perfil/editarperfilcontable'])
  }

  modificar(ids: any){
    //console.log(ids.nombreEmpresa);
    this.cokie.set('empresaUPDATE',ids.nombreEmpresa);
    this.router.navigate(['/perfil/editarempresa'])
  }

  eliminarEmpresa(ids: any){
     //this.cokie.set('empresaUPDATE',ids.id);
     //console.log(ids.nombreEmpresa);
     this._perfilService.eliminarEmpresa(ids);
  }

  verAsociados(ids: any){
     this.cokie.set('empresaASOC',ids.id);
     //console.log(ids.nombreEmpresa);
     this.router.navigate(['/perfil/verAsociados'])
  }

  agregarEmpresa(){
    this.router.navigate(['/perfil/addempresa'])
  }

  agregarUsuario(){
    this.router.navigate(['/perfil/addusuario'])
  }

  Mensaje(ids: any){
    console.log(ids.nombreEmpresa);
    //this.cokie.set('empresaUPDATE',ids.nombreEmpresa);
    //this.router.navigate(['/perfil/editarempresa'])
  }

}
