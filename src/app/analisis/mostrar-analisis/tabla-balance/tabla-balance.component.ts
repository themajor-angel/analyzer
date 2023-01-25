import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TablaBalanceActivos, TablaBalanceYears } from './types';

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

  public rebuildDataSource(): void {
    this.dataSource.data = this.dataActivos.map(activo => {
      const fila: any = {};
      this.displayedColumns.forEach(nombreColumna => {
        fila[nombreColumna] = activo.porAnio[nombreColumna] || activo[nombreColumna];
      });
      fila.styles = activo.styles;
      return fila;
    })
  }
}
