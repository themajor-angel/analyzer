import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import { AnalisisService2 } from '../analisis/analisis2.service';
import { ComparacionIndicadoresService } from '../analisis/indicadores/comparacionIndicadores.service';
import { Item } from '../analisis/item.model';
@Directive({
  selector: '[appComparativeexcel]',
  exportAs: 'comparativeexcel',
})
export class ComparativeexcelDirective {
  excelObservable: Observable<any>;
  datosNum: Item[] = [];
  datos: [] = [];
  idInput: string;
  @Output() eventEmitter = new EventEmitter();

  constructor(private analisis_service: AnalisisService2,
    private comparacionIndicadoresService:ComparacionIndicadoresService) {}

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    const file = target.files[0];

    this.excelObservable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.excelObservable.subscribe((d) => {
      this.eventEmitter.emit(d);

      //this.comparacionIndicadoresService.registrarExcel(this.idInput, d);
      this.analisisBalanceGeneral(d);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      subscriber.next(data);

      subscriber.complete();
    };
  }

  analisisBalanceGeneral(data) {
    /*switch case para las diferentes tipos de balance??*/
    for (let i = 0; i < data.length; i++) {
      if (data[i]['__EMPTY_2'] >= 1 && data[i]['__EMPTY_7'] != 0) {
        let row = {
          codigo: data[i]['__EMPTY_2'],
          nombre: data[i]['__EMPTY_3'],
          saldo: data[i]['__EMPTY_7'],
        };

        this.datosNum.push(row);
      }
      if( data[i]['__EMPTY_7'] == 0){
        if (data[i]['__EMPTY_2'].startsWith('4') || data[i]['__EMPTY_2'].startsWith('5') || data[i]['__EMPTY_2'].startsWith('6') ) {
          let row = {
            codigo: data[i]['__EMPTY_2'],
            nombre: data[i]['__EMPTY_3'],
            saldo: data[i]['__EMPTY_6'],
          };
          this.datosNum.push(row);
        }
      }
      
    }

    //this.analisis_service.generarAnalisisGeneral(this.datosNum);
    this.analisis_service.getDatosActivos(this.datosNum); 
    this.analisis_service.getDatosPasivos(this.datosNum);
    this.analisis_service.getDatosPatrimonio(this.datosNum);
    this.analisis_service.getDatosIngresos(this.datosNum);
    this.analisis_service.getDatosGastosCostos(this.datosNum);
    this.analisis_service.crearAnalisis();
    this.comparacionIndicadoresService.setVal2(this.datosNum);
  }

}
