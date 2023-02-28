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
import { map, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../shared/usuario.model';

@Injectable()
export class PerfilService {
  private user: Observable<any> | null = null;
  private datosUsuario;
  usuario;
  usuarioID;
  usuarioData: Usuario;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private trainingService: TrainingService,
    private uiService: UIservice,
    private store: Store<fromRoot.State>
  ) {}

  guardarUsuario(usuario: Usuario) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.datosUsuario = user;
        usuario.id = this.datosUsuario.uid;
        usuario.email = this.datosUsuario.email;
        console.log('datos ', usuario);
        this.db.collection('usuarios').doc(this.datosUsuario.uid).set(usuario);
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
    usuario.id = this.usuarioID;
    this.db
      .doc(`usuarios/${usuario.id}`)
      .update({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cargo: usuario.cargo,
        nombreEmpresa: usuario.nombreEmpresa,
        nitEmpresa: usuario.nitEmpresa,
        pais: usuario.pais,
        ciudad: usuario.ciudad,
      });
    this.router.navigate(['/perfil/verperfil']);
  }
}
