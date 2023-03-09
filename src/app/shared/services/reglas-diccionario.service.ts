import { Injectable } from '@angular/core';
import { ExcelInfo } from 'src/app/analisis/item.model';
import { calcularVariacionPorcentual, obtenerClaseMatrizPuc } from 'src/app/utils';
import {
  IReglaDiccionario,
  IStatusDiccionario,
} from './types/reglas-diccionario.types';

@Injectable({ providedIn: 'root' })
export class ReglasDiccionarioService {
  constructor() {}

  private crearReglaVerdeSiSube(): IReglaDiccionario {
    return (excelNuevo: ExcelInfo, excelAnterior: ExcelInfo, idPuc: string) => {
      const valorNuevo = excelNuevo.getValorPorCodigo(idPuc);
      const valorAnterior = excelAnterior.getValorPorCodigo(idPuc);
      if (valorNuevo < valorAnterior) return { status: 'rojo' };
      if (valorNuevo > valorAnterior) return { status: 'verde' };
      return { status: 'amarillo' };
    };
  }

  private crearReglaVerdeSiSubeMenosQueCodigo(idPucComparacion: string): IReglaDiccionario {
    return (excelNuevo: ExcelInfo, excelAnterior: ExcelInfo, idPuc: string) => {
      const valorNuevo = excelNuevo.getValorPorCodigo(idPuc);
      const valorAnterior = excelAnterior.getValorPorCodigo(idPuc);
      const diferenciaPorcentual = calcularVariacionPorcentual(valorNuevo, valorAnterior);
      const valorNuevoComparacion = excelNuevo.getValorPorCodigo(idPucComparacion);
      const valorAnteriorComparacion = excelAnterior.getValorPorCodigo(idPucComparacion);
      const diferenciaPorcentualComparacion = calcularVariacionPorcentual(valorNuevoComparacion, valorAnteriorComparacion);
      if (valorNuevo < 0 && valorAnterior > 0) return { status: 'verde' };
      if (valorNuevo > 0 && valorAnterior < 0) return { status: 'rojo' };
      if (isNaN(diferenciaPorcentual) || isNaN(diferenciaPorcentualComparacion)) return { status: 'amarillo' };
      if (diferenciaPorcentual < diferenciaPorcentualComparacion) return { status: 'verde' };
      if (diferenciaPorcentual > diferenciaPorcentualComparacion) return { status: 'rojo' };
      return { status: 'amarillo' };
    };
  }

  private crearReglaVerdeSiSubeMasQueCodigo(idPucComparacion: string): IReglaDiccionario {
    return (excelNuevo: ExcelInfo, excelAnterior: ExcelInfo, idPuc: string) => {
      const valorNuevo = excelNuevo.getValorPorCodigo(idPuc);
      const valorAnterior = excelAnterior.getValorPorCodigo(idPuc);
      const diferenciaPorcentual = calcularVariacionPorcentual(valorNuevo, valorAnterior);
      const valorNuevoComparacion = excelNuevo.getValorPorCodigo(idPucComparacion);
      const valorAnteriorComparacion = excelAnterior.getValorPorCodigo(idPucComparacion);
      const diferenciaPorcentualComparacion = calcularVariacionPorcentual(valorNuevoComparacion, valorAnteriorComparacion);
      if (valorNuevo > 0 && valorAnterior < 0) return { status: 'verde' };
      if (valorNuevo < 0 && valorAnterior > 0) return { status: 'rojo' };
      if (isNaN(diferenciaPorcentual) || isNaN(diferenciaPorcentualComparacion)) return { status: 'amarillo' };
      if (diferenciaPorcentual > diferenciaPorcentualComparacion) return { status: 'verde' };
      if (diferenciaPorcentual < diferenciaPorcentualComparacion) return { status: 'rojo' };
      return { status: 'amarillo' };
    };
  }

  private crearReglaVerdeSiBaja(): IReglaDiccionario {
    return (excelNuevo: ExcelInfo, excelAnterior: ExcelInfo, idPuc: string) => {
      const valorNuevo = excelNuevo.getValorPorCodigo(idPuc);
      const valorAnterior = excelAnterior.getValorPorCodigo(idPuc);
      if (valorNuevo > valorAnterior) return { status: 'rojo' };
      if (valorNuevo < valorAnterior) return { status: 'verde' };
      return { status: 'amarillo' };
    };
  }

  private reglaVerdeSiSube = this.crearReglaVerdeSiSube();
  private reglaVerdeSiSubeMenosQueActivos = this.crearReglaVerdeSiSubeMenosQueCodigo('1');
  private reglaVerdeSiSubeMenosQueIngresos = this.crearReglaVerdeSiSubeMenosQueCodigo('4');
  private reglaVerdeSiSubeMasQueIngresos = this.crearReglaVerdeSiSubeMasQueCodigo('4');
  private reglaVerdeSiBaja = this.crearReglaVerdeSiBaja();

  calcularSemaforoDiccionario(
    excelNuevo: ExcelInfo,
    excelAnterior: ExcelInfo,
    idPuc: string
  ) {
    const pucMatriz = obtenerClaseMatrizPuc(idPuc);
    let resultado: IStatusDiccionario = { status: 'amarillo' };
    switch (pucMatriz) {
      case '1':
      case '3':
      case '4':
        resultado = this.reglaVerdeSiSube(excelNuevo, excelAnterior, idPuc);
        break;
      case '2':
        if (idPuc === '2') {
          resultado = this.reglaVerdeSiSubeMenosQueActivos(excelNuevo, excelAnterior, idPuc);
        } else {
          resultado = this.reglaVerdeSiBaja(excelNuevo, excelAnterior, idPuc);
        }
      case '5':
      case '6':
      case '7':
        resultado = this.reglaVerdeSiSubeMenosQueIngresos(excelNuevo, excelAnterior, idPuc);
        break;
      default:
        if (idPuc === 'estadoResultados') {
          resultado = this.reglaVerdeSiSubeMasQueIngresos(excelNuevo, excelAnterior, idPuc);
        }
        break;
    }
    return resultado;
  }
}
