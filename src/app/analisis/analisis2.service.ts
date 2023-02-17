import { Injectable, Output } from '@angular/core';
import { Analisis } from './analisis.model';
import { EstadoResultados } from './estado-resultados.model';
import { Item } from './item.model';

@Injectable()
export class AnalisisService2 {
  @Output() analisis: Analisis;
  @Output() estadoResultado: EstadoResultados;

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

  $ingresos = 0;
  $gastos = 0;
  $resultado = 0;
  $opNormal = 0;
  $noOp = 0;
  $devoluciones = 0;
  $inflacion = 0;
  $opAdministracion = 0;
  $admin1 = 0;
  $nombreAdmin1: string;
  $admin2 = 0;
  $nombreAdmin2: string;
  $demasGastosA = 0;
  $depreciacionA = 0;
  $opVentas = 0;
  $ventas1 = 0;
  $ventas2 = 0;
  $nombreVentas1: string;
  $nombreVentas2: string;
  $demasGastosV = 0;
  $depreciacionV = 0;
  $costosV = 0;
  $compras = 0;
  $prestacion = 0;
  $gastosNoOp = 0;
  $financieros = 0;
  $otrosGastos = 0;
  $impuestoRenta = 0;

  debeEntArr: Item[] = [];
  debeProvArr: Item[] = [];
  cuentasArr: Item[] = [];
  impuestosArr: Item[] = [];
  administrativosArr: Item[] = [];
  opArr: Item[] = [];
  posicionesArr: Item[] = [];
  pos1 = 0;
  nombrePos1: string;
  pos2 = 0;
  nombrePos2: string;
  pos3 = 0;
  nombrePos3: string;
  pos4 = 0;
  nombrePos4: string;
  pos5 = 0;
  nombrePos5: string;

  fechaArr =  [];

  showData(data: Item[]) {

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

  getDatosIngresos(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('4')) {
          this.$ingresos += data[i].saldo;
        }
      }

      if (data[i].codigo == '41') {
        this.$opNormal += data[i].saldo;
      }
      if (data[i].codigo == '42') {
        this.$noOp += data[i].saldo;
      }
      if (data[i].codigo == '4175') {
        this.$devoluciones += data[i].saldo;
      }

