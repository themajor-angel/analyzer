import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators, SelectControlValueAccessor, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { AnalisisRoutingModule } from '../analisis-routing.module';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';
import { Empresa, Item } from '../item.model';
import { PerfilService } from 'src/app/perfil/perfil.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Empresas, GuardaArchivosService, Usuarios} from '../guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {
  empres: Empresas[] = [];
  usua: Empresa[] = [];
  isLoading$: Observable<boolean>;
  usuario;
  @Input() analisis;
  @Input() comparasion;
  @Input() seleccion;
  myArray: any[] = [];
  miEmpresa: any[] = [];
  EsEmpresa: any[] = [];
  completo1 = false;
  completo2 = false;
  products: any;
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
  // EXCEL
  orders: Observable<any>;
  reportsRef: AngularFirestoreCollection<any>;
  reports: Observable<any>;

  constructor(
    private perfilServicio: PerfilService,
    private store: Store<fromRoot.State>,
    private analisis_service: AnalisisService,
    private comparacion_service: AnalisisService2,
    private db: AngularFirestore,
    private router: Router,
    private guardarArchivo: GuardaArchivosService,
    private _formBuilder: FormBuilder,
    private cookieService: CookieService) { 
       
    }

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  ngOnInit(): void {
        
        this.db.collection('usuarios', ref => ref.where("id", "==", this.perfilServicio.getIDUser())).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
          } else {
            ss.docs.forEach(doc => {
              this.myArray.push(doc.data());
              this.db.collection('usuario_empresa', ref => ref.where("id_usuario", "==", this.myArray[0].id)).get()
              .subscribe(ss => {
                if (ss.docs.length === 0) {
                 console.log("No esta ese id");
               } else {
                 ss.docs.forEach(doc => {
                  this.miEmpresa.push(doc.data());
                 })
                 for(let i of this.miEmpresa){
                  this.db.collection('empresas', ref => ref.where("id", "==", i.id_empresa)).get()
                    .subscribe(ss => {
                      if (ss.docs.length === 0) {
                     } else {
                       ss.docs.forEach(doc => {
                        this.EsEmpresa.push(doc.data());
                       })
                    }
                    })
                 }
              }
              })
            })
          }}
        )
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    // TRABAJO CON EXCEL
    this.orders = this.db.collection('avialableExcercises').valueChanges()
    
  }

  onChance(event){
    /*if(event){
      this.guardarArchivo.cookie_name = this.cookieService.get('userIDlog');
       this.guardarArchivo.getEmpresasUser().subscribe(items=>{
        this.usua = items;
        console.log(this.usua[0]);
       })
    }*/
    
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

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
      this.fileIsUploaded1 = true;
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.guardarArchivo.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.guardarArchivo.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
    });
  }

}
