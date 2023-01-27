import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Item } from '../item.model';

@Injectable()
export class AuthService {
  cod1_1;
  cod2_1;
  cod3_1;
  cod4_1;
  cod5_1;
  cod6_1;
  cod7_1;
  cod11_1;
  cod12_1;
  cod14_1;
  cod1305_1;
  cod41_1;
  actCor_1;
  pasCor_1;

  cod1_2;
  cod2_2;
  cod3_2;
  cod4_2;
  cod5_2;
  cod6_2;
  cod7_2;
  cod11_2;
  cod12_2;
  cod14_2;
  cod1305_2;
  cod41_2;
  actCor_2;
  pasCor_2;
  $margenUtilidad;
  $margenBruto;
  $rActivos;
  $rPatrimonio;
  $liquidezCorriente;
  $liquidezInmmediata;
  $liquidezTotal;
  $ratioSol;
  $endeudamientoTotal;
  $rotInventarios;
  $rotCobrar;
  $rotPagar;
  $rotActivos;
  $rotInventario;

  constructor() {}

  setVal1(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo == '1') {
        this.cod1_1 = data[i].saldo;
      }
      if (data[i].codigo == '2') {
        this.cod2_1 = data[i].saldo;
      }
      if (data[i].codigo == '3') {
        this.cod3_1 = data[i].saldo;
      }
      if (data[i].codigo == '4') {
        this.cod4_1 = data[i].saldo;
      }
      if (data[i].codigo == '5') {
        this.cod5_1 = data[i].saldo;
      }
      if (data[i].codigo == '6') {
        this.cod6_1 = data[i].saldo;
      }
      if (data[i].codigo == '7') {
        this.cod7_1 = data[i].saldo;
      }
      if (data[i].codigo == '11') {
        this.cod11_1 = data[i].saldo;
      }
      if (data[i].codigo == '12') {
        this.cod12_1 = data[i].saldo;
      }
      if (data[i].codigo == '14') {
        this.cod14_1 = data[i].saldo;
      }
      if (data[i].codigo == '41') {
        this.cod41_1 = data[i].saldo;
      }
      if (
        data[i].codigo == '11' ||
        data[i].codigo == '12' ||
        data[i].codigo == '13' ||
        data[i].codigo == '14'
      ) {
        this.actCor_1.push(data[i].saldo);
      }
      if (
        data[i].codigo == '21' ||
        data[i].codigo == '22' ||
        data[i].codigo == '23' ||
        data[i].codigo == '24' ||
        data[i].codigo == '25'
      ) {
        this.pasCor_1.push(data[i].saldo);
      }
    }
  }

  setVal2(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo == '1') {
        this.cod1_2 = data[i].saldo;
      }
      if (data[i].codigo == '2') {
        this.cod2_2 = data[i].saldo;
      }
      if (data[i].codigo == '3') {
        this.cod3_2 = data[i].saldo;
      }
      if (data[i].codigo == '4') {
        this.cod4_2 = data[i].saldo;
      }
      if (data[i].codigo == '5') {
        this.cod5_2 = data[i].saldo;
      }
      if (data[i].codigo == '6') {
        this.cod6_2 = data[i].saldo;
      }
      if (data[i].codigo == '7') {
        this.cod7_2 = data[i].saldo;
      }
      if (data[i].codigo == '11') {
        this.cod11_2 = data[i].saldo;
      }
      if (data[i].codigo == '12') {
        this.cod12_2 = data[i].saldo;
      }
      if (data[i].codigo == '14') {
        this.cod14_2 = data[i].saldo;
      }
      if (data[i].codigo == '41') {
        this.cod41_2 = data[i].saldo;
      }
      if (
        data[i].codigo == '11' ||
        data[i].codigo == '12' ||
        data[i].codigo == '13' ||
        data[i].codigo == '14'
      ) {
        this.actCor_2.push(data[i].saldo);
      }
      if (
        data[i].codigo == '21' ||
        data[i].codigo == '22' ||
        data[i].codigo == '23' ||
        data[i].codigo == '24' ||
        data[i].codigo == '25'
      ) {
        this.pasCor_2.push(data[i].saldo);
      }
    }
  }
  //Rentabilidad
  margenUtilidad(cod41, cod6, cod5) {
    const margen = (cod41 - cod6 - cod5) / cod41;
    return margen;
  }

  margenBruto(cod41, cod6) {
    const margen = (cod41 - cod6) / cod41;
    return margen;
  }

  rActivos(cod4, cod6, cod5, cod1) {
    const indice = ((cod4 - (cod5 + cod6)) / cod1) * 100;
    return indice;
  }

  rPatrimonio(cod4, cod6, cod5, cod3) {
    const indice = ((cod4 - (cod5 + cod6)) / cod3) * 100;
    return indice;
  }
  //Liquidez
  liquidezCorriente(actCor, pasCor) {
    const sumAct = actCor
      .filter((item) => item.tax === '25.00')
      .reduce((sum, current) => sum + current.total, 0);
    const sumPas = pasCor
      .filter((item) => item.tax === '25.00')
      .reduce((sum, current) => sum + current.total, 0);
    const indice = (sumAct / sumPas) * 100;

    return indice;
  }

  liquidezInmediata(cod11, cod12, pasCor) {
    const sumPas = pasCor
      .filter((item) => item.tax === '25.00')
      .reduce((sum, current) => sum + current.total, 0);
    const indice = ((cod11 * cod12) / sumPas) * 100;

    return indice;
  }

  liquidezTotal(cod1, pasCor) {
    const indices = (cod1 / pasCor) * 100;
    return indices;
  }

  //Solvencia
  ratioSol(cod1, cod2) {
    const ratio = cod1 / cod2;
    return ratio;
  }

  //Endeudamiento
  endeudamientoTotal(cod2, cod1) {
    const endeudamiento = cod2 / cod1;
    return endeudamiento;
  }

  //Eficiencia
  rotInventarios(cod6, cod7, cod14) {
    const rotacion = (cod6 + cod7) / cod14;
    return rotacion;
  }

  rotCobrar(cod41, cod1305) {
    const rotacion = (cod41 - cod1305) / cod1305;
    return rotacion;
  }

  rotPagar(cod6, cod7, cod1305) {
    const rotacion = (cod6 + cod7) / cod1305;
    return rotacion;
  }

  rotActivos(cod41, cod1) {
    const rotacion = cod41 / cod1;
    return rotacion;
  }

  rotInventario(cod41, cod14) {
    const rotacion = cod41 / cod14;
    return rotacion;
  }

  comparacion(){
  
  }
}
