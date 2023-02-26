import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, shareReplay, switchMap } from 'rxjs';
import { TextosIndicadoresService } from 'src/app/shared/services/textos-indicadores.service';
import { ICategoriaIndicador, IIndicador, IIndicadorConValor } from 'src/app/shared/services/types/indicadores.types';
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
export class DetallesIndicadoresComponent implements OnInit, OnDestroy {
  @ViewChild('swiperRef') swiperRef?: SwiperComponent;
  idSeleccionado: string = '';
  idCategoria: string;
  idCategoria$: Observable<string>;
  categoria: ICategoriaIndicador;
  listaIndicadores: IIndicadorConValor[] = [];

  constructor(
    private _comparacionIndicadoresService: ComparacionIndicadoresService,
    private _textosIndicadoresService: TextosIndicadoresService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeIdCategoria();
    this.subscribeIndicadores();
    this.subscribeCategoria();
  }

  subscribeIdCategoria(): void {
    this.idCategoria$ = this._route.params.pipe(
      map((params) => params.idIndicador as string),
      shareReplay(1)
    );
    this.idCategoria$.subscribe(
      (categoriaRendimientos) =>
        (this.idCategoria = categoriaRendimientos)
    );
  }

  subscribeCategoria(): void {
    combineLatest([
      this.idCategoria$,
      this._textosIndicadoresService.getCategoriasIndicadores$(),
    ])
      .pipe(
        map(([idCategoria, listaCategorias]) =>
          listaCategorias.find((c) => c.id === idCategoria)
        )
      )
      .subscribe((categoria) => (this.categoria = categoria));
  }

  subscribeIndicadores() {
    this.idCategoria$.pipe(
      switchMap(categoria => this._comparacionIndicadoresService.getIndicadoresPorCategoria$(categoria)),
      shareReplay(1),
    ).subscribe(indicadores => {
      this.listaIndicadores = indicadores;
      this.idSeleccionado = this.listaIndicadores[0]?.id;
    });
  }

  ngOnDestroy(): void {

  }

  get indexSeleccionado() {
    return this.listaIndicadores
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
    this.idSeleccionado = this.listaIndicadores[event.activeIndex].prop;
  }

  obtenerValorAnio1(prop: string) {
    return Number(this._comparacionIndicadoresService.temp1[prop]).toFixed(2);
  }

  obtenerValorAnio2(prop: string) {
    return Number(this._comparacionIndicadoresService.temp2[prop]).toFixed(2);
  }
}
