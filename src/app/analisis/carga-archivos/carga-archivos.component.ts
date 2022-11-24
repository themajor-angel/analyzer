import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { AnalisisRoutingModule } from '../analisis-routing.module';
import { AnalisisService } from '../analisis.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {
  isLoading$: Observable<boolean>;
  @Input() analisis;
 
  constructor(
    private store: Store<fromRoot.State>,
    private analisis_service: AnalisisService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    
  }

  onSubmit(form: NgForm){
    this.analisis = this.analisis_service.getAnalisis();
  }

  DataFromEventEmitter(data) {
    console.log(data);
  }

  submit(){
    this.router.navigate(['/mostraranalisis'])
  }
}
