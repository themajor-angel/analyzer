import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
import { ComparacionIndicadoresService } from '../indicadores/comparacionIndicadores.service';

@Component({
  selector: 'app-detalles-indicadores',
  templateUrl: './detalles-indicadores.component.html',
  styleUrls: ['./detalles-indicadores.component.css'],
})
export class DetallesIndicadoresComponent implements OnInit {
  @ViewChild('swiperRef') swiperRef?: SwiperComponent;
  idSeleccionado: string = this.obtenerIndicadoresAMostrar()[0].prop;

  constructor(
    private _comparacionIndicadoresService: ComparacionIndicadoresService
  ) {}

  ngOnInit(): void {}

  get indexSeleccionado() {
    return this.obtenerIndicadoresAMostrar()
      .map(indicador => indicador.prop)
      .findIndex((id) => id === this.idSeleccionado);
  }

  onSeleccionarCard(id: string) {
    this.idSeleccionado = id;
    this.slideTo(this.indexSeleccionado)
  }

  slideTo(index: number) {
    this.swiperRef.swiperRef.slideTo(index, 500);
  }

  onSwipe(event: any) {
    this.idSeleccionado = this.obtenerIndicadoresAMostrar()[event.activeIndex].prop;
  }

  obtenerValorAnio1(prop: string) {
    return Number(this._comparacionIndicadoresService.temp1[prop]).toFixed(2);
  }

  obtenerValorAnio2(prop: string) {
    return Number(this._comparacionIndicadoresService.temp2[prop]).toFixed(2);
  }

  obtenerIndicadoresAMostrar() {
    return this._comparacionIndicadoresService.indicadores;
  }
}
