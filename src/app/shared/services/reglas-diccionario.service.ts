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

  private crearReglaVerdeSiSubeMenosQueActivos(): IReglaDiccionario {
    return (excelNuevo: ExcelInfo, excelAnterior: ExcelInfo, idPuc: string) => {
      const valorNuevo = excelNuevo.getValorPorCodigo(idPuc);
      const valorAnterior = excelAnterior.getValorPorCodigo(idPuc);
      const diferenciaPorcentual = calcularVariacionPorcentual(valorNuevo, valorAnterior);
      const valorNuevoActivos = excelNuevo.getValorPorCodigo('1');
      const valorAnteriorActivos = excelAnterior.getValorPorCodigo('1');
      const diferenciaPorcentualActivos = calcularVariacionPorcentual(valorNuevoActivos, valorAnteriorActivos);
      if (diferenciaPorcentual < diferenciaPorcentualActivos) return { status: 'verde' };
      if (diferenciaPorcentual > diferenciaPorcentualActivos) return { status: 'rojo' };
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
  private reglaVerdeSiSubeMenosQueActivos = this.crearReglaVerdeSiSubeMenosQueActivos();
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
      case '5':
      case '6':
      case '7':
        if (idPuc === '2') {
          resultado = this.reglaVerdeSiSubeMenosQueActivos(excelNuevo, excelAnterior, idPuc);
        } else {
          resultado = this.reglaVerdeSiBaja(excelNuevo, excelAnterior, idPuc);
        }
        break;
      default:
        break;
    }
    return resultado;
  }
}
