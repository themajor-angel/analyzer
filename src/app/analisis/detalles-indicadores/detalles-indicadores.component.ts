import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
import { ComparacionIndicadoresService } from '../indicadores/comparacionIndicadores.service';

const categoriasIndicadores = {
  endeudamiento: [
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
  ],
  eficiencia: [
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
  ],
  rentabilidad: [
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenBruto',
      nombre: 'Margen Bruto',
    },
  ],
  liquidez: [
    {
      id: 'liquidez',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
  ],
  solvencia: [
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
    {
      id: 'margenNeto',
      nombre: 'Margen Neto',
    },
  ],
};

@Component({
  selector: 'app-detalles-indicadores',
  templateUrl: './detalles-indicadores.component.html',
  styleUrls: ['./detalles-indicadores.component.css'],
})
export class DetallesIndicadoresComponent implements OnInit {
  @ViewChild('swiperRef') swiperRef?: SwiperComponent;
  idSeleccionado: string = this.obtenerIndicadoresAMostrar()[0].prop;
  categoriaRendimientos: string;
  categoriaRendimientos$: Observable<string>;

  constructor(
    private _comparacionIndicadoresService: ComparacionIndicadoresService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setupCategoriaRendimientos();
  }

  setupCategoriaRendimientos(): void {
    this.categoriaRendimientos$ = this._route.params.pipe(
      map((params) => params.idIndicador as string),
      shareReplay(1)
    );
    this.categoriaRendimientos$.subscribe(
      (categoriaRendimientos) =>
        (this.categoriaRendimientos = categoriaRendimientos)
    );
  }

  get indexSeleccionado() {
    return this.obtenerIndicadoresAMostrar()
      .map((indicador) => indicador.prop)
      .findIndex((id) => id === this.idSeleccionado);
  }

  onSeleccionarCard(id: string) {
    this.idSeleccionado = id;
    this.slideTo(this.indexSeleccionado);
  }

  slideTo(index: number) {
    this.swiperRef.swiperRef.slideTo(index, 500);
  }

  onSwipe(event: any) {
    this.idSeleccionado =
      this.obtenerIndicadoresAMostrar()[event.activeIndex].prop;
  }

  obtenerValorAnio1(prop: string) {
    return Number(this._comparacionIndicadoresService.temp1[prop]).toFixed(2);
  }

  obtenerValorAnio2(prop: string) {
    return Number(this._comparacionIndicadoresService.temp2[prop]).toFixed(2);
  }

  obtenerIndicadoresAMostrar() {
    return this._comparacionIndicadoresService.indicadores
    // return this._comparacionIndicadoresService.indicadores.filter((ind) =>
    //   categoriasIndicadores[this.categoriaRendimientos]
    //     .map((x) => x.id)
    //     .includes(ind)
    // );
    // return categoriasIndicadores[this.categoriaRendimientos];
  }
}
