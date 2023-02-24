import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';
import { ComparacionIndicadoresService } from 'src/app/analisis/indicadores/comparacionIndicadores.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  //@Input() titulo = 'Analyzer';
  titulo  = 'Analyzer';
  constructor(
    private store: Store<fromRoot.State>, 
    private authService: AuthService,
    private comparacionIndicadores: ComparacionIndicadoresService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    
    this.comparacionIndicadores.tituloPrueba.subscribe(titulito => {
      this.titulo = titulito;
    })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnChanges(){
    //this.titulo = this.comparacionIndicadores.titulo$;
  }
}