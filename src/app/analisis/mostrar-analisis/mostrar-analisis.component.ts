import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';
import { TablaBalanceYears, TablaBalanceActivos } from './tabla-balance/types';

const balances = {
  balanceGeneral: [
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
      semaforoValor: 'verde',
      semaforoTexto: 'Aumentó con respecto al año pasado',
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
      semaforoValor: 'amarillo',
      semaforoTexto: 'Aumentó con respecto al año pasado',
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
      semaforoValor: 'rojo',
      semaforoTexto: 'Aumentó con respecto al año pasado',
    },
  ],
  estadoResultados: [
    {
      id: '4',
      nombre: 'Ingresos',
      variacionNeta: '42',
      variacionPorcentual: '104%',
      porAnio: {
        year2020: '100.000',
        year2021: '200.000',
      },
      styles: {
        nombre: 'bg-gradient-radial from-cyan-400 to-sky-400',
      },
      semaforoValor: 'verde',
      semaforoTexto: 'Aumentó con respecto al año pasado',
    },
    {
      id: '5',
      nombre: 'Gastos',
      variacionNeta: '64',
      variacionPorcentual: '64%',
      porAnio: {
        year2020: '10.200',
        year2021: '400.400',
      },
      styles: {
        nombre: 'bg-gradient-radial from-[#FCBDCA] to-[#FAA6BA]',
      },
      semaforoValor: 'amarillo',
      semaforoTexto: 'Aumentó con respecto al año pasado',
    },
    {
      id: '6',
      nombre: 'Costos',
      variacionNeta: '64',
      variacionPorcentual: '64%',
      porAnio: {
        year2020: '10.200',
        year2021: '400.400',
      },
      styles: {
        nombre: 'bg-gradient-radial from-[#5FEBBE] to-[#57D7C9]',
      },
      semaforoValor: 'rojo',
      semaforoTexto: 'Aumentó con respecto al año pasado',
    },
  ],
};

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
  dataActivos$: Observable<TablaBalanceActivos>;
  idPuc$: Observable<string>;

  constructor(
    private analisis_service: AnalisisService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idPuc$ = this.route.params.pipe(
      map((params) => params.idPuc as string)
    );
    this.dataActivos$ = this.idPuc$.pipe(
      map((idPuc) => balances[idPuc])
    );
    /*this.analisis = this.analisis_service.getAnalisis();
    this.estadoResultado = this.analisis_service.getEstadoResultado();
    if (!this.analisis || !this.estadoResultado) {
      this.router.navigateByUrl('/analisis/cargadearchivos');
    }*/
  }
}
