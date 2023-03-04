import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, map, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { IDatoPuc } from './types/diccionario.types';

@Injectable({
  providedIn: 'root',
})
export class DiccionarioService {
  clasesPuc = new ReplaySubject<any>(1);

  constructor(private _firestore: AngularFirestore) {
    // this.generarPadres().subscribe();
  }

  consultarClasePuc(id: string | number) {
    return combineLatest([
      this._firestore
        .collection<IDatoPuc>('diccionario', (ref) =>
          ref.where('Codigo', '==', Number(id)).limit(1)
        )
        .get(),
      this._firestore
        .collection<IDatoPuc>('diccionario', (ref) =>
          ref.where('Codigo', '==', id.toString()).limit(1)
        )
        .get(),
    ]).pipe(
      map(
        ([query1, query2]) => query2.docs[0]?.data() || query1.docs[0]?.data()
      )
    );
  }

  consultarListaClasesHijasPuc(id: string | number) {
    return this._firestore
      .collection<IDatoPuc>('diccionario', (ref) =>
        ref.where('Padre', '==', id.toString())
      )
      .get()
      .pipe(map((query) => query.docs.map((doc) => doc.data())));
  }

  generarPadres() {
    return this._firestore
      .collection<IDatoPuc>('diccionario')
      .get()
      .pipe(
        tap((query) =>
          query.docs.forEach((doc) => {
            if (!doc.data().Padre) {
              const id = doc.data().Codigo?.toString();
              let idPadre = '';
              if (id.length === 2) {
                idPadre = id.slice(0, 1);
              } else if (id.length === 4) {
                idPadre = id.slice(0, 2);
              } else if (id.length === 6) {
                idPadre = id.slice(0, 4);
              } else if (id.length === 8) {
                idPadre = id.slice(0, 6);
              } else if (id.length === 10) {
                idPadre = id.slice(0, 8);
              } else if (id.length === 12) {
                idPadre = id.slice(0, 10);
              }
              if (idPadre) {
                doc.ref.update({ Padre: idPadre });
              }
            }
          })
        )
      );
  }
}
