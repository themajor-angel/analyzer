import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReadexcelDirective } from "../directives/readexcel.directive";
import { SharedModule } from "../shared/shared.module";
import { AnalisisRoutingModule } from "./analisis-routing.module";
import { CargaArchivosComponent } from "./carga-archivos/carga-archivos.component";

@NgModule({
    declarations: [
        CargaArchivosComponent,
        ReadexcelDirective
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