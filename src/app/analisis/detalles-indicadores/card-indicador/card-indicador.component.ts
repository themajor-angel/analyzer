import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITipoSemaforo } from '../../mostrar-analisis/tabla-balance/types';

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
  @Input('colorComparacion') colorComparacion: ITipoSemaforo = "rojo";
  @Input('mensajeComparacion') mensajeComparacion = "_mensajeComparacion";
  @Input('descripcion') descripcion = "_descripcion";
  @Input('fechaNueva') fechaNueva = "";
  @Input('fechaAnterior') fechaAnterior = "";
  @Output('seleccionar') seleccionarEventEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClickCard(): void {
    this.seleccionarEventEmitter.emit();
  }

  get claseColorCara() {
    switch (this.colorComparacion) {
      case 'amarillo':
        return 'bg-orange-300'
      case 'verde':
        return 'bg-green-300'
      case 'rojo':
        return 'bg-red-400'
      default:
        return ''
    }
  }

  get iconoCara() {
    switch (this.colorComparacion) {
      case 'amarillo':
        return 'assets/svg/mdi_face-outline.svg'
      case 'verde':
        return 'assets/svg/mdi_face-outline.svg'
      case 'rojo':
        return 'assets/svg/mdi_face-sad-outline.svg'
      default:
        return 'assets/svg/mdi_face-outline.svg'
    }
  }
}
