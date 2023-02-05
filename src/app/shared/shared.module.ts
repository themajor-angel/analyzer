import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { BotonesNavegacionComponent } from './botones-navegacion/botones-navegacion.component';
import { TemplateTextoDirective } from "./directives/template-texto.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        BotonesNavegacionComponent,
        TemplateTextoDirective,
    ],
    declarations: [
        BotonesNavegacionComponent,
        TemplateTextoDirective,
    ]
})

export class SharedModule {}