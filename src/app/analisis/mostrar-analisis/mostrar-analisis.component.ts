import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { DiccionarioService } from 'src/app/shared/services/diccionario.service';
import { IDatoPuc } from 'src/app/shared/services/types/diccionario.types';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';
import { ComparacionIndicadoresService } from '../indicadores/comparacionIndicadores.service';
import {
  TablaBalanceYears,
  TablaBalanceActivos,
  IFilaBalanceActivos,
} from './tabla-balance/types';

const balances = {
  balanceGeneral: [
    {
      id: '1',
      nombre: 'Activos',
      variacionNeta: '42',
      variacionPorcentual: '104%',
      porAnio: {
        year2020: /*this.comparacionIndicadoresService.getVal('2020', '1')*/ 2000,
        year2021: '200.000',
      },
      styles: {
        nombre: 'bg-gradient-radial from-cyan-400 to-sky-400',
        variacionPorcentual: 'text-white bg-teal-300',
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
        variacionPorcentual: 'text-white bg-orange-300',
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
        variacionPorcentual: 'text-white bg-rose-300',
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

const codigosAMostrar: { [id: string]: string[] } = {
  balanceGeneral: ['1', '2', '3'],
  estadoResultados: ['4', '5', '6'],
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
    private comparacionIndicadoresService: ComparacionIndicadoresService,
    private diccionarioService: DiccionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
  ) {}

  ngOnInit(): void {
    this.setupIdPuc();
    this.setupDataTabla();
    /*this.analisis = this.analisis_service.getAnalisis();
    this.estadoResultado = this.analisis_service.getEstadoResultado();
    if (!this.analisis || !this.estadoResultado) {
      this.router.navigateByUrl('/analisis/cargadearchivos');
    }*/
  }

  setupIdPuc(): void {
    this.idPuc$ = this.route.params.pipe(
      map((params) => params.idPuc as string)
    );
  }

  obtenerEstiloPorId(idCodigo: string) {
    const primerNumero = idCodigo.slice(0, 1);
    let estiloInicial = 'from-cyan-400',
      estiloFinal = 'to-sky-400';
    switch (primerNumero) {
      case '1':
      case '4':
      case '7':
        break;
      case '2':
      case '5':
      case '8':
        (estiloInicial = 'from-[#FCBDCA]'), (estiloFinal = 'to-[#FAA6BA]');
        break;
      case '3':
      case '6':
      case '9':
        (estiloInicial = 'from-[#5FEBBE]'), (estiloFinal = 'to-[#57D7C9]');
        break;
      default:
        break;
    }
    return `bg-gradient-radial ${estiloInicial} ${estiloFinal}`;
  }

  formatearDinero(cantidad: string | number) {
    return this.currencyPipe.transform(cantidad, 'USD', 'symbol', '1.2-2')
  }

  mapDataPucAFilaTabla(datoPuc: IDatoPuc): IFilaBalanceActivos {
    const id = datoPuc?.Codigo?.toString() || '';
    const prop = `cod${id}`;
    const excel1 = this.comparacionIndicadoresService.temp1;
    const excel2 = this.comparacionIndicadoresService.temp2;
    const valorDatos1 =
      (excel1.codigosExtra[prop] ?? (excel1[prop] as number)) || 0;
    const valorDatos2 =
      (excel2.codigosExtra[prop] ?? (excel2[prop] as number)) || 0;
    const resultCodigo: IFilaBalanceActivos = {
      id,
      nombre: datoPuc?.Nombre || '',
      porAnio: {
        year2020: this.formatearDinero(valorDatos1.toString()),
        year2021: this.formatearDinero(valorDatos2.toString()),
      },
      variacionNeta: this.formatearDinero((valorDatos2 - valorDatos1).toString()),
      variacionPorcentual: `${
        ((valorDatos2 - valorDatos1) * 100) / valorDatos1
      } %`.toString(),
      semaforoTexto: 'Texto semaforo',
      semaforoValor: 'verde',
      styles: {
        nombre: this.obtenerEstiloPorId(id),
      },
    };
    return resultCodigo;
  }

  setupDataTabla(): void {
    this.dataActivos$ = this.idPuc$.pipe(
      switchMap((idPuc) =>
        this.diccionarioService.consultarListaClasesHijasPuc(idPuc)
      ),
      // map((idPuc) => codigosAMostrar[idPuc]),
      // switchMap((codigos) =>
      //   forkJoin(
      //     codigos.map((id) => this.diccionarioService.consultarClasePuc(id))
      //   )
      // ),
      map((codigos) => {
        return codigos.map((datoPuc) => this.mapDataPucAFilaTabla(datoPuc));
      })
    );
  }
}
