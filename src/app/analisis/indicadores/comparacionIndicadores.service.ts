import { LocationStrategy } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ɵɵtsModuleIndicatorApiExtractorWorkaround } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Item, Regla, ExcelInfo } from '../item.model';


@Injectable()
export class ComparacionIndicadoresService {
  temp1 = new ExcelInfo()
  temp2 = new ExcelInfo()

  data1: Item[] = [];
  data2: Item[] = [];

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
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'margenBruto',
      verde: 'Su margen ha mejorado',
    },
    {
      prop: 'rActivos',
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'rPatrimonio',
      verde: 'Su margen ha mejorado',
    },
    {
      prop: 'liquidezCorriente',
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'liquidezInmmediata',
      verde: 'Su margen ha mejorado',
    },
    {
      prop: 'liquidezTotal',
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'ratio',
      verde: 'Su margen ha mejorado',
    },
    {
      prop: 'endeudamientoTotal',
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'rotInventarios',
      verde: 'Su margen ha mejorado',
    },
    {
      prop: 'rotCobrar',
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'rotPagar',
      verde: 'Su margen ha mejorado',
    },
    {
      prop: 'rotActivos',
      verde: 'Su margen no ha cambiado',
    },
    {
      prop: 'rotInventario',
      verde: 'Su margen ha mejorado',
    },
  ]  
  reglas: Regla[] = []

  constructor() {}

  setVal1(data: Item[]) {
    this.data1 = data;
  }

  setVal2(data: Item[]) {
    this.data2 = data;
  }

  iniciar() {
    this.temp1.setVal(this.data1)
    this.temp2.setVal(this.data2)
    this.comparar();
  }
  
  comparar() {
    this.indicadores.forEach(dato => {
      this[dato.prop] = this.temp1[dato.prop] - this.temp2[dato.prop];
      if (this.temp1[dato.prop] > this.temp2[dato.prop]) {
        this[dato.prop] = 'verde';
      }
      if (this.temp1[dato.prop] === this.temp2[dato.prop]) {
        this[dato.prop] = 'amarillo';
      }
      if (this.temp1[dato.prop] < this.temp2[dato.prop]) {
        this[dato.prop] = 'rojo';
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
