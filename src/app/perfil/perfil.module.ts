import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { PerfilRoutingModule } from "./perfil-routing.module";
import { EditarPerfilComponent } from "./perfil/editarperfil.component";
import { VerPerfilComponent } from "./verperfil/verperfil/verperfil.component";
import { PerfilContableComponent } from './perfil-contable/perfil-contable.component';
import { EditarperfilContableComponent } from './editarperfil-contable/editarperfil-contable.component';
import { EditarempresaComponent } from './editarempresa/editarempresa.component';
import { AddempresaComponent } from './addempresa/addempresa.component';
import { AddusuarioComponent } from './addusuario/addusuario.component';
import { VerAsociadosComponent } from './ver-asociados/ver-asociados.component';
import { EmpresarioComponent } from './empresario/empresario.component';
import { ContableComponent } from './contable/contable.component';
import { DatosContableComponent } from './datos-contable/datos-contable.component';
import { DatosEmpresarioComponent } from './datos-empresario/datos-empresario.component';
import { EditaAsociadosComponent } from './edita-asociados/edita-asociados.component';


@NgModule({
    declarations: [
        EditarPerfilComponent,
        VerPerfilComponent,
        PerfilContableComponent,
        EditarperfilContableComponent,
        EditarempresaComponent,
        AddempresaComponent,
        AddusuarioComponent,
        VerAsociadosComponent,
        EmpresarioComponent,
        ContableComponent,
        DatosContableComponent,
        DatosEmpresarioComponent,
        EditaAsociadosComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        PerfilRoutingModule
    ],
    bootstrap: [PerfilContableComponent, VerPerfilComponent, EditarPerfilComponent, EditarperfilContableComponent],
})


export class PerfilModule {

}