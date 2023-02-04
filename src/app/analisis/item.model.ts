export interface Item {
  codigo: string;
  nombre: string;
  saldo: number;
}

export interface Regla {
  codigo: string;
  compararCon: '1';
}

export interface ComparacionItems {
  codigo: string;
  nombre: string;
  anios: {
    idAnio: string;
    nombreAnio: string;
    saldo: number;
  }[];
  semaforo: string;
}

export class ExcelInfo {
  cod1;
  cod2;
  cod3;
  cod4;
  cod5;
  cod6;
  cod7;
  cod11;
  cod12;
  cod14;
  cod1305;
  cod41;
  actCor;
  pasCor;
  sumAct;
  sumPas;

  margenNeto;
  margenBruto;
  rActivos;
  rPatrimonio;
  liquidezCorriente;
  liquidezInmediata;
  liquidezTotal;
  ratio;
  endeudamientoTotal;
  rotInventarios;
  rotCobrar;
  rotPagar;
  rotActivos;
  rotInventario;


  setVal(data: Item[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].codigo == '1') {
        this.cod1 = data[i].saldo;
      }
      if (data[i].codigo == '2') {
        this.cod2 = data[i].saldo;
      }
      if (data[i].codigo == '3') {
        this.cod3 = data[i].saldo;
      }
      if (data[i].codigo == '4') {
        this.cod4 = data[i].saldo;
      }
      if (data[i].codigo == '5') {
        this.cod5 = data[i].saldo;
      }
      if (data[i].codigo == '6') {
        this.cod6 = data[i].saldo;
      }
      if (data[i].codigo == '7') {
        this.cod7 = data[i].saldo;
      }
      if (data[i].codigo == '11') {
        this.cod11 = data[i].saldo;
      }
      if (data[i].codigo == '12') {
        this.cod12 = data[i].saldo;
      }
      if (data[i].codigo == '14') {
        this.cod14 = data[i].saldo;
      }
      if (data[i].codigo == '41') {
        this.cod41 = data[i].saldo;
      }
      if (
        data[i].codigo == '11' ||
        data[i].codigo == '12' ||
        data[i].codigo == '13' ||
        data[i].codigo == '14'
      ) {
        this.actCor.push(data[i].saldo);
      }
      if (
        data[i].codigo == '21' ||
        data[i].codigo == '22' ||
        data[i].codigo == '23' ||
        data[i].codigo == '24' ||
        data[i].codigo == '25'
      ) {
        this.pasCor.push(data[i].saldo);
      }
    }
    this.calcularIdicadores();
  }

  calcularIdicadores() {
    //margenUtilidad
    this.margenNeto = (this.cod41 - this.cod6 - this.cod5) / this.cod41;
    this.margenBruto = (this.cod41 - this.cod6) / this.cod41;
    this.rActivos = ((this.cod4 - (this.cod5 + this.cod6)) / this.cod1) * 100;
    this.rPatrimonio = ((this.cod4 - (this.cod5 + this.cod6)) / this.cod3) * 100;

    //Liquidez
    //no está bien seteada la suma
    this.sumAct = this.actCor
      .filter((item) => item.tax === '25.00')
      .reduce((sum, current) => sum + current.total, 0);
    this.sumPas = this.pasCor
      .filter((item) => item.tax === '25.00')
      .reduce((sum, current) => sum + current.total, 0);
    this.liquidezCorriente = (this.sumAct / this.sumPas) * 100;
   
    this.liquidezInmediata = ((this.cod11 * this.cod12) / this.sumPas) * 100;

    this.liquidezTotal = (this.cod1 / this.pasCor) * 100;

    //solvencia
    this.ratio = this.cod1 / this.cod2;

    //endeudamiento
    this.endeudamientoTotal = this.cod2 / this.cod1;

    //eficiencia
    this.rotInventarios = (this.cod6 + this.cod7) / this.cod14;
    this.rotCobrar = (this.cod41 - this.cod1305) / this.cod1305;
    this.rotPagar = (this.cod6 + this.cod7) / this.cod1305;
    this.rotActivos = this.cod41 / this.cod1;
    this.rotInventario = this.cod41 / this.cod14;
  }
}