      if (data[i].codigo == '47') {
        this.$inflacion += data[i].saldo;
      }
    }
  }

  getDatosGastosCostos(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('5') || data[i].codigo.startsWith('6')) {
          this.$gastos += data[i].saldo;
        }
      }

      if (data[i].codigo == '51') {
        this.$opAdministracion += data[i].saldo;
      }

      if (data[i].codigo.length == 4) {
        if (
          data[i].codigo.startsWith('51') &&
          data[i].codigo != '5160' &&
          data[i].codigo != '5199'
        ) {
          this.administrativosArr.push(data[i]);
        }
      }

      if (data[i].codigo.length == 4) {
        if (data[i].codigo == '5160' || data[i].codigo == '5199') {
          this.$depreciacionA += data[i].saldo;
        }
      }

      if (data[i].codigo == '52') {
        this.$opVentas += data[i].saldo;
      }

      if (data[i].codigo.length == 4) {
        if (
          data[i].codigo.startsWith('52') &&
          data[i].codigo != '5260' &&
          data[i].codigo != '5299'
        ) {
          this.opArr.push(data[i]);
        }
      }

      if (data[i].codigo.length == 4) {
        if (data[i].codigo == '5260' || data[i].codigo == '5299') {
          this.$depreciacionV += data[i].saldo;
        }
      }

      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('6')) {
          this.$costosV += data[i].saldo;
        }
      }

      if (data[i].codigo == '62') {
        this.$compras += data[i].saldo;
      }

      if (data[i].codigo == '61') {
        this.$prestacion += data[i].saldo;
      }

      if (data[i].codigo == '53') {
        this.$gastosNoOp += data[i].saldo;
      }

      if (data[i].codigo == '5305') {
        this.$financieros += data[i].saldo;
      }

      if (data[i].codigo.length == 4) {
        if (data[i].codigo.startsWith('5') && data[i].codigo != '5305') {
          this.$otrosGastos += data[i].saldo;
        }
      }

      if (data[i].codigo == '54') {
        this.$impuestoRenta += data[i].saldo;
      }
    }

    if (this.administrativosArr.length > 2) {
      var adminSorted = this.administrativosArr.sort((a, b) => {
        if (b.saldo > a.saldo) return 1;
        if (b.saldo < a.saldo) return -1;
        return 0;
      });

      this.$admin1 = adminSorted[0].saldo;
      this.$nombreAdmin1 = adminSorted[0].nombre;
      this.$admin2 = adminSorted[1].saldo;
      this.$nombreAdmin2 = adminSorted[1].nombre;

      adminSorted.splice(0, 2);
      for (let j = 0; j < adminSorted.length; j++) {
        this.$demasGastosA += adminSorted[j].saldo;
      }
    } else {
      /*this.$admin1 = this.administrativosArr[0].saldo;
        this.$nombreAdmin1 = this.administrativosArr[0].nombre;
        this.$admin2 = this.administrativosArr[1].saldo;
        this.$nombreAdmin2 = this.administrativosArr[1].nombre;*/
    }

    if (this.opArr.length > 2) {
      var opSorted = this.opArr.sort((a, b) => {
        if (b.saldo > a.saldo) return 1;
        if (b.saldo < a.saldo) return -1;
        return 0;
      });

      this.$ventas1 = opSorted[0].saldo;
      this.$nombreVentas1 = opSorted[0].nombre;
      this.$ventas2 = opSorted[1].saldo;
      this.$nombreVentas2 = opSorted[1].nombre;

      adminSorted.splice(0, 2);
      for (let j = 0; j < opSorted.length; j++) {
        this.$demasGastosV += opSorted[j].saldo;
      }
    } else {
      /*this.$ventas1 = this.opArr[0].saldo;
        this.$nombreVentas1 = this.opArr[0].nombre;
        this.$ventas2 = this.opArr[1].saldo;
        this.$nombreVentas2 = this.opArr[1].nombre;*/
    }
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
      clientesDeben: this.$clientesDeben,
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
    this.estadoResultado = {
      ingresos: this.$ingresos,
      gastos: this.$gastos,
      resultado: this.$resultado,
      opNormal: this.$opNormal,
      noOp: this.$noOp,
      devoluciones: this.$devoluciones,
      inflacion: this.$inflacion,
      opAdministracion: this.$opAdministracion,
      admin1: this.$admin1,
      nombreAdmin1: this.$nombreAdmin1,
      admin2: this.$admin2,
      nombreAdmin2: this.$nombreAdmin2,
      demasGastosA: this.$demasGastosA,
      depreciacionA: this.$depreciacionA,
      opVentas: this.$opVentas,
      ventas1: this.$ventas1,
      nombreVentas1: this.$nombreVentas1,
      ventas2: this.$ventas2,
      nombreVentas2: this.$nombreVentas2,
      demasGastosV: this.$demasGastosV,
      depreciacionV: this.$depreciacionV,
      costosV: this.$costosV,
      compras: this.$compras,
      prestacion: this.$prestacion,
      gastosNoOp: this.$gastosNoOp,
      financieros: this.$financieros,
      otrosGastos: this.$otrosGastos,
      impuestoRenta: this.$impuestoRenta,
    };
  }

  getAnalisis() {
    return this.analisis;
  }

  getEstadoResultado() {
    return this.estadoResultado;
  }

  setFecha(fecha:string){
    const rExp : RegExp = /Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|\d{4}/gi;
    
    this.fechaArr = String(fecha).match(rExp);
  }

  getFecha(){
    return this.fechaArr;
  }
}
