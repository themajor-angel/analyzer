import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReadexcelDirective } from "../directives/readexcel.directive";
import { ComparativeexcelDirective } from "../directives/comparativeexcel.directive";
import { SharedModule } from "../shared/shared.module";
import { AnalisisRoutingModule } from "./analisis-routing.module";
import { CargaArchivosComponent } from "./carga-archivos/carga-archivos.component";
import { CardBalanceComponent } from './mostrar-analisis/card-balance/card-balance.component';
import { MostrarAnalisisComponent } from "./mostrar-analisis/mostrar-analisis.component";
import { TableroComponent } from './mostrar-analisis/tablero/tablero.component';

@NgModule({
    declarations: [
        CargaArchivosComponent,
        MostrarAnalisisComponent,
        ReadexcelDirective,
        CardBalanceComponent,
        ComparativeexcelDirective,
        TableroComponent,
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AnalisisRoutingModule
    ]
})


export class AnalisisModule {

}