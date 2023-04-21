import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { PerfilService } from '../perfil.service';
import { AnalisisService } from 'src/app/analisis/analisis.service';
import { AnalisisService2 } from 'src/app/analisis/analisis2.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})
export class AddusuarioComponent implements OnInit {
  public id: any;
  public idEmpresa: any;
  public idU: any[] = [];
  myArray: any[] = [];
  miEmpresa: any[] = [];
  EsEmpresa: any[] = [];
  maxDate = new Date();
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  
  constructor(
    private _perfilservice: PerfilService,
    private analisis_service: AnalisisService,
    private comparacion_service: AnalisisService2,
    private db: AngularFirestore,
    private router: Router,
    private guardarArchivo: GuardaArchivosService,
    private _formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  cargos = ["Contable", "Empresario"];

  ngOnInit(): void {
    this.db.collection('usuarios', ref => ref.where("id", "==", this._perfilservice.getIDUser())).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
          } else {
            ss.docs.forEach(doc => {
              this.myArray.push(doc.data());
              this.db.collection('usuario_empresa', ref => ref.where("id_usuario", "==", this.myArray[0].id)).get()
              .subscribe(ss => {
                if (ss.docs.length === 0) {
                 //console.log("No esta ese id");
               } else {
                 ss.docs.forEach(doc => {
                  this.miEmpresa.push(doc.data());
                 })
                 for(let i of this.miEmpresa){
                  this.db.collection('empresas', ref => ref.where("id", "==", i.id_empresa)).get()
                    .subscribe(ss => {
                      if (ss.docs.length === 0) {
                     } else {
                       ss.docs.forEach(doc => {
                        this.EsEmpresa.push(doc.data());
                       })
                    }
                    })
                 }
              }
              })
            })
          }}
        )

  }

  async onSubmit(form: NgForm){
    //console.log(form.value);
    //console.log(form.value.nombreEmpresa.id);
     
    if (form.valid){
      this.idEmpresa = form.value.nombreEmpresa.id;
      //console.log(this.idEmpresa);
      //this.id = 
      await this._perfilservice.registerUser({
        email: form.value.email,
        password: form.value.password
      })

      const respuesta = await this._perfilservice.addUsuarios({
        id: null,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        email: form.value.email,
        nitEmpresa: null,
        //nombreEmpresa: form.value.nombreEmpresa,
        cargo: form.value.cargo,
        ciudad: form.value.ciudad,
        pais: form.value.pais,
        telefono: form.value.telefono
     })
     // OBTENGO LA REFERENCIA DEL USUARIO
      this.db.collection('usuarios', ref => ref.where("nombre", "==", form.value.nombre)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("NULO");
          } else {
            ss.docs.forEach(doc => {
              this.id = doc.id
              // ACTUALIZO EL ID DEL USUARIO
              this._perfilservice.UpdateIDUsuario(this.id);
          // ACTUALIZO EL ENLACE
               this._perfilservice.asociarUsuarioEmpresa({id: null, id_empresa: this.idEmpresa, id_usuario: this.id});
              //console.log(doc.id)
            })
          }
        })
     
    }
    form.reset();
    
  }

  async agregaRegresa(form: NgForm){
     if (form.valid){
      this.idEmpresa = form.value.nombreEmpresa.id;
      //console.log(this.idEmpresa);
      //this.id = 
      await this._perfilservice.registerUser({
        email: form.value.email,
        password: form.value.password
      })

      const respuesta = await this._perfilservice.addUsuarios({
        id: null,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        email: form.value.email,
        nitEmpresa: null,
        //nombreEmpresa: form.value.nombreEmpresa,
        cargo: form.value.cargo,
        ciudad: form.value.ciudad,
        pais: form.value.pais,
        telefono: form.value.telefono
     })
     // OBTENGO LA REFERENCIA DEL USUARIO
      this.db.collection('usuarios', ref => ref.where("nombre", "==", form.value.nombre)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("NULO");
          } else {
            ss.docs.forEach(doc => {
              this.id = doc.id
              // ACTUALIZO EL ID DEL USUARIO
              this._perfilservice.UpdateIDUsuario(this.id);
          // ACTUALIZO EL ENLACE
               this._perfilservice.asociarUsuarioEmpresa({id: null, id_empresa: this.idEmpresa, id_usuario: this.id});
              //console.log(doc.id)
            })
          }
        })
     
    }
    form.reset();
    
    this.router.navigate(['/perfil/verperfil'])
  }

}
