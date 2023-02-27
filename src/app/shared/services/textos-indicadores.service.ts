import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IndicadoresHttpService } from 'src/app/shared/services/indicadores-http.service';
import { ICategoriaIndicador } from 'src/app/shared/services/types/indicadores.types';

@Injectable({ providedIn: 'root' })
export class TextosIndicadoresService {
  private listaCategoriasIndicadoresSubject = new ReplaySubject<ICategoriaIndicador[]>(1);

  constructor(private _indicadoresHttpService: IndicadoresHttpService) {
    this.subscribeCategoriasIndicadores();
  }

  getCategoriasIndicadores$() {
    return this.listaCategoriasIndicadoresSubject.asObservable();
  }

  private subscribeCategoriasIndicadores() {
    return this._indicadoresHttpService
      .consultarCategoriasIndicadores()
      .subscribe((categorias) =>
        this.listaCategoriasIndicadoresSubject.next(categorias)
      );
  }
}
