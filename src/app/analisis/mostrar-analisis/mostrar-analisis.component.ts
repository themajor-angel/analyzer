import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';
import { TablaBalanceYears, TablaBalanceActivos } from './tabla-balance/types';

@Component({
  selector: 'app-mostrar-analisis',
  templateUrl: './mostrar-analisis.component.html',
  styleUrls: ['./mostrar-analisis.component.css'],
})
export class MostrarAnalisisComponent implements OnInit {
  @Input() analisis = {} as any;
  @Input() estadoResultado = {} as any;
  dataYears: TablaBalanceYears = [
    { id: 'year2020', nombre: 'Año 2020' },
    { id: 'year2021', nombre: 'Año 2021' },
  ];
  dataActivos: TablaBalanceActivos = [
    {
      id: '1',
      nombre: 'Activos',
      variacionNeta: '42',
      variacionPorcentual: '104%',
      porAnio: {
        year2020: '100.000',
        year2021: '200.000',
      },
      styles: {
        nombre: 'bg-gradient-radial from-cyan-400 to-sky-400',
      },
    },
    {
      id: '2',
      nombre: 'Pasivos',
      variacionNeta: '64',
      variacionPorcentual: '64%',
      porAnio: {
        year2020: '10.200',
        year2021: '400.400',
      },
      styles: {
        nombre: 'bg-gradient-radial from-[#FCBDCA] to-[#FAA6BA]',
      },
    },
    {
      id: '3',
      nombre: 'Patrimonio',
      variacionNeta: '64',
      variacionPorcentual: '64%',
      porAnio: {
        year2020: '10.200',
        year2021: '400.400',
      },
      styles: {
        nombre: 'bg-gradient-radial from-[#5FEBBE] to-[#57D7C9]',
      },
    },
  ];

  constructor(
    private analisis_service: AnalisisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*this.analisis = this.analisis_service.getAnalisis();
    this.estadoResultado = this.analisis_service.getEstadoResultado();
    if (!this.analisis || !this.estadoResultado) {
      this.router.navigateByUrl('/analisis/cargadearchivos');
    }*/
  }
}
