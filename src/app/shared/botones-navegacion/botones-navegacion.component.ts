import { Component, Input, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/perfil/perfil.service';

@Component({
  selector: 'app-botones-navegacion',
  templateUrl: './botones-navegacion.component.html',
  styleUrls: ['./botones-navegacion.component.css']
})
export class BotonesNavegacionComponent implements OnInit {

  @Input('routerLinkAtras') routerLinkAtras = '..';
  @Input('mostrarBotonIndicadores') mostrarBotonIndicadores = false;

  constructor(
    private _perfilService: PerfilService,
  ) { }

  ngOnInit(): void {
  }

  get isContable(){
    return this._perfilService.getCargo() == 'Contable';
  }

}
