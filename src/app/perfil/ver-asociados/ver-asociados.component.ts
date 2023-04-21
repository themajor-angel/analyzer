import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { EditarPerfilComponent } from '../perfil/editarperfil.component';

@Component({
  selector: 'app-ver-asociados',
  templateUrl: './ver-asociados.component.html',
  styleUrls: ['./ver-asociados.component.css']
})
export class VerAsociadosComponent implements OnInit {
  usuarAsociados: any[] = [];
  nombreUsuar: any[] = [];

  constructor(
    private _perfilService: PerfilService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService,
  ) { this.usuarAsociados = []; }

  ngOnInit(): void {
    
    //console.log(this._perfilService.getSeleccionado());
    this.usuarAsociados = this._perfilService.ObtenAociados(this._perfilService.getSeleccionado());
        
  }

  modificarUser(ide: any){
    //this.cokie.set('userIDlog',ide.id);
    this._perfilService.SetIDUserModificar(ide.id);
    this.db.collection('usuarios', ref => ref.where("id", "==", ide.id)).get()
    .subscribe(ss => {
      if (ss.docs.length === 0) {
            
      } else {
       ss.docs.forEach(doc => {    
         this.nombreUsuar.push(doc.data()) ;
         this.router.navigate(['/perfil/editarAsociados']);
         /*if(this.nombreUsuar[0].cargo == "Contable"){
          this.router.navigate(['/perfil/editaasociados']);
         }else{
           this.router.navigate(['/perfil/editarperfil']);
         }*/
         
       })
      }
    })
    
  }

  async eliminarEnlace(idE){
    //console.log();
    await this._perfilService.deleteUsuario(idE.id);
  }

  async borrarEnlace(idE){
     await this._perfilService.deleteEnlace(idE.id);
  }

   onSubmit(form: NgForm){
    this._perfilService.actualizarUsuario({
      id: null, 
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
    
  }

}
