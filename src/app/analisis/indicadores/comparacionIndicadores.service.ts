import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IndicadoresHttpService } from 'src/app/shared/services/indicadores-http.service';
import { ReglasIndicadoresService } from 'src/app/shared/services/reglas-indicadores.service';
import { IIndicadorConValor, IValorIndicador } from 'src/app/shared/services/types/indicadores.types';
import { obtenerClaseMatrizPuc } from 'src/app/utils';
import { Item, Regla, ExcelInfo } from '../item.model';
import { ITipoSemaforo } from '../mostrar-analisis/tabla-balance/types';


@Injectable(
  {providedIn: 'root'}
)
export class ComparacionIndicadoresService {
  temp1 = new ExcelInfo()
  temp2 = new ExcelInfo()

  data1: Item[] = [];
  data2: Item[] = [];

  fecha1: [];
  fecha2: [];

  $margenNeto;
  $margenBruto;
  $rActivos;
  $rPatrimonio;
  $liquidezCorriente;
  $liquidezInmmediata;
  $liquidezTotal;
  $ratio;
  $endeudamientoTotal;
  $rotInventarios;
  $rotCobrar;
  $rotPagar;
  $rotActivos;
  $rotInventario;

  indicadores: IValorIndicador[] = [
    {
      prop: 'margenNeto',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'margenBruto',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'rActivos',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rPatrimonio',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'liquidezCorriente',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'liquidezInmmediata',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'liquidezTotal',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'ratio',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'endeudamientoTotal',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rotInventarios',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'rotCobrar',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rotPagar',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'rotActivos',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rotInventario',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
  ]
  reglas: Regla[] = []

  constructor(
    private _indicadoresHttpService: IndicadoresHttpService,
    private _reglasIndicadoresService: ReglasIndicadoresService,
  ) {}

  setVal1(data: Item[], fecha ) {
    this.data1 = data;
    this.fecha1 = fecha;
  }

  setVal2(data: Item[], fecha) {
    this.data2 = data;
    this.fecha2 = fecha;
    this.iniciar()
  }

  iniciar() {
    this.temp1.setVal(this.data1)
    this.temp2.setVal(this.data2)
    this.temp1.setFecha(this.fecha1)
    this.temp2.setFecha(this.fecha2)
    this.comparar();
    console.log(this.temp1, this.temp2)
  }

  comparar() {
    this.indicadores.forEach(dato => {
      dato.dif = this.temp1[dato.prop] - this.temp2[dato.prop];
      console.log("dato.prop", [dato.prop], this.temp1[dato.prop], this.temp2[dato.prop])
      if (this.temp1[dato.prop] > this.temp2[dato.prop]) {
        dato.status = 'verde';
      }
      if (this.temp1[dato.prop] === this.temp2[dato.prop]) {
        dato.status = 'amarillo';
      }
      if (this.temp1[dato.prop] < this.temp2[dato.prop]) {
        dato.status = 'rojo';
      }
    })

    console.log(this.indicadores)
  }

  obtenerSemaforoPuc(idPuc: string): ITipoSemaforo {
    const pucMatriz = obtenerClaseMatrizPuc(idPuc);
    switch (pucMatriz) {
      case '1':
      case '2':
      case '4':
        if (this.temp1.getValorPorCodigo(idPuc) < this.temp2.getValorPorCodigo(idPuc)) {
          return 'rojo';
        }
        if (this.temp1.getValorPorCodigo(idPuc) > this.temp2.getValorPorCodigo(idPuc)) {
          return 'verde';
        }
        return 'amarillo';
      case '3':
      case '5':
      case '6':
      case '7':
        if (this.temp1.getValorPorCodigo(idPuc) > this.temp2.getValorPorCodigo(idPuc)) {
          return 'rojo';
        }
        if (this.temp1.getValorPorCodigo(idPuc) < this.temp2.getValorPorCodigo(idPuc)) {
          return 'verde';
        }
        return 'amarillo';
      default:
        return 'amarillo';
    }
  }

  getValorExcel1(id: string | number) {
    return this.temp1.getValorPorCodigo(id)
  }

  getValorExcel2(id: string | number) {
    return this.temp2.getValorPorCodigo(id)
  }

  getVariacionNetaPuc(id: string | number) {
    return this.temp1.getValorPorCodigo(id) - this.temp2.getValorPorCodigo(id);
  }

  getVariacionPorcentualPuc(id: string | number) {
    const valorDatos1 = this.temp1.getValorPorCodigo(id);
    const valorDatos2 = this.temp2.getValorPorCodigo(id);
    return ((valorDatos1 - valorDatos2) * 100) / valorDatos2;
  }

  getIndicadorExcel1(id: string) {
    return this.temp1[id];
  }

  getIndicadorExcel2(id: string) {
    return this.temp2[id];
  }

  getIndicadoresPorCategoria$(categoria: string) {
    return this._indicadoresHttpService
      .consultarIndicadoresPorCategoria(categoria)
      .pipe(
        map((indicadores) =>
          indicadores.map<IIndicadorConValor>((ind) => {
            const valorIndicador = this.indicadores.find(
              (x) => x.prop === ind.id
            );
            if (!valorIndicador) return null;
            return {
              ...ind,
              ...valorIndicador
            };
          }).filter(x => !!x)
        )
      );
  }

  getSemaforoIndicador(indicador: string) {
    return this._reglasIndicadoresService.calcularSemaforoIndicador(
      indicador,
      this.getIndicadorExcel1(indicador),
      this.getIndicadorExcel2(indicador),
    );
  }

}
