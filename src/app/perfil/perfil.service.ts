import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../auth/auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { UIservice } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
import { map, Observable, of, switchMap, Subject, ReplaySubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Software, Usuario } from '../shared/usuario.model';
import { Empresa, UsuarioEmpresa } from '../analisis/item.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators'
//import {  } from '@angular/fire/firestore'
import { collection, addDoc } from 'firebase/firestore';

@Injectable()
export class PerfilService {
  private IDUser: any;
  private IDUserModificar: any;
  private IDEmp: any;
  cargoID: string;
  private user: Observable<any> | null = null;
  private empres: Observable<any> | null = null;
  private datosUsuario;
  private datosEmpresa;
  usuario;
  empresasID;
  usuarioID;
  correoID;
  id: string;
  id2: string;
  cargoUser: any;
  usuarioData: Usuario;
  empresas: Empresa;
  idEmpresas: any[] = [];
  idEmpresasAsoc: any[] = [];
  Empres: any[] = [];
  Asociados: any[] = [];
  usuar: any[] = [];
  IDs: any[] = [];
  ActEnlace: any[] = [];
  usuarioEmpresas: UsuarioEmpresa;
  tutorials: Observable<any[]>;
  empresasRef : AngularFirestoreCollection<Empresa>;
  tutorialsRef: AngularFirestoreCollection<Usuario>;
  userEmpresRef: AngularFirestoreCollection<UsuarioEmpresa>;
  docRef: AngularFirestoreCollection<any> = null;
  enlace: UsuarioEmpresa;
  private _refrescar$ = new Subject<void>();
  loggedIn$ = new ReplaySubject<boolean>(1);
  public cargo: any;
  public cont: Number;
  private seleccion : string = '';
  //private analizerCollection: CollectionReference<DocumentData>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private trainingService: TrainingService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>,
    private cokie: CookieService,
  ) {
    // eliminar todos los datos de empresas y usuario_empresa
    //this.eliminarTodasEmpresas("");
    // Observable de empresas, usuarios
    this.empresasRef = db.collection('empresas');
    this.tutorialsRef = db.collection('usuarios');
    this.userEmpresRef = db.collection('usuario_empresa');
  }

  //Nuevas funciones mejoradas

  SetSeleccionado(id: string){
     this.seleccion = id;
  }

  getSeleccionado(): string{
    return this.seleccion;
  }

  SetIDUser(id: string){
     this.IDUser = id;
  }

  getIDUser(): string{
    return this.IDUser;
  }

   SetIDUserModificar(id: string){
     this.IDUserModificar = id;
  }

  getIDUserModificar(): string{
    return this.IDUserModificar;
  }

  SetCargo(cargo: string){
     this.cargo = cargo;
  }

  getCargo(): string{
    return this.cargo;
  }

  SetIDEmp(id: string){
     this.IDEmp = id;
  }

  getIDEmp(): string{
    return this.IDEmp;
  }

  ObtenUsuario(idu: string): Observable<Usuario[]>{
    const usuarioRef = this.db.collection('usuarios', (ref) => ref.where('id', '==', idu));
    return usuarioRef.valueChanges() as Observable<Usuario[]>;
  }

  ObtenEmpresas(idu: string): any[]{
   this.Empres = [];
   this.idEmpresas = [];
    const usuarioEmpresaRef = this.db.collection('usuario_empresa', (ref) => ref.where('id_usuario', '==', idu));
    usuarioEmpresaRef.get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
          } else {
            ss.docs.forEach(doc => {
              this.idEmpresas.push(doc.data());
            })
            for (let i of this.idEmpresas){
               const empresasRef = this.db.collection('empresas', (ref) => ref.where("id", '==', i.id_empresa));
               empresasRef.get()
                 .subscribe(ss => {
                   if (ss.docs.length === 0) {
                   } else {
                     ss.docs.forEach(doc => {
                       this.Empres.push(doc.data());
                     })
                   }
                 })
             }
          }
        })
    return this.Empres;
  }

  ObtenAociados(idu: string){
   this.Asociados = [];
   this.idEmpresasAsoc = [];
   //console.log(idu)
    const usuarioEmpresaRef = this.db.collection('usuario_empresa', (ref) => ref.where('id_empresa', '==', idu));
    usuarioEmpresaRef.get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("No tiene relacion en usuario_empresa");
          } else {
            ss.docs.forEach(doc => {
              this.idEmpresasAsoc.push(doc.data());
              //console.log(doc.data());
            })
            for (let i of this.idEmpresasAsoc){
               const empresasRef = this.db.collection('usuarios', (ref) => ref.where("id", '==', i.id_usuario));
               empresasRef.get()
                 .subscribe(ss => {
                   if (ss.docs.length === 0) {
                     console.log("No tiene empresa");
                   } else {
                     ss.docs.forEach(doc => {
                      //if()
                      //console.log(doc.id);
                       this.Asociados.push(doc.data());
                       //console.log(doc.data());
                     })
                   }
                 })
             }
          }
        })
    return this.Asociados;
  }

  deleteUsuario(idU: string): any{
    if(idU != this.getIDUser()){
      const usuarioRef = this.db.collection('usuarios', (ref) => ref.where('id', '==', idU));
    usuarioRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.id = a.payload.doc.id;
            if(this.id != null){
              this.db.collection('usuarios').doc(this.id).delete().then(res => {
                 console.log("Usuario eliminado.");
               })
               .catch(e => {
                   console.log(e);
               });
            }
          });
        });
        this.docRef = this.db.collection('usuario_empresa', ref => ref.where("id_usuario", "==", idU));
         this.docRef.snapshotChanges().forEach((changes) => {
           changes.map((a) => {
             this.id2 = a.payload.doc.id;
             if(this.id2 != null){
              this.db.collection('usuario_empresa').doc(this.id2).delete().then(res => {
                 console.log("Enlace eliminado.");
               })
               .catch(e => {
                   console.log(e);
               });
             }
           });
         });
    return true;
    }else{
      console.log("No puede eliminar este usuario");
    }
    
  }

  deleteEnlace(idE: string): any{
     if(idE != this.getIDUser()){
        this.docRef = this.db.collection('usuario_empresa', ref => ref.where("id_usuario", "==", idE));
         this.docRef.snapshotChanges().forEach((changes) => {
           changes.map((a) => {
             this.id2 = a.payload.doc.id;
             if(this.id2 != null){
              this.db.collection('usuario_empresa').doc(this.id2).delete().then(res => {
                 console.log("Enlace eliminado.");
               })
               .catch(e => {
                   console.log(e);
               });;
              //console.log(this.id2);
             }
           });
         });
        
     }else{
         
       console.log("No puede eliminar este enlace");
     }
  }

  deleteEmpresa(idE: string): Observable<Empresa[]>{
    this.empresasRef.doc(idE).delete();     
    this.userEmpresRef.doc(idE).delete()
    this.docRef = this.db.collection('empresas');
    
    return this.empresasRef.valueChanges() as Observable<Empresa[]>;
  }

  deleteE(id: string): Promise<void> {
    return this.empresasRef.doc(id).delete();
  }

  addUsuarios(usuario: Usuario) {
     const usuarioRef = this.db.collection('usuarios');
     //usuario.id = this.cokie.get('NewUserID');
     //console.log(usuario);
     usuarioRef.add(usuario).then(res => {
      console.log("Usuario agregado");
     }).catch(res => {
      console.log(res);
     });
     return this.tutorialsRef;
  }

  addEmpresa(empresa: Empresa) {
     const empresaRef = this.db.collection('empresas');
     empresaRef.add(empresa).then(res => {
      console.log("Empresa creada");
     }).catch(res => {console.log(res)});
     //return this.db.collection('empresas', ref => ref.where("nombreEmpresa", "==", empresa.nombreEmpresa));
     return this.empresasRef;
  }

  asociarUsuarioEmpresa(enlaceS: UsuarioEmpresa){
    //this.enlace.id_empresa = idE;
    //this.enlace.id_usuario = idU;
    this.db.collection('usuario_empresa').add(enlaceS).then(
      res => {
        console.log("Enlace establecido")
      }
    ).catch(error => {
      console.log(error)
    })    
        
  }

  UpdateIDEmpresa(idE){
    // Actualizo el id de la empresa
     this.db.collection('empresas')
      .doc(idE)
      .update({
        id: idE,
      });
  }

  UpdateIDUsuario(idU){
    // Actualizo el id de la empresa
     this.db.collection('usuarios')
      .doc(idU)
      .update({
        id: idU,
      }).then(res => { console.log("ID Usuario actualizado"); }).catch(res => {console.log(res)});
  }

  ObtenerSoftware(): Observable<Software[]>{
    const softwareRef = this.db.collection('sistema_contable');
    return softwareRef.valueChanges() as Observable<Software[]>;
  } 


  /// AQUI TERMINAN LAS MEJORADAS


  /*addUsuario(usuario: Usuario){
    const usuarioRef = collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario);
  }*/

  guardarUsuario(usuario: Usuario, empresa: Empresa, enlace: UsuarioEmpresa) {
    this.usuar = [];
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Aqui guardo los datos del nuevo usuario en la tabla usuarios
        this.datosUsuario = user;
        usuario.email = user.email;
        // AGREGO EL USUARIO
        this.addUsuarios(usuario);
        // OBTENGO LA REFERENCIA DEL USUARIO
        //console.log(user.email);
      this.db.collection('usuarios', ref => ref.where("email", "==", user.email)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("NULO user");
          } else {
            ss.docs.forEach(doc => {
              this.id = doc.id
              // ACTUALIZO EL ID DEL USUARIO
              this.UpdateIDUsuario(this.id);
              //CREO LA EMPRESA
              this.addEmpresa(empresa);
              // OBTENGO LA REFERENCIA DE LA EMPRESA
      this.db.collection('empresas', ref => ref.where("nombreEmpresa", "==", empresa.nombreEmpresa)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log("NULO");
          } else {
            ss.docs.forEach(doc => {
              // ACTUALIZO EL ID DEL USUARIO
              this.UpdateIDEmpresa(doc.id);
          // ACTUALIZO EL ENLACE
               this.asociarUsuarioEmpresa({id: null, id_empresa: doc.id, id_usuario: this.id});
              //console.log(doc.id)
            })
          }
        })
            })
          }
        })
        return user;
      } else {
        return null;
      }
    });
    
    this.router.navigate(['/auth/verification']);
  }

  guardarEmpresaUsuario(em: Empresa) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.datosEmpresa = user;
        em.id = this.datosEmpresa.uid;
        this.db.collection('usuario_empresa').doc(this.datosUsuario.uid).set(em);
        this.router.navigate(['/perfil/verperfil']);
        return user;
      } else {
        return null;
      }
    });
  }

  getUsuario() {
    return this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.usuarioID = user.uid;
        return this.usuarioID;
      } else {
        return null;
      }
    });
  }

  getEmpresas() {
    //this.empres = this.db.collection('empresas').valueChanges();
    //return this.empres;
    return new Promise<any>((resolve) => {
      this.db
        .collection('empresas', (ref) => ref.where('id', '==', ''))
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }

  getUserQuery() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('usuarios', (ref) => ref.where('id', '==', this.usuarioID))
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }

  getProductsFromSupplier() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('usuarios', (ref) =>
          ref.where('id', '==', this.usuarioID).limit(1)
        )
        .valueChanges()
        .subscribe((product) => resolve(product));
    });
  }

  getSupplier(name: string) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('Supplier', (ref) => ref.where('name', '==', name))
        .valueChanges()
        .subscribe((supplier) => resolve(supplier));
    });
  }

  updateUserFullName(_id: any, _firstName: string, _lastName: string) {
    this.db
      .doc(`User/${_id}`)
      .update({ firstName: _firstName, lastName: _lastName });
  }
  
  actualizarUsuario(usuario: Usuario) {
    //console.log(usuario.id)
    this.db
      .doc(`usuarios/${usuario.id}`)
      .update({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cargo: usuario.cargo,
        //nombreEmpresa: usuario.nombreEmpresa,
        nitEmpresa: usuario.nitEmpresa,
        pais: usuario.pais,
        ciudad: usuario.ciudad,
      });
      this.router.navigate(['/perfil/verperfil']);
      //this.db.doc(`usuario_empresa/${usuario.id}`).set({id_empresa: usuario.id, id_usuario: usuario.id});
  }

  actualizarEmpresa(empresa: Empresa) {
    this.docRef = this.db.collection('empresas', ref => ref.where("id", "==", this.getIDEmp()));
    this.docRef.snapshotChanges().forEach((changes) => {
     changes.map((a) => {
       this.id = a.payload.doc.id;
     });
   });
    this.db.collection('empresas')
      .doc(this.id)
      .update({
        ciudad: empresa.ciudad,
        id: this.getIDEmp(),
        nit: empresa.nit,
        nombreEmpresa: empresa.nombreEmpresa,
        pais: empresa.pais,
        software: empresa.software
      });
    this.router.navigate(['/perfil/verperfil']);
  }

  ObtenerUsuario(id){
    //console.log(id);
    this.db.collection('usuarios', ref => ref.where("email", "==", id)).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            //console.log("Vaciooo");
          } else {
            ss.docs.forEach(doc => {
              this.usuar.push(doc.data());
              //console.log(this.usuar)
              this.cokie.set('cargoID', this.usuar[0].cargo);
              //this.cokie.set('userIDlog', this.usuar[0].id);
              this.SetCargo(this.usuar[0].cargo);
              this.SetIDUser(this.usuar[0].id);
              if (this.usuar[0].cargo == 'Contable'){
                  //this.header.cargo = true;
                  this.router.navigate(['/analisis/cargadearchivos'])
               }else{
                 this.router.navigate(['/analisis/menu'])
               }
            })
          }}
        )
  }

  eliminarEmpresa(idE){
    if (confirm('Está seguro de eliminar esta empresa?')) {
        this.docRef = this.db.collection('empresas', ref => ref.where("id", "==", idE.id));
         this.docRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.id = a.payload.doc.id;
            console.log(this.id);
          });
        });
        this.docRef = this.db.collection('usuario_empresa', ref => ref.where("id_empresa", "==", idE.id));
         this.docRef.snapshotChanges().forEach((changes) => {
           changes.map((a) => {
             this.id2 = a.payload.doc.id;
           });
         });
        this.db.collection('empresas').doc(this.id).delete();
        this.db.collection('usuario_empresa').doc(this.id2).delete();
        this.router.navigate(['/perfil/verperfilcontable']);
        //location.reload();
    }
  }

  agregarEmpresa(empresa: Empresa){
    //Agrego la nueva empresa
    this.db.collection('empresas').add(empresa); 
    // Obtengo la referencia a esta nueva empresa
    this.docRef = this.db.collection('empresas', ref => ref.where("nit", "==", empresa.nit));
    this.docRef.snapshotChanges().forEach((changes) => {
     changes.map((a) => {
       this.id = a.payload.doc.id;
       this.ActEnlace.push(this.id);
       //console.log(this.id);
     });
   });
   //console.log(this.id);
   if(this.id == null){
    confirm("Verifique que los datos sean correctos");
   }
   else{
     // Actualizo el id de la empresa
     this.db.collection('empresas')
      .doc(this.id)
      .update({
        id: this.id,
      });
    // Agrego el enlace en la tabla usuario_empresa
    this.db.collection('usuario_empresa').add({id: null, id_empresa: this.id, id_usuario: this.getIDUser()});
    this.id = '';
    this.router.navigate(['/perfil/verperfilcontable']);
   }
  }

  enlazarUsuaEmpresa(nitE){
     // Obtengo la referencia a esta nueva empresa
    this.docRef = this.db.collection('empresas', ref => ref.where("nit", "==", nitE));
    this.docRef.snapshotChanges().forEach((changes) => {
     changes.map((a) => {
       this.id = a.payload.doc.id;
       //console.log(this.id);
     });
   });
   // Actualizo el id de la empresa
   this.db.collection('empresas')
      .doc(this.id)
      .update({
        id: this.id,
      });
    // Agrego el enlace en la tabla usuario_empresa
    this.db.collection('usuario_empresa').add({id: null, id_empresa: this.id, id_usuario: this.getIDUser()});
    this.router.navigate(['/perfil/verperfilcontable']);
    //location.reload();
  }

  eliminarTodasEmpresas(n: string){

    this.docRef = this.db.collection('empresas');
    this.docRef.snapshotChanges().forEach((changes) => {
     changes.map((a) => {
       this.id = a.payload.doc.id;
       this.docRef = this.db.collection('usuario_empresa');
    this.docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.id2 = a.payload.doc.id;
        this.db.collection('usuario_empresa').doc(this.id2).delete();
       });
      });
     });
     //this.db.collection('empresas').doc(this.id).delete();
    
   });
   this.router.navigate(['/perfil/verperfil']);
   
  }

  agregarUsuario(usuario: Usuario){
    // Agrego el usuario
     this.db.collection('usuarios').add(usuario);
     // Obtengo la referencia a esta nuevo usuario
    this.docRef = this.db.collection('usuarios', ref => ref.where("email", "==", usuario.email));
    this.docRef.snapshotChanges().forEach((changes) => {
     changes.map((a) => {
       this.id = a.payload.doc.id;
       // Actualizo el id del usuario
       this.db.collection('usuarios')
          .doc(this.id)
          .update({
            id: this.id,
          });
     });
   });
    this.id = '';
    this.id2 = '';
    this.router.navigate(['/perfil/verperfil']);
      //}
   //}
   
  }

  registerUser(authData: AuthData){
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth
        .createUserWithEmailAndPassword(
              authData.email, 
              authData.password)
       .then(result => {
            //this.uiService.loadingStateChanged.next(false);
            //this.cokie.set('NewUserID', result.user.uid);
            //this.UpdateIDUsuario(result.user.uid);
            this.store.dispatch(new UI.StopLoading());
            this.loggedIn$.next(true);
       })
       .catch(error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
       });

    }

}
