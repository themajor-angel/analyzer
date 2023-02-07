import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[templateTexto]',
})
export class TemplateTextoDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}