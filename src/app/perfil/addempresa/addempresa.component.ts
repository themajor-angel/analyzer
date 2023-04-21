import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { CookieService } from 'ngx-cookie-service';
import { Empresa } from 'src/app/analisis/item.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-addempresa',
  templateUrl: './addempresa.component.html',
  styleUrls: ['./addempresa.component.css']
})
export class AddempresaComponent implements OnInit {
  //empresaN: Empresa = new Empresa();
  public id: any;
  public idE: any[] = [];
  constructor(
    private _perfilservice: PerfilService,
    private router: Router,
    private cookieService: CookieService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

 async onSubmit(form: NgForm){
    if (form.valid){
      const respuesta = await this._perfilservice.addEmpresa({
        ciudad: form.value.ciudad,
        id: null, 
        nit: form.value.nit,
        nombreEmpresa: form.value.nombreEmpresa,
        pais: form.value.pais,
        software: form.value.software
     });
     const nuevaRef = this.db.collection('empresas', ref => ref.where("nombreEmpresa", "==", form.value.nombreEmpresa))
     .snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          this.id = a.payload.doc.id; 
        });
          this._perfilservice.UpdateIDEmpresa(this.id);
      });
      this.db.collection('empresas', ref => ref.where("nombreEmpresa", "==", form.value.nombreEmpresa)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("NULO");
          } else {
            ss.docs.forEach(doc => {
              this.idE.push(doc.data());
            })
            this._perfilservice.asociarUsuarioEmpresa({id: null, id_empresa: this.idE[0].id, id_usuario: this._perfilservice.getIDUser()});
          }
        })
     form.reset();
    }
    
  }

 async agregarRegresar(form: NgForm){
  if (form.valid){
      const respuesta = await this._perfilservice.addEmpresa({
        ciudad: form.value.ciudad,
        id: null, 
        nit: form.value.nit,
        nombreEmpresa: form.value.nombreEmpresa,
        pais: form.value.pais,
        software: form.value.software
     });
     const nuevaRef = this.db.collection('empresas', ref => ref.where("nombreEmpresa", "==", form.value.nombreEmpresa))
     .snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          this.id = a.payload.doc.id; 
        });
          this._perfilservice.UpdateIDEmpresa(this.id);
      });
      this.db.collection('empresas', ref => ref.where("nombreEmpresa", "==", form.value.nombreEmpresa)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("NULO");
          } else {
            ss.docs.forEach(doc => {
              this.idE.push(doc.data());
            })
            this._perfilservice.asociarUsuarioEmpresa({id: null, id_empresa: this.idE[0].id, id_usuario: this._perfilservice.getIDUser()});
          }
        })
     form.reset(); 
    }
    this.router.navigate(['/perfil/verperfil'])
    
  } 

}
