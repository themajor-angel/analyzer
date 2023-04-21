import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';
import { Empresa } from 'src/app/analisis/item.model';

@Component({
  selector: 'app-datos-contable',
  templateUrl: './datos-contable.component.html',
  styleUrls: ['./datos-contable.component.css']
})
export class DatosContableComponent implements OnInit {
  usuarEmpres: any[] = [];
  listEmpresas: any[] = [];
  usuar: any[] = [];
  nombreUsuar: any[] = [];
  idusuario: any;
  usuarAsociados: any[] = [];
  @Input() InputEmpresa?: Empresa;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  constructor(private _perfilService: PerfilService,
    private afAuth: AngularFireAuth,
    private router: Router,
    //private firestore: Firestore,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService,
    ) { }

  ngOnInit(): void {
     this.listEmpresas = [];
     this.usuarAsociados = [];
     this.usuarAsociados = this._perfilService.ObtenAociados(this._perfilService.getSeleccionado());
    this.listEmpresas = this._perfilService.ObtenEmpresas(this._perfilService.getIDUser());
  }

  ngOnChanges(): void {
    
  }

 async verAsociados(id){
     this.listEmpresas = [];
     this.usuarAsociados = [];
     //this.cokie.set('empresaASOC', id.id);
     this._perfilService.SetSeleccionado(id.id);
     this.usuarAsociados = this._perfilService.ObtenAociados(this._perfilService.getSeleccionado());
     this.listEmpresas =  this._perfilService.ObtenEmpresas(this._perfilService.getIDUser());
     //this.router.navigate(['/perfil/verperfil'])
  }

  isSeleccionado(ite): boolean{
    if(ite.id == this._perfilService.getSeleccionado()){
       return true;
    }else{
      return false;
    }
  }

  async eliminarEmpresa(id){
    this.listEmpresas = [];
    //console.log(id.id);
    const respuesta = await this._perfilService.deleteEmpresa(id.id).subscribe();
    this.listEmpresas = this._perfilService.ObtenEmpresas(this._perfilService.getIDUser());
   // console.log(respuesta);
  }

  async seleccionado(selec){
    //console.log(selec.id);
    this.listEmpresas = [];
    this.usuarAsociados = [];
    this._perfilService.SetSeleccionado(selec.id);
    this.usuarAsociados = this._perfilService.ObtenAociados(this._perfilService.getSeleccionado());
     this.listEmpresas = await this._perfilService.ObtenEmpresas(this._perfilService.getIDUser());
     //this.router.navigate(['/perfil/verperfil'])
  }

  modificar(id){
     //console.log(id.id);
     this._perfilService.SetIDEmp(id.id);
     this.router.navigate(['/perfil/editarempresa'])
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
    this.listEmpresas = [];
    this.usuarAsociados = [];
    await this._perfilService.deleteUsuario(idE.id);
    this.usuarAsociados = this._perfilService.ObtenAociados(this._perfilService.getSeleccionado());
     this.listEmpresas = await this._perfilService.ObtenEmpresas(this._perfilService.getIDUser());
  }

  async borrarEnlace(idE){
    this.listEmpresas = [];
    this.usuarAsociados = [];
     await this._perfilService.deleteEnlace(idE.id);
     this.usuarAsociados = this._perfilService.ObtenAociados(this._perfilService.getSeleccionado());
     this.listEmpresas = await this._perfilService.ObtenEmpresas(this._perfilService.getIDUser());
  }

}
