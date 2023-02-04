import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-indicador',
  templateUrl: './card-indicador.component.html',
  styleUrls: ['./card-indicador.component.css'],
})
export class CardIndicadorComponent implements OnInit {
  @Input('activo') activo = false;
  @Output('seleccionar') seleccionarEventEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClickCard(): void {
    this.seleccionarEventEmitter.emit();
  }
}
