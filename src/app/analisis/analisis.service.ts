import { Injectable, Output } from '@angular/core';
import { Analisis } from './analisis.model';
import { Item } from './item.model';

@Injectable()
export class AnalisisService {
  @Output() analisis: Analisis;

  $activos = 0;
  $pasivos = 0;
  $patrimonio = 0;
  $dispCorto = 0;
  $dispMed = 0;
  $dispLargo = 0;
  $dispCajas = 0;
  $dispOtros = 0;
  $clientesDeben = 0;
  $inventario = 0;
  $propiedades = 0;
  $otrosActivos = 0;
  $debeEntFin = 0;
  $debeEntFin1 = 0;
  $nombreEntFin1: string;
  $debeEntFin2 = 0;
  $nombreEntFin2: string;
  $debeEntFin3 = 0;
  $debeProveedores = 0;
  $dProveedores1 = 0;
  $nombreDProveedores1: string;
  $dProveedores2 = 0;
  $nombreDProveedores2: string;
  $dProveedores3 = 0;
  $cuentas = 0;
  $cuentas1 = 0;
  $nombreCuentas1: string;
  $cuentas2 = 0;
  $nombreCuentas2: string;
  $cuentas3 = 0;
  $impuestos = 0;
  $impuestos1 = 0;
  $nombreImpuestos1: string;
  $impuestos2 = 0;
  $nombreImpuestos2: string;
  $impuestos3 = 0;
  $deudas = 0;
  $laborales = 0;
  $otrasDeudas = 0;
  $pagosAnt = 0;
  $otrosPasivos = 0;
  debeEntArr: Item[] = [];
  debeProvArr: Item[] = [];
  cuentasArr: Item[] = [];
  impuestosArr: Item[] = [];

  showData(data: Item[]) {
    console.log('data recibida', data);
  }

