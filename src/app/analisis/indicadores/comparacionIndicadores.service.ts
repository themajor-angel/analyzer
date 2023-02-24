import { LocationStrategy } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { Injectable, Output } from '@angular/core';
import { ɵɵtsModuleIndicatorApiExtractorWorkaround } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Item, Regla, ExcelInfo } from '../item.model';


@Injectable(
  {providedIn: 'root'}
)
export class ComparacionIndicadoresService {
  temp1 = new ExcelInfo()
  temp2 = new ExcelInfo()

  data1: Item[] = [];
  data2: Item[] = [];

  fecha1: [];
  fecha2: [];

  nombre1 = 'Analyzer';
  nombre2: string;

  nit1: string;
  nit2: string;

  @Output() titulo$;
  tituloPrueba = new BehaviorSubject<string>('Analyzer') ;

  $margenNeto;
  $margenBruto;
  $rActivos;
  $rPatrimonio;
  $liquidezCorriente;
  $liquidezInmmediata;
  $liquidezTotal;
  $ratio;
  $endeudamientoTotal;
  $rotInventarios;
  $rotCobrar;
  $rotPagar;
  $rotActivos;
  $rotInventario;

  indicadores = [
    {
      prop: 'margenNeto',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'margenBruto',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'rActivos',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rPatrimonio',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'liquidezCorriente',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'liquidezInmmediata',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'liquidezTotal',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'ratio',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'endeudamientoTotal',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rotInventarios',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'rotCobrar',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rotPagar',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
    {
      prop: 'rotActivos',
      status: 'Su margen no ha cambiado',
      dif: 0,
    },
    {
      prop: 'rotInventario',
      status: 'Su margen ha mejorado',
      dif: 0,
    },
  ]  
  reglas: Regla[] = []

  constructor() {}

  //agregar datos de nombre y nit de la empresa
  setVal1(data: Item[], fecha, nombre, nit ) {
    this.data1 = data;
    this.fecha1 = fecha;
    this.nombre1 = nombre;
    this.nit1 = nit;
  }

  setVal2(data: Item[], fecha, nombre, nit) {
    this.data2 = data;
    this.fecha2 = fecha;
    this.nombre2 = nombre;
    this.nit2 = nit;
    this.iniciar()
  }

  iniciar() {
    this.temp1.setVal(this.data1)
    this.temp2.setVal(this.data2)
    this.temp1.setFecha(this.fecha1)
    this.temp2.setFecha(this.fecha2)
    if(this.nombre1 == this.nombre2 && this.nit1 == this.nit2){
      this.temp1.setDatos(this.fecha1, this.nombre1, this.nit1);
      this.temp2.setDatos(this.fecha2, this.nombre1, this.nit1);
      this.titulo$ = this.nombre1;
      this.tituloPrueba.next(this.nombre1);
    } else{
      //poner error 
      console.log("Error en los archivos subidos")
    }
    this.comparar();
    console.log(this.temp1, this.temp2)
  }
  
  comparar() {
    this.indicadores.forEach(dato => {
      dato.dif = this.temp1[dato.prop] - this.temp2[dato.prop];
      if (this.temp1[dato.prop] > this.temp2[dato.prop]) {
        dato.status = 'verde';
      }
      if (this.temp1[dato.prop] === this.temp2[dato.prop]) {
        dato.status = 'amarillo';
      }
      if (this.temp1[dato.prop] < this.temp2[dato.prop]) {
        dato.status = 'rojo';
      }
    })

    console.log(this.indicadores)
  }

  eliminarExcel(id: string) {

  }

  getVal(idExcel: string, idPropiedad:string): string{
    return '42'
  }

  getAnios() {
    return ['2020', '2021', '2022']
  }

  getHijos(prop: string) {
    return ['11','12','13']
  }

}
