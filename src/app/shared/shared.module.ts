import { CommonModule, CurrencyPipe } from "@angular/common";
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
        CurrencyPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        BotonesNavegacionComponent,
        TemplateTextoDirective,
        CurrencyPipe,
    ],
    declarations: [
        BotonesNavegacionComponent,
        TemplateTextoDirective,
    ],
    providers: [
        CurrencyPipe
    ],
})

export class SharedModule {}