import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, shareReplay, switchMap, } from 'rxjs';
import { DiccionarioService } from 'src/app/shared/services/diccionario.service';
import { IDatoPuc, IValorPuc, IWrapperPuc, } from 'src/app/shared/services/types/diccionario.types';
import { AnalisisService } from '../analisis.service';
import { ComparacionIndicadoresService } from '../indicadores/comparacionIndicadores.service';
import { TablaBalanceYears, TablaBalanceActivos, IFilaBalanceActivos, } from './tabla-balance/types';
import { registerLocaleData } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO'
import { calcularVariacionPorcentual } from 'src/app/utils';
registerLocaleData(localeCO);

@Component({
  selector: 'app-mostrar-analisis',
  templateUrl: './mostrar-analisis.component.html',
  styleUrls: ['./mostrar-analisis.component.css'],
})
export class MostrarAnalisisComponent implements OnInit {
  @Input() analisis = {} as any;
  @Input() estadoResultado = {} as any;
  dataActivos$: Observable<TablaBalanceActivos>;
  dataClaseActual$: Observable<IWrapperPuc>;
  dataClaseActual: IWrapperPuc;
  idPuc$: Observable<string>;
  idPuc: string = null;

  constructor(
    private analisis_service: AnalisisService,
    private comparacionIndicadoresService: ComparacionIndicadoresService,
    private diccionarioService: DiccionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.setupIdPuc();
    this.setupDataClaseActual();
    this.setupDataTabla();
    /*this.analisis = this.analisis_service.getAnalisis();
    this.estadoResultado = this.analisis_service.getEstadoResultado();
    if (!this.analisis || !this.estadoResultado) {
      this.router.navigateByUrl('/analisis/cargadearchivos');
    }*/
  }

  setupIdPuc(): void {
    this.idPuc$ = this.route.params.pipe(
      map((params) => params.idPuc as string),
      shareReplay(1)
    );
    this.idPuc$.subscribe((idPuc) => (this.idPuc = idPuc));
  }

  setupDataTabla(): void {
    this.dataActivos$ = this.idPuc$.pipe(
      switchMap((idPuc) =>
        this.diccionarioService
          .consultarListaClasesHijasPuc(idPuc)
          .pipe(catchError((err) => of([] as IDatoPuc[])))
      ),
      map((codigos) => codigos.map((cod) => this.mapCodigoPucAWrapperPuc(cod))),
      map((datosPuc) => this.ordenarClasesPuc(datosPuc)),
      map((datosPuc) => datosPuc.filter(datoPuc => datoPuc.valorPuc.valorDatos1 || datoPuc.valorPuc.valorDatos2)),
      map((datosPuc) => this.agregarSumaTotal(datosPuc)),
      map((datosPuc) => datosPuc.map((datoPuc) => this.mapWrapperPucAFilaTabla(datoPuc))),
      shareReplay(1)
    );
  }

  setupDataClaseActual(): void {
    this.dataClaseActual$ = this.idPuc$.pipe(
      switchMap((idPuc) =>
        this.diccionarioService
          .consultarClasePuc(idPuc)
          .pipe(catchError((err) => of(null)))
      ),
      map(dataPuc => this.mapCodigoPucAWrapperPuc(dataPuc)),
      shareReplay(1),
    );
    this.dataClaseActual$.subscribe(claseActual => this.dataClaseActual = claseActual);
  }

  ordenarClasesPuc(datosPuc: IWrapperPuc[]) {
    /** No ordenar si las tablas mostradas son la principal de balance o la principal de estado de resultados */
    if (datosPuc[0]?.codigoPuc?.Codigo?.toString()?.length === 1) {return [...datosPuc]}
    return [...datosPuc].sort((a, b) => {
      return b.valorPuc.valorDatos1 - a.valorPuc.valorDatos1
    })
  }

  agregarSumaTotal(datosPuc: IWrapperPuc[]) {
    if (this.idPuc !== 'estadoResultados') { return [...datosPuc] }
    const datoSuma: IWrapperPuc = {
      codigoPuc: {
        Codigo: this.idPuc as any,
        Padre: null,
        Nombre: 'Su empresa ganó:',
        Clasificacion: '',
        Descripcion: '',
      },
      valorPuc: {
        colorSemaforo: 'rojo',
        valorDatos1: 0,
        valorDatos2: 0,
        variacionNeta: 0,
        variacionPorcentual: 0
      }
    }
    datosPuc.forEach(datoPuc => {
      let signoDato = 1
      const codigoPuc = datoPuc.codigoPuc.Codigo;
      if (codigoPuc === 5 || codigoPuc === 6 || codigoPuc === 7) { signoDato = -1; }
      datoSuma.valorPuc.valorDatos1 += datoPuc.valorPuc.valorDatos1 * signoDato;
      datoSuma.valorPuc.valorDatos2 += datoPuc.valorPuc.valorDatos2 * signoDato;
    })
    const resultadoEsPositivo = datoSuma.valorPuc.valorDatos1 >= 0;
    datoSuma.valorPuc.variacionNeta = datoSuma.valorPuc.valorDatos1 - datoSuma.valorPuc.valorDatos2;
    datoSuma.valorPuc.variacionPorcentual = calcularVariacionPorcentual(datoSuma.valorPuc.valorDatos1, datoSuma.valorPuc.valorDatos2);
    datoSuma.valorPuc.colorSemaforo = this.comparacionIndicadoresService.obtenerSemaforoPuc('estadoResultados');
    datoSuma.codigoPuc.Nombre = resultadoEsPositivo ? 'Su empresa ganó:' : 'Su empresa perdió:'
    return [...datosPuc, datoSuma];
  }

  obtenerEstiloPorId(idCodigo: string, valorNuevo: number = 0) {
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
    if (idCodigo === 'estadoResultados') {
      if (valorNuevo >= 0) {
        (estiloInicial = 'from-cyan-400'), (estiloFinal = 'to-sky-400');
      } else {
        (estiloInicial = 'from-[#FCBDCA]'), (estiloFinal = 'to-[#FAA6BA]');
      }
    }
    return `bg-gradient-radial ${estiloInicial} ${estiloFinal}`;
  }

  formatearDinero(cantidad: string | number) {
    return this.currencyPipe.transform((Number(cantidad) / 1000).toString(), '$', 'symbol', '1.2-2', 'es-CO');
  }

  mapCodigoPucAWrapperPuc(datoPuc: IDatoPuc): IWrapperPuc {
    const id = datoPuc?.Codigo?.toString() || '';
    const valorDatos1 = this.comparacionIndicadoresService.getValorExcel1(id);
    const valorDatos2 = this.comparacionIndicadoresService.getValorExcel2(id);
    const colorSemaforo =
      this.comparacionIndicadoresService.obtenerSemaforoPuc(id);
    let variacionNeta =
      this.comparacionIndicadoresService.getVariacionNetaPuc(id);
    let variacionPorcentual =
      this.comparacionIndicadoresService.getVariacionPorcentualPuc(id);
    return {
      codigoPuc: datoPuc,
      valorPuc: {
        valorDatos1,
        valorDatos2,
        colorSemaforo,
        variacionNeta,
        variacionPorcentual,
      } as IValorPuc,
    };
  }

  mapWrapperPucAFilaTabla({
    codigoPuc,
    valorPuc,
  }: IWrapperPuc): IFilaBalanceActivos {
    const { Codigo, Nombre, Descripcion } = codigoPuc || {};
    let {
      valorDatos1,
      valorDatos2,
      variacionNeta,
      variacionPorcentual,
      colorSemaforo,
    } = valorPuc || {};
    const anioNuevo = this.comparacionIndicadoresService.getFechasNuevo()[3];
    const anioAnterior = this.comparacionIndicadoresService.getFechasAnterior()[3];
    const nombreFila = Codigo.toString() === 'estadoResultados' ? Nombre : `${Nombre} (Cod ${Codigo.toString()})`
    const textoSemaforo = Codigo.toString() === 'estadoResultados' ? 'Este valor es un porcentaje de aumento absoluto' : null;
    const resultCodigo: IFilaBalanceActivos = {
      id: Codigo.toString(),
      nombre: nombreFila,
      descripcion: Descripcion,
      porAnio: {
        [`year${anioNuevo}`]: this.formatearDinero(valorDatos1),
        [`year${anioAnterior}`]: this.formatearDinero(valorDatos2),
      },
      variacionNeta: this.formatearDinero(variacionNeta),
      variacionPorcentual: isNaN(variacionPorcentual)
        ? '-'
        : `${variacionPorcentual.toFixed(2)} %`,
      semaforoTexto: textoSemaforo,
      semaforoValor: colorSemaforo,
      styles: {
        nombre: this.obtenerEstiloPorId(Codigo.toString(), valorDatos1),
      },
    };
    return resultCodigo;
  }

  get linkBotonAtras() {
    const idPadre = this?.dataClaseActual?.codigoPuc?.Padre;
    if (idPadre) {
      return `/analisis/mostraranalisis/${idPadre}`;
    }
    const id = this.idPuc;
    if (id !== null && id !== undefined) {
      if (isNaN(Number(id))) {
        return '/analisis/menu';
      } else if (['1', '2', '3'].includes(id)) {
        return '/analisis/mostraranalisis/balanceGeneral';
      } else if (['4', '5', '6'].includes(id)) {
        return '/analisis/mostraranalisis/estadoResultados';
      } else if (id.length === 2) {
        return `/analisis/mostraranalisis/${id.slice(0, 1)}`;
      } else if (id.length === 4) {
        return `/analisis/mostraranalisis/${id.slice(0, 2)}`;
      } else if (id.length === 6) {
        return `/analisis/mostraranalisis/${id.slice(0, 4)}`;
      } else if (id.length === 8) {
        return `/analisis/mostraranalisis/${id.slice(0, 6)}`;
      } else if (id.length === 10) {
        return `/analisis/mostraranalisis/${id.slice(0, 8)}`;
      } else if (id.length === 12) {
        return `/analisis/mostraranalisis/${id.slice(0, 10)}`;
      } else return '.';
    } else return '.';
  }

  get anioNuevo(): number {
    return this.comparacionIndicadoresService.getFechasNuevo()?.[3];
  }

  get dataYears1(): TablaBalanceYears {
    const fechasNuevo = this.comparacionIndicadoresService.getFechasNuevo();
    const fechasAnterior = this.comparacionIndicadoresService.getFechasAnterior();
    if (!fechasNuevo?.length || !fechasAnterior?.length) { return []; }
    const anioNuevo = Number(fechasNuevo[3]);
    const anioAnterior = Number(fechasAnterior[3]);
    return [{
      id: `year${anioAnterior}`,
      nombre: `Año ${anioAnterior} (en miles)`,
      valor: anioAnterior
    }, {
      id: `year${anioNuevo}`,
      nombre: `Año ${anioNuevo} (en miles)`,
      valor: anioNuevo
    },]
  }

  get titulos() {
    const titulosBalance = {
      titulo: '¿Cuánto tiene y cuánto debe su empresa?',
      subtitulo: `Balance general a ${this.anioNuevo}`
    };
    const titulosEstadoResultados = {
      titulo: '¡Así va el desempeño de su empresa!',
      subtitulo: `Estado de resultados a ${this.anioNuevo}`
    };
    const idPuc = this.idPuc
    if (!idPuc) return null;
    if (idPuc === 'balanceGeneral') { return titulosBalance; }
    if (['1','2','3'].includes(idPuc.toString().slice(0,1))) { return titulosBalance; }
    if (idPuc === 'estadoResultados') { return titulosEstadoResultados; }
    if (['4','5','6'].includes(idPuc.toString().slice(0,1))) { return titulosEstadoResultados; }
    return null;
  }
}
