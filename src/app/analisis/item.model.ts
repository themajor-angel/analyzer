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
  fecha = [];
  nombre: string;
  nit: string;
  cod1 = 0;
  cod2 = 0;
  cod3 = 0;
  cod4 = 0;
  cod5 = 0;
  cod6 = 0;
  cod7 = 0;
  cod11;
  cod12;
  cod14;
  cod1305;
  cod41;
  codigosExtra: Record<string, number> = {};
  actCor = [];
  pasCor = [];
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

  debeCambiarSigno(idPuc: string | number) {
    return ['2', '3'].includes(idPuc.toString().slice(0, 1));
  }

//set demás datos en una sola función? 
  setFecha(fecha: []){
    this.fecha = fecha;
  }

  setDatos(fecha: [], nombre: string, nit: string){
    this.fecha = fecha;
    this.nombre = nombre;
    this.nit = nit;
  }
  
  setVal(data: Item[]) {
    this.cod1 = 0;
    this.cod2 = 0;
    this.cod3 = 0;
    this.cod4 = 0;
    this.cod5 = 0;
    this.cod6 = 0;
    this.cod7 = 0;
    this.codigosExtra = {}
    for (let i = 0; i < data.length; i++) {
      const codigo = data[i].codigo;
      const factorSigno = this.debeCambiarSigno(codigo) ? -1 : 1
      const saldoCodigo = data[i].saldo * factorSigno;
      this.codigosExtra[`cod${codigo}`] = saldoCodigo;
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('1')) {
          this.cod1 += saldoCodigo;
        }
      }
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('2')) {
          this.cod2 += saldoCodigo;
        }
      }
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('3')) {
          this.cod3 += saldoCodigo;
        }
      }
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('4')) {
          this.cod4 += saldoCodigo;
        }
      }
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('5')) {
          this.cod5 += saldoCodigo;
        }
      }
      if (data[i].codigo.length == 2) {
        if (data[i].codigo.startsWith('6')) {
          this.cod6 += saldoCodigo;
        }
      }
      if (data[i].codigo.length == 7) {
        if (data[i].codigo.startsWith('2')) {
          this.cod7 += saldoCodigo;
        }
      }
      
      
      if (data[i].codigo == '11') {
        this.cod11 = saldoCodigo;
      }
      if (data[i].codigo == '12') {
        this.cod12 = saldoCodigo;
      }
      if (data[i].codigo == '14') {
        this.cod14 = saldoCodigo;
      }
      if (data[i].codigo == '41') {
        this.cod41 = saldoCodigo;
      }
      if (
        data[i].codigo == '11' ||
        data[i].codigo == '12' ||
        data[i].codigo == '13' ||
        data[i].codigo == '14'
      ) {
        this.actCor.push(saldoCodigo);
        //this.actCor = 20
      }
      if (
        data[i].codigo == '21' ||
        data[i].codigo == '22' ||
        data[i].codigo == '23' ||
        data[i].codigo == '24' ||
        data[i].codigo == '25'
      ) {
        this.pasCor.push(saldoCodigo);
        //this.pasCor = 20
      }
    }
    this.codigosExtra[`cod1`] = this.cod1;
    this.codigosExtra[`cod2`] = this.cod2;
    this.codigosExtra[`cod3`] = this.cod3;
    this.codigosExtra[`cod4`] = this.cod4;
    this.codigosExtra[`cod5`] = this.cod5;
    this.codigosExtra[`cod6`] = this.cod6;
    this.codigosExtra[`cod7`] = this.cod7;
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
    this.sumAct = this.actCor.reduce((a, b) => a + b, 0);
    this.sumPas = this.pasCor.reduce((a, b) => a + b, 0);

    this.liquidezCorriente = (this.sumAct / this.sumPas) * 100;
   
    this.liquidezInmediata = ((this.codigosExtra.cod11 * this.codigosExtra.cod12) / this.sumPas) * 100;

    this.liquidezTotal = (this.cod1 / this.sumPas) * 100;

    //solvencia
    this.ratio = this.cod1 / this.cod2;

    //endeudamiento
    this.endeudamientoTotal = this.cod2 / this.cod1;

    //eficiencia
    this.rotInventarios = (this.cod6 + this.cod7) / this.codigosExtra.cod14;
    this.rotCobrar = (this.codigosExtra.cod41 - this.codigosExtra.cod1305) / this.codigosExtra.cod1305;
    this.rotPagar = (this.cod6 + this.cod7) / this.codigosExtra.cod1305;
    this.rotActivos = this.codigosExtra.cod41 / this.cod1;
    this.rotInventario = this.codigosExtra.cod41 / this.codigosExtra.cod14;
  }

  getValorPorCodigo(id: string | number) {
    const prop = `cod${id}`;
    return (this.codigosExtra[prop] ?? (this[prop] as number)) ?? 0
  }
}
