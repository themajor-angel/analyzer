import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';
import { AnalisisService } from '../analisis/analisis.service';
import { ComparacionIndicadoresService } from '../analisis/indicadores/comparacionIndicadores.service';
import { Item } from '../analisis/item.model';

@Directive({
  selector: '[appReadexcel]',
  exportAs: 'readexcel',
})
export class ReadexcelDirective {
  excelObservable: Observable<any>;
  datosNum: Item[] = [];
  datos: [] = [];
  idInput: string;
  @Output() eventEmitter = new EventEmitter();
  fecha: string;
  fechaArr = [];
  nombre: string;
  nit: string;

  constructor(private analisis_service: AnalisisService,
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
    this.fecha = data[3]['__EMPTY'];
    this.nombre = data[1]['__EMPTY'];
    this.nit = data[2]['__EMPTY'];

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
      console.log(this.nombre, this.nit)
    }

    //this.analisis_service.generarAnalisisGeneral(this.datosNum);
    this.analisis_service.getDatosActivos(this.datosNum); 
    this.analisis_service.getDatosPasivos(this.datosNum);
    this.analisis_service.getDatosPatrimonio(this.datosNum);
    this.analisis_service.getDatosIngresos(this.datosNum);
    this.analisis_service.getDatosGastosCostos(this.datosNum);
    this.analisis_service.crearAnalisis();
    
    this.analisis_service.setFecha(this.fecha);
    this.fechaArr = this.analisis_service.getFecha();
    //agregar datos de nombre y nit de la empresa
    this.comparacionIndicadoresService.setVal1(this.datosNum, this.fechaArr, this.nombre, this.nit);
    
  }
}
