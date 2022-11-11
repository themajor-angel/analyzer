import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { PerfilRoutingModule } from "./perfil-routing.module";
import { EditarPerfilComponent } from "./perfil/editarperfil.component";
import { VerPerfilComponent } from "./verperfil/verperfil/verperfil.component";

@NgModule({
    declarations: [
        EditarPerfilComponent,
        VerPerfilComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        PerfilRoutingModule
    ]
})


export class PerfilModule {

}