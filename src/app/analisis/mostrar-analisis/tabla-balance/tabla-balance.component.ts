import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITipoSemaforo, TablaBalanceActivos, TablaBalanceYears } from './types';

@Component({
  selector: 'app-tabla-balance',
  templateUrl: './tabla-balance.component.html',
  styleUrls: ['./tabla-balance.component.css'],
})
export class TablaBalanceComponent implements OnInit {
  @Input() dataYears: TablaBalanceYears;
  @Input() dataActivos: TablaBalanceActivos;
  dataSource = new MatTableDataSource();
  get displayedColumns(): string[] {
    return [
      'nombre',
      ...this.dataYears.map(year => year.id),
      'variacionNeta',
      'variacionPorcentual'
    ];
  }

  constructor() {}

  ngOnInit(): void {
    this.rebuildDataSource();
  }

  getColorTailwindPorSemaforo(color: ITipoSemaforo) {
    switch(color) {
      case 'verde': return 'bg-teal-300';
      case 'amarillo': return 'bg-orange-300';
      case 'rojo': return 'bg-rose-300';
      default: return '';
    }
  }

  public rebuildDataSource(): void {
    this.dataSource.data = this.dataActivos.map(activo => {
      const fila: any = {...activo};
      this.displayedColumns.forEach(nombreColumna => {
        fila[nombreColumna] ||= activo.porAnio[nombreColumna];
      });
      fila.styles = activo.styles;
      return fila;
    })
  }
}
