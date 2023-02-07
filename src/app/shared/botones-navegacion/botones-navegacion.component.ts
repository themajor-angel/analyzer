import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-botones-navegacion',
  templateUrl: './botones-navegacion.component.html',
  styleUrls: ['./botones-navegacion.component.css']
})
export class BotonesNavegacionComponent implements OnInit {

  @Input('routerLinkAtras') routerLinkAtras = '..';
  @Input('mostrarBotonIndicadores') mostrarBotonIndicadores = false;

  constructor() { }

  ngOnInit(): void {
  }

}
