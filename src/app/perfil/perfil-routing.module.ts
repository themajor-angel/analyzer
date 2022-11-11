import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarPerfilComponent } from "./perfil/editarperfil.component";
import { VerPerfilComponent } from "./verperfil/verperfil/verperfil.component";

const routes: Routes = [
    { path: 'editarperfil', component: EditarPerfilComponent},
    { path: 'verperfil', component: VerPerfilComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}