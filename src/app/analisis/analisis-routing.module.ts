import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CargaArchivosComponent } from "./carga-archivos/carga-archivos.component";
import { DetallesIndicadoresComponent } from "./detalles-indicadores/detalles-indicadores.component";
import { HomeIndicadoresComponent } from "./home-indicadores/home-indicadores.component";
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { MostrarAnalisisComponent } from "./mostrar-analisis/mostrar-analisis.component";

const routes: Routes = [
    { path: 'cargadearchivos', component: CargaArchivosComponent},
    { path: 'mostraranalisis/:idPuc', component: MostrarAnalisisComponent},
    { path: 'menu', component: MenuPrincipalComponent},
    { path: 'indicadores', component: HomeIndicadoresComponent, pathMatch: 'full'},
    { path: 'indicadores/:idIndicador', component: DetallesIndicadoresComponent, },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AnalisisRoutingModule {}