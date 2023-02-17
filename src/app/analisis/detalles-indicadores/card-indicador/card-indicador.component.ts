import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-indicador',
  templateUrl: './card-indicador.component.html',
  styleUrls: ['./card-indicador.component.css'],
})
export class CardIndicadorComponent implements OnInit {
  @Input('activo') activo = false;
  @Input('nombre') nombre = "_nombre_";
  @Input('datoAnio1') datoAnio1 = "_año1";
  @Input('datoAnio2') datoAnio2 = "_año2";
  @Input('datoComparacion') datoComparacion = "_comparacion";
  @Input('mensajeComparacion') mensajeComparacion = "_mensajeComparacion";
  @Output('seleccionar') seleccionarEventEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClickCard(): void {
    this.seleccionarEventEmitter.emit();
  }
}
