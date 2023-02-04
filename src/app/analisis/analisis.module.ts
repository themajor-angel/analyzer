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
import { TablaBalanceComponent } from "./mostrar-analisis/tabla-balance/tabla-balance.component";
import { HomeIndicadoresComponent } from "./home-indicadores/home-indicadores.component";
import { DetallesIndicadoresComponent } from "./detalles-indicadores/detalles-indicadores.component";
import { CardIndicadorComponent } from "./detalles-indicadores/card-indicador/card-indicador.component";
import { SwiperModule } from 'swiper/angular';

@NgModule({
    declarations: [
        CargaArchivosComponent,
        MostrarAnalisisComponent,
        ReadexcelDirective,
        CardBalanceComponent,
        TablaBalanceComponent,
        ComparativeexcelDirective,
        TableroComponent,
        HomeIndicadoresComponent,
        DetallesIndicadoresComponent,
        CardIndicadorComponent,
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AnalisisRoutingModule,
        SwiperModule,
    ]
})


export class AnalisisModule {

}