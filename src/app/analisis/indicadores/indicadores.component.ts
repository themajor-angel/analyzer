import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css'],
})
export class IndicadoresComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  //pensar como hacer la comparación
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
    const indice = (sumAct / sumPas) * 100

    return indice;
  }

  liquidezInmediata(cod11, cod12, pasCor) {
    const sumPas = pasCor
      .filter((item) => item.tax === '25.00')
      .reduce((sum, current) => sum + current.total, 0);
    const indice = (cod11 * cod12 / sumPas) * 100

    return indice;
  }

  liquidezTotal(cod1, pasCor){
    const indices = (cod1 / pasCor) * 100;
    return indices;
  }

  //Solvencia
  ratioSol(cod1, cod2){
    const ratio = cod1 / cod2;
    return ratio;
  }

  //Endeudamiento
  endeudamientoTotal(cod2, cod1){
    const endeudamiento = cod2 / cod1;
    return endeudamiento;
  }

  //Eficiencia
  rotInventarios(cod6, cod7, cod14){
    const rotacion = (cod6 + cod7) / cod14;
    return rotacion;
  }
  
  rotCobrar(cod41, cod1305){
    const rotacion = (cod41 - cod1305) / cod1305;
    return rotacion;
  }

  rotPagar(cod6, cod7, cod1305){
    const rotacion = (cod6 + cod7) / cod1305;
    return rotacion;
  }

  rotActivos(cod41, cod1){
    const rotacion = cod41 / cod1;
    return rotacion;
  }

  rotInventario(cod41, cod14){
    const rotacion = cod41 / cod14;
    return rotacion;
  }
}
