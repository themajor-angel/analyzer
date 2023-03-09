import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { AnalisisRoutingModule } from '../analisis-routing.module';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {
  isLoading$: Observable<boolean>;
  @Input() analisis;
  @Input() comparasion;
  completo1 = false;
  completo2 = false;
  completo3;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  fileIsUploaded1 = false;
  fileIsUploaded2 = false;

  constructor(
    private store: Store<fromRoot.State>,
    private analisis_service: AnalisisService,
    private comparacion_service: AnalisisService2,
    private router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    
  }

  onSubmit(form: NgForm, stepper){
    this.analisis = this.analisis_service.getAnalisis();
    this.completo1 = true;
    stepper.next();
  }

  onSubmitComparacion(form: NgForm, stepper){
    this.comparasion = this.comparacion_service.getAnalisis();
    this.completo2 = true;
    stepper.next();
  }

  DataFromEventEmitter(data) {
    
  }

  submit(){
    this.router.navigate(['/analisis/menu'])
  }

  fileUploaded(file1: boolean, file2: boolean){
    this.fileIsUploaded1 = file1;
    this.fileIsUploaded2 = file2;
  }
}
