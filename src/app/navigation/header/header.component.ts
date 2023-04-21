import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';
import { ComparacionIndicadoresService } from 'src/app/analisis/indicadores/comparacionIndicadores.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/shared/usuario.model';
import { CookieService } from 'ngx-cookie-service';
import { PerfilService } from 'src/app/perfil/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  cargo: Observable<boolean>;
  private coleccionUser: AngularFirestoreCollection<Usuario>;
  usuar: any[] = [];

  titulo  = 'Analyzer';
  constructor(
    private store: Store<fromRoot.State>, 
    private authService: AuthService,
    private comparacionIndicadores: ComparacionIndicadoresService,
    private db: AngularFirestore,
    private cokie: CookieService,
    private _perfilService: PerfilService,
    private router: Router) {
      
     }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    //console.log(this._perfilService.getCargo());
    if(this.cokie.get('cargoID') == "Contable"){
        this.cargo = this.isAuth$;
    }; 
      /*this.db.collection('usuarios', ref => ref.where("id", "==", this.cokie.get('userIDlog'))).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
          } else {
            ss.docs.forEach(doc => {
              this.usuar.push(doc.data());
              if(this.usuar[0].cargo == "Contable"){
                 this.cargo = true;
              };
            })
          }}
        )*/

    /*if(this._perfilService.getCargo() == "Contable"){
        this.cargo = true;
    };  */  
    this.comparacionIndicadores.tituloPrueba.subscribe(titulito => {
      this.titulo = titulito;
    })
  }

   obtenCargo(): Observable<boolean>{
    if(this.cokie.get('cargoID') == "Contable"){
        this.cargo = this.isAuth$;
    }; 
    return this.cargo;
  }

  acceso(){
    if (this._perfilService.getCargo() == 'Empresario'){
      this.router.navigate(['/analisis/menu'])
    }
  }

  estasLogueado(){
    if (this.authService.afAuth){

    }
  }

  onToggleSidenav() {
    //console.log(this._perfilService.getCargo());
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.cokie.delete('userIDlog');
    this.cokie.delete('cargoID');
    this._perfilService.SetCargo(null);
    this._perfilService.SetIDUser(null);
    this._perfilService.SetIDEmp(null);
    this.authService.logout();
  }
}