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
import { map, Observable, of, switchMap, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../shared/usuario.model';
import { Empresa, UsuarioEmpresa } from './item.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoginComponent } from '../auth/login/login.component';
import { VerPerfilComponent } from '../perfil/verperfil/verperfil/verperfil.component';
import { PerfilService } from '../perfil/perfil.service';
import { CookieService } from 'ngx-cookie-service';

export interface Empresas{ name: string; }
export interface Usuarios{ nombreEmpresa: string; }
@Injectable({
  providedIn: 'root'
})

export class GuardaArchivosService {
  //private user_empresa: Observable<any> | null = null;
  private coleccionEmpresas: AngularFirestoreCollection<Empresa>;
  private coleccionUsuarios: AngularFirestoreCollection<Usuario>;
  private coleccionUsuariosEm: AngularFirestoreCollection<UsuarioEmpresa>;
  Items: Observable<Usuario[]>;
  ItemUser: Observable<Empresa[]>;
  ItemUserEmpresa: Observable<UsuarioEmpresa[]>;
  private datosUsuario;
  usuario: Usuario;
  correoID: any;
  IDusuario;
  IDEmpresa: any;
  ArregloDatosUsuarios: any[] = []
  cookie_name='';
  userData: Usuario[] = [];
  empresData: UsuarioEmpresa[] = [];
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private trainingService: TrainingService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>,
    private storage: AngularFireStorage,
    private perfilServicio: PerfilService,
    private cookieService: CookieService
    ) {
      //this.cookie_name = this.cookieService.get('userIDlog');
    }

  getEmpresasUser(id:string) {
      //Aqui consulto todos los ids de empresas q tiene ese usuario
      this.coleccionUsuariosEm = this.db.collection<UsuarioEmpresa>('usuario_empresa', (ref) => ref.where('id_usuario', '==', id));
      this.ItemUserEmpresa = this.coleccionUsuariosEm.valueChanges();
      this.ItemUserEmpresa.subscribe(items=>{
        this.empresData = items;
       });
      // Aqui obtengo los nombres de las empresas de ese usuario
      this.coleccionEmpresas = this.db.collection<Empresa>('empresas', (ref) => ref.where('id', '==', this.IDEmpresa));
      this.ItemUser = this.coleccionEmpresas.valueChanges();
      return this.ItemUser;
  }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

}
