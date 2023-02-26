import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, ReplaySubject, tap } from 'rxjs';
import { ICategoriaIndicador, IIndicador } from './types/indicadores.types';

@Injectable({
  providedIn: 'root',
})
export class IndicadoresHttpService {
  constructor(private _firestore: AngularFirestore) {}

  consultarIndicadoresPorCategoria(categoria: string) {
    return this._firestore
      .collection<IIndicador>('indicadores', (ref) =>
        ref.where('clase', '==', categoria)
      )
      .get()
      .pipe(map((query) => query.docs.map((doc) => doc.data())));
  }

  consultarCategoriasIndicadores() {
    return this._firestore
      .collection<ICategoriaIndicador>('tiposIndicadores')
      .get()
      .pipe(map((query) => query.docs.map((doc) => doc.data())));
  }
}