  getDatosActivos(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('1')) {
          this.$activos += data[i].saldo;
        }
      }

      if (data[i].codigo == '11') {
        this.$dispCorto += data[i].saldo;
      }
      if (data[i].codigo == '1105' || data[i].codigo == '1110') {
        this.$dispCajas += data[i].saldo;
      }
      if (
        data[i].codigo == '1115' ||
        data[i].codigo == '1120' ||
        data[i].codigo == '1125'
      ) {
        this.$dispOtros += data[i].saldo;
      }

      if (
        data[i].codigo == '12' ||
        data[i].codigo == '13' ||
        data[i].codigo == '14'
      ) {
        this.$dispMed += data[i].saldo;
      }
      if (data[i].codigo == '13') {
        this.$clientesDeben += data[i].saldo;
      }
      if (data[i].codigo == '14') {
        this.$inventario += data[i].saldo;
      }

      if (data[i].codigo == '15' || data[i].codigo == '16') {
        this.$dispLargo += data[i].saldo;
      }
      if (data[i].codigo == '15') {
        this.$propiedades += data[i].saldo;
      }
      if (data[i].codigo == '16') {
        this.$otrosActivos += data[i].saldo;
      }
    }
  }

  getDatosPasivos(data: Item[]) {
    console.log('datos en getdatospasivos', data);
    for (let i = 0; i < data.length; i++) {
      //CAPITULO 2
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('2')) {
          this.$pasivos += data[i].saldo;
        }
      }
      if (data[i].codigo == '21') {
        this.$debeEntFin += data[i].saldo;
      }

      if (data[i].codigo.length == 4) {
        if (data[i].codigo.startsWith('21')) {
          this.debeEntArr.push(data[i]);
          console.log('debe ent', this.debeEntArr);
        }
      }

      if (data[i].codigo == '22') {
        this.$debeProveedores += data[i].saldo;
      }
      if (data[i].codigo.length == 4) {
        if (data[i].codigo.startsWith('22')) {
          this.debeProvArr.push(data[i]);
        }
      }

      if (data[i].codigo == '23') {
        this.$cuentas += data[i].saldo;
      }
      if (data[i].codigo.length == 4) {
        if (data[i].codigo.startsWith('23')) {
          this.cuentasArr.push(data[i]);
        }
      }

      if (data[i].codigo == '24') {
        this.$impuestos += data[i].saldo;
      }
      if (data[i].codigo.length == 4) {
        if (data[i].codigo.startsWith('24')) {
          this.impuestosArr.push(data[i]);
        }
      }

      if (
        data[i].codigo == '25' ||
        data[i].codigo == '26' ||
        data[i].codigo == '27' ||
        data[i].codigo == '28' ||
        data[i].codigo == '29'
      ) {
        this.$deudas += data[i].saldo;
      }
      if (data[i].codigo == '25') {
        this.$laborales += data[i].saldo;
      }
      if (data[i].codigo == '26') {
        this.$otrasDeudas += data[i].saldo;
      }
      if (data[i].codigo == '27') {
        this.$pagosAnt += data[i].saldo;
      }
      if (data[i].codigo == '28' || data[i].codigo == '29') {
        this.$otrosPasivos += data[i].saldo;
      }
    }
    if (this.debeEntArr.length > 2) {
      var debeSorted = this.debeEntArr.sort((a, b) => {
        if (b.saldo < a.saldo) return 1;
        if (b.saldo > a.saldo) return -1;
        return 0;
      });

      this.$debeEntFin1 = debeSorted[0].saldo;
      this.$nombreEntFin1 = debeSorted[0].nombre;
      this.$debeEntFin2 = debeSorted[1].saldo;
      this.$nombreEntFin2 = debeSorted[1].nombre;

      debeSorted.splice(0, 2);
      for (let j = 0; j < debeSorted.length; j++) {
        this.$debeEntFin3 += debeSorted[j].saldo;
      }
    } else {
      this.$debeEntFin1 = 0;
      this.$nombreEntFin1 = 'null';
    }

    if (this.debeProvArr.length > 2) {
      var debeProvSorted = this.debeProvArr.sort((a, b) => {
        if (b.saldo < a.saldo) return 1;
        if (b.saldo > a.saldo) return -1;
        return 0;
      });

      this.$dProveedores1 = debeProvSorted[0].saldo;
      this.$nombreDProveedores1 = debeProvSorted[0].nombre;
      this.$dProveedores2 = debeProvSorted[1].saldo;
      this.$nombreDProveedores2 = debeProvSorted[1].nombre;

      debeProvSorted.splice(0, 2);
      for (let j = 0; j < debeProvSorted.length; j++) {
        this.$dProveedores3 += debeProvSorted[j].saldo;
      }
    } else {
      this.$dProveedores1 = 0;
      this.$nombreDProveedores1 = 'null';
    }

    if (this.cuentasArr.length > 2) {
      var cuentasSorted = this.cuentasArr.sort((a, b) => {
        if (b.saldo < a.saldo) return 1;
        if (b.saldo > a.saldo) return -1;
        return 0;
      });

      this.$cuentas1 = cuentasSorted[0].saldo;
      this.$nombreCuentas1 = cuentasSorted[0].nombre;
      this.$cuentas2 = cuentasSorted[1].saldo;
      this.$nombreCuentas2 = cuentasSorted[1].nombre;

      cuentasSorted.splice(0, 2);
      for (let j = 0; j < cuentasSorted.length; j++) {
        this.$cuentas3 += cuentasSorted[j].saldo;
      }
    } else {
      this.$cuentas1 = 0;
      this.$nombreCuentas1 = 'null';
    }

    if (this.impuestosArr.length > 2) {
      var impuestosSorted = this.impuestosArr.sort((a, b) => {
        if (b.saldo < a.saldo) return 1;
        if (b.saldo > a.saldo) return -1;
        return 0;
      });

      this.$impuestos1 = impuestosSorted[0].saldo;
      this.$nombreImpuestos1 = impuestosSorted[0].nombre;
      this.$impuestos2 = impuestosSorted[1].saldo;
      this.$nombreImpuestos2 = impuestosSorted[1].nombre;

      impuestosSorted.splice(0, 2);
      for (let j = 0; j < impuestosSorted.length; j++) {
        this.$impuestos3 += impuestosSorted[j].saldo;
      }
    } else {
      this.$impuestos1 = 0;
      this.$nombreImpuestos2 = 'null';
    }
  }

  getDatosPatrimonio(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('3')) {
          this.$patrimonio += data[i].saldo;
        }
      }
    }
  }

  generarAnalisisGeneral(data: Item[]) {
    console.log('show data', data);
    for (let i = 0; i < data.length; i++) {
      //CAPITULO 1
      /*if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('1')) {
          this.$activos += data[i].saldo;
        }
      }

      if (data[i].codigo == '11') {
        this.$dispCorto += data[i].saldo;
      }
      if (data[i].codigo == '1105' || data[i].codigo == '1110') {
        this.$dispCajas += data[i].saldo;
      }
      if (
        data[i].codigo == '1115' ||
        data[i].codigo == '1120' ||
        data[i].codigo == '1125'
      ) {
        this.$dispOtros += data[i].saldo;
      }

      if (
        data[i].codigo == '12' ||
        data[i].codigo == '13' ||
        data[i].codigo == '14'
      ) {
        this.$dispMed += data[i].saldo;
      }
      if (data[i].codigo == '13') {
        this.$clientesDeben += data[i].saldo;
      }
      if (data[i].codigo == '14') {
        this.$inventario += data[i].saldo;
      }

      if (data[i].codigo == '15' || data[i].codigo == '16') {
        this.$dispLargo += data[i].saldo;
      }
      if ((data[i].codigo = '15')) {
        this.$propiedades += data[i].saldo;
      }
      if ((data[i].codigo = '16')) {
        this.$otrosActivos += data[i].saldo;
      }*/

      //CAPITULO 2
      /*if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('2')) {
          this.$pasivos += data[i].saldo;
        }
      }
      if (data[i].codigo == '21') {
        this.$debeEntFin += data[i].saldo;
      }

      if (data[i].codigo.length == 4) {
        if (
          data[i].codigo.startsWith('210') ||
          data[i].codigo.startsWith('211') ||
          data[i].codigo.startsWith('212') ||
          data[i].codigo.startsWith('213') ||
          data[i].codigo.startsWith('214') ||
          data[i].codigo.startsWith('215') ||
          data[i].codigo.startsWith('216') ||
          data[i].codigo.startsWith('217') ||
          data[i].codigo.startsWith('218') ||
          data[i].codigo.startsWith('219')
        ) {
          this.debeEntArr.push(data[i]);
          console.log('debe ent', this.debeEntArr);
        }
      }

      if (data[i].codigo == '22') {
        this.$debeProveedores += data[i].saldo;
      }
      if (data[i].codigo.length == 4) {
        if (
          data[i].codigo.startsWith('220') ||
          data[i].codigo.startsWith('221') ||
          data[i].codigo.startsWith('222') ||
          data[i].codigo.startsWith('223') ||
          data[i].codigo.startsWith('224') ||
          data[i].codigo.startsWith('225') ||
          data[i].codigo.startsWith('226') ||
          data[i].codigo.startsWith('227') ||
          data[i].codigo.startsWith('228') ||
          data[i].codigo.startsWith('229')
        ) {
          this.debeProvArr.push(data[i]);
        }
      }

      if (data[i].codigo == '23') {
        this.$cuentas += data[i].saldo;
      }
      if (data[i].codigo.length == 4) {
        if (
          data[i].codigo.startsWith('230') ||
          data[i].codigo.startsWith('231') ||
          data[i].codigo.startsWith('232') ||
          data[i].codigo.startsWith('233') ||
          data[i].codigo.startsWith('234') ||
          data[i].codigo.startsWith('235') ||
          data[i].codigo.startsWith('236') ||
          data[i].codigo.startsWith('237') ||
          data[i].codigo.startsWith('238') ||
          data[i].codigo.startsWith('239')
        ) {
          this.cuentasArr.push(data[i]);
        }
      }

      if (data[i].codigo == '24') {
        this.$impuestos += data[i].saldo;
      }
      if (data[i].codigo.length == 4) {
        if (
          data[i].codigo.startsWith('240') ||
          data[i].codigo.startsWith('241') ||
          data[i].codigo.startsWith('242') ||
          data[i].codigo.startsWith('243') ||
          data[i].codigo.startsWith('244') ||
          data[i].codigo.startsWith('245') ||
          data[i].codigo.startsWith('246') ||
          data[i].codigo.startsWith('247') ||
          data[i].codigo.startsWith('248') ||
          data[i].codigo.startsWith('249')
        ) {
          this.impuestosArr.push(data[i]);
        }
      }

      if (
        data[i].codigo == '25' ||
        data[i].codigo == '26' ||
        data[i].codigo == '27' ||
        data[i].codigo == '28' ||
        data[i].codigo == '29'
      ) {
        this.$deudas += data[i].saldo;
      }
      if (data[i].codigo == '25') {
        this.$laborales += data[i].saldo;
      }
      if (data[i].codigo == '26') {
        this.$otrasDeudas += data[i].saldo;
      }
      if (data[i].codigo == '27') {
        this.$pagosAnt += data[i].saldo;
      }
      if (data[i].codigo == '28' || data[i].codigo == '29') {
        this.$otrosPasivos += data[i].saldo;
      }*/

      //CAPITULO 3
      /* if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('3')) {
          this.$patrimonio += data[i].saldo;
        }
      }*/

      if (this.debeEntArr.length > 2) {
        var debeSorted = this.debeEntArr.sort((a, b) => {
          if (b.saldo < a.saldo) return 1;
          if (b.saldo > a.saldo) return -1;
          return 0;
        });

        this.$debeEntFin1 = debeSorted[0].saldo;
        this.$nombreEntFin1 = debeSorted[0].nombre;
        this.$debeEntFin2 = debeSorted[1].saldo;
        this.$nombreEntFin2 = debeSorted[1].nombre;

        debeSorted.splice(0, 2);
        for (let j = 0; j < debeSorted.length; j++) {
          this.$debeEntFin3 += debeSorted[j].saldo;
        }
      } else {
        this.$debeEntFin1 = 0;
        this.$nombreEntFin1 = 'null';
      }

      if (this.debeProvArr.length > 2) {
        var debeProvSorted = this.debeProvArr.sort((a, b) => {
          if (b.saldo < a.saldo) return 1;
          if (b.saldo > a.saldo) return -1;
          return 0;
        });

        this.$dProveedores1 = debeProvSorted[0].saldo;
        this.$nombreDProveedores1 = debeProvSorted[0].nombre;
        this.$dProveedores2 = debeProvSorted[1].saldo;
        this.$nombreDProveedores2 = debeProvSorted[1].nombre;

        debeProvSorted.splice(0, 2);
        for (let j = 0; j < debeProvSorted.length; j++) {
          this.$dProveedores3 += debeProvSorted[j].saldo;
        }
      } else {
        this.$dProveedores1 = 0;
        this.$nombreDProveedores1 = 'null';
      }

      if (this.cuentasArr.length > 2) {
        var cuentasSorted = this.cuentasArr.sort((a, b) => {
          if (b.saldo < a.saldo) return 1;
          if (b.saldo > a.saldo) return -1;
          return 0;
        });

        this.$cuentas1 = cuentasSorted[0].saldo;
        this.$nombreCuentas1 = cuentasSorted[0].nombre;
        this.$cuentas2 = cuentasSorted[1].saldo;
        this.$nombreCuentas2 = cuentasSorted[1].nombre;

        cuentasSorted.splice(0, 2);
        for (let j = 0; j < cuentasSorted.length; j++) {
          this.$cuentas3 += cuentasSorted[j].saldo;
        }
      } else {
        this.$cuentas1 = 0;
        this.$nombreCuentas1 = 'null';
      }

      if (this.impuestosArr.length > 2) {
        var impuestosSorted = this.impuestosArr.sort((a, b) => {
          if (b.saldo < a.saldo) return 1;
          if (b.saldo > a.saldo) return -1;
          return 0;
        });

        this.$impuestos1 = impuestosSorted[0].saldo;
        this.$nombreImpuestos1 = impuestosSorted[0].nombre;
        this.$impuestos2 = impuestosSorted[1].saldo;
        this.$nombreImpuestos2 = impuestosSorted[1].nombre;

        impuestosSorted.splice(0, 2);
        for (let j = 0; j < impuestosSorted.length; j++) {
          this.$impuestos3 += impuestosSorted[j].saldo;
        }
      } else {
        this.$impuestos1 = 0;
        this.$nombreImpuestos2 = 'null';
      }

      console.log('sorted debe', debeSorted);
      console.log('sorted cuentas', cuentasSorted);
      console.log('sorted impuestos', impuestosSorted);
    }
    this.crearAnalisis();
  }

  crearAnalisis() {
    this.analisis = {
      activos: this.$activos,
      pasivos: this.$pasivos,
      patrimonio: this.$patrimonio,
      dispCorto: this.$dispCorto,
      dispMed: this.$dispMed,
      dispLargo: this.$dispLargo,
      dispCajas: this.$dispCajas,
      dispOtros: this.$dispOtros,
      clientesDeben: this.$clientesDeben, //este si sirve
      inventario: this.$inventario,
      propiedades: this.$propiedades,
      otrosActivos: this.$otrosActivos,
      debeEntFin: this.$debeEntFin,
      debeEntFin1: this.$debeEntFin1,
      nombreEntFin1: this.$nombreEntFin1,
      debeEntFin2: this.$debeEntFin2,
      nombreEntFin2: this.$nombreEntFin2,
      debeEntFin3: this.$debeEntFin3,
      debeProveedores: this.$debeProveedores,
      dProveedores1: this.$dProveedores1,
      nombreDProveedores1: this.$nombreDProveedores1,
      dProveedores2: this.$dProveedores2,
      nombreDProveedores2: this.$nombreDProveedores2,
      dProveedores3: this.$dProveedores3,
      cuentas: this.$cuentas,
      cuentas1: this.$cuentas1,
      nombreCuentas1: this.$nombreCuentas1,
      cuentas2: this.$cuentas2,
      nombreCuentas2: this.$nombreCuentas2,
      cuentas3: this.$cuentas3,
      impuestos: this.$impuestos,
      impuestos1: this.$impuestos1,
      nombreImpuestos1: this.$nombreImpuestos1,
      impuestos2: this.$impuestos2,
      nombreImpuestos2: this.$nombreImpuestos2,
      impuestos3: this.$impuestos3,
      deudas: this.$deudas,
      laborales: this.$laborales,
      otrasDeudas: this.$otrasDeudas,
      pagosAnt: this.$pagosAnt,
      otrosPasivos: this.$otrosPasivos,
    };
    console.log('show analisis', this.analisis);
  }

  getAnalisis() {
    return this.analisis;
  }
}
