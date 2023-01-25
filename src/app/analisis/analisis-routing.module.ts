import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CargaArchivosComponent } from "./carga-archivos/carga-archivos.component";
import { MostrarAnalisisComponent } from "./mostrar-analisis/mostrar-analisis.component";

const routes: Routes = [
    { path: 'cargadearchivos', component: CargaArchivosComponent},
    { path: 'mostraranalisis', component: MostrarAnalisisComponent},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AnalisisRoutingModule {}