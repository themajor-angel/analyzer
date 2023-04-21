import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarPerfilComponent } from "./perfil/editarperfil.component";
import { VerPerfilComponent } from "./verperfil/verperfil/verperfil.component";
import { PerfilContableComponent } from "./perfil-contable/perfil-contable.component";
import { EditarperfilContableComponent } from "./editarperfil-contable/editarperfil-contable.component";
import { EditarempresaComponent } from "./editarempresa/editarempresa.component";
import { AddempresaComponent } from "./addempresa/addempresa.component";
import { AddusuarioComponent } from "./addusuario/addusuario.component";
import { VerAsociadosComponent } from "./ver-asociados/ver-asociados.component";
import { EditaAsociadosComponent } from "./edita-asociados/edita-asociados.component";

const routes: Routes = [
    { path: 'editarperfil', component: EditarPerfilComponent},
    { path: 'verperfil', component: VerPerfilComponent},
    { path: 'verperfilcontable', component: PerfilContableComponent},
    { path: 'editarperfilcontable', component: EditarperfilContableComponent },
    { path: 'editarempresa', component: EditarempresaComponent },
    { path: 'addempresa', component: AddempresaComponent },
    { path: 'addusuario', component: AddusuarioComponent },
    { path: 'verAsociados', component: VerAsociadosComponent },
    { path: 'editarAsociados', component: EditaAsociadosComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}