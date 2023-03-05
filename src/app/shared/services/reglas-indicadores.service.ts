import { Injectable } from '@angular/core';
import { IndicadoresHttpService } from 'src/app/shared/services/indicadores-http.service';
import {
  IReglaIndicador,
  IStatusIndicador,
} from './types/reglas-indicadores.types';

@Injectable({ providedIn: 'root' })
export class ReglasIndicadoresService {
  reglasSemaforo: Record<string, IReglaIndicador[]> = {};

  constructor(private _indicadoresHttpService: IndicadoresHttpService) {
    this.registrarListaReglas();
  }

  private crearReglaVerdeSiSube(): IReglaIndicador {
    return (nuevo: number, anterior: number) => {
      if (nuevo < anterior) return { status: 'rojo' };
      if (nuevo > anterior) return { status: 'verde' };
      return { status: 'amarillo' };
    };
  }

  private crearReglaVerdeSiBaja(): IReglaIndicador {
    return (nuevo: number, anterior: number) => {
      if (nuevo > anterior) return { status: 'rojo' };
      if (nuevo < anterior) return { status: 'verde' };
      else return { status: 'amarillo' };
    };
  }

  private crearReglaMinimoRecomendado(valorMinimo: number, mayorEsMejor: boolean = true): IReglaIndicador {
    return (nuevo: number, anterior: number) => {
      const mayorQueMinimo = nuevo > valorMinimo;
      const mejorQueAnterior = (nuevo > anterior) === mayorEsMejor;
      if (!mayorQueMinimo && mejorQueAnterior) return { mensaje: `A pesar de que mejoró, este indicador debe ser mayor a ${valorMinimo}.` };
      else if (!mayorQueMinimo && !mejorQueAnterior) return { mensaje: `Este indicador ha empeorado. Además, debería ser mayor a ${valorMinimo}.` };
      return {};
    };
  }

  private crearReglaMaximoRecomendado(valorMaximo: number, mayorEsMejor: boolean = true): IReglaIndicador {
    return (nuevo: number, anterior: number) => {
      const menorQueMaximo = nuevo < valorMaximo;
      const mejorQueAnterior = (nuevo > anterior) === mayorEsMejor;
      if (!menorQueMaximo && mejorQueAnterior) return { mensaje: `A pesar de que mejoró, este indicador debe ser menor a ${valorMaximo}.` };
      else if (!menorQueMaximo && !mejorQueAnterior) return { mensaje: `Este indicador ha empeorado. Además, debería ser menor a ${valorMaximo}.` };
      return {};
    };
  }

  private registrarRegla(indicador: string, regla: IReglaIndicador) {
    if (!this.reglasSemaforo[indicador]) {
      this.reglasSemaforo[indicador] = [];
    }
    this.reglasSemaforo[indicador].push(regla);
  }

  private registrarListaReglas() {
    this.registrarRegla('endeudamientoTotal', this.crearReglaVerdeSiBaja());
    this.registrarRegla('endeudamientoTotal', this.crearReglaMaximoRecomendado(1, false));
    this.registrarRegla('liquidezCorriente', this.crearReglaVerdeSiSube());
    this.registrarRegla('liquidezCorriente', this.crearReglaMinimoRecomendado(1));
    this.registrarRegla('liquidezInmediata', this.crearReglaVerdeSiSube());
    this.registrarRegla('liquidezInmediata', this.crearReglaMinimoRecomendado(1));
    this.registrarRegla('liquidezTotal', this.crearReglaVerdeSiSube());
    this.registrarRegla('liquidezTotal', this.crearReglaMinimoRecomendado(1));
    this.registrarRegla('margenBruto', this.crearReglaVerdeSiSube());
    this.registrarRegla('margenNeto', this.crearReglaVerdeSiSube());
    this.registrarRegla('rActivos', this.crearReglaVerdeSiSube());
    this.registrarRegla('rPatrimonio', this.crearReglaVerdeSiSube());
    this.registrarRegla('ratio', this.crearReglaVerdeSiSube());
    this.registrarRegla('ratio', this.crearReglaMinimoRecomendado(1.5));
    this.registrarRegla('rotActivos', this.crearReglaVerdeSiSube());
    this.registrarRegla('rotCobrar', this.crearReglaVerdeSiBaja());
    this.registrarRegla('rotInventario', this.crearReglaVerdeSiSube());
    this.registrarRegla('rotInventarios', this.crearReglaVerdeSiSube());
    this.registrarRegla('rotPagar', this.crearReglaVerdeSiSube());
  }

  calcularSemaforoIndicador(indicador: string, valorNuevo: number, valorAnterior: number) {
    const resultadoReglas = (this.reglasSemaforo[indicador] || []).reduce(
      (a, b) => ({ ...b(valorNuevo, valorAnterior), ...a }),
      {} as IStatusIndicador
    );
    if (!resultadoReglas.mensaje) {
      switch (resultadoReglas.status) {
        case 'verde':
          resultadoReglas.mensaje = 'Este indicador ha mejorado';
          break;
        case 'amarillo':
          resultadoReglas.mensaje = 'Este indicador no ha cambiado';
          break;
        case 'rojo':
          resultadoReglas.mensaje = 'Este indicador ha empeorado';
          break;
        default:
          break;
      }
    }
    return resultadoReglas;
  }
}
