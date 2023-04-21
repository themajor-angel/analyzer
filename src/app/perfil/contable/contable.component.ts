import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contable',
  templateUrl: './contable.component.html',
  styleUrls: ['./contable.component.css']
})
export class ContableComponent implements OnInit {
  usuarEmpres: any[] = [];
  empres: any[] = [];
  usuar: any[] = [];
  idusuario: any;

  constructor(
    private _perfilService: PerfilService,
    private afAuth: AngularFireAuth,
    private router: Router,
    //private firestore: Firestore,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
   // Devuelvo el usuario logueado
    this._perfilService.ObtenUsuario(this._perfilService.getIDUser()).subscribe(u => {
      this.usuar = u;
      //console.log(u);
    })
  }

  agregarUsuario(){
    this.router.navigate(['/perfil/addusuario'])
  }

  agregarEmpresa(){
    this.router.navigate(['/perfil/addempresa'])
  }

  submit(item){
    this._perfilService.SetIDUser(item.id);
    //this._perfilService.SetIDUserModificar(item.id);
    if(item.cargo == "Contable"){
        this.router.navigate(['/perfil/editarperfilcontable'])
      }else{
        this.router.navigate(['/perfil/editarperfil'])
      }
  }

}
