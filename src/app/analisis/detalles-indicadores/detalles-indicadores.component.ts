import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";

@Component({
  selector: 'app-detalles-indicadores',
  templateUrl: './detalles-indicadores.component.html',
  styleUrls: ['./detalles-indicadores.component.css'],
})
export class DetallesIndicadoresComponent implements OnInit {
  @ViewChild('swiperRef') swiperRef?: SwiperComponent;
  ids = ['1', '2', '3', '4'];
  idSeleccionado: string = this.ids[0];

  constructor() {}

  ngOnInit(): void {}

  get indexSeleccionado() {
    return this.ids.findIndex((id) => id === this.idSeleccionado);
  }

  onSeleccionarCard(id: string) {
    this.idSeleccionado = id;
    this.slideTo(this.indexSeleccionado)
  }

  slideTo(index: number) {
    this.swiperRef.swiperRef.slideTo(index, 500);
  }

  onSwipe(event: any) {
    this.idSeleccionado = this.ids[event.activeIndex];
  }
}
