import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { TemplateTextoDirective } from 'src/app/shared/directives/template-texto.directive';
import { ComparacionIndicadoresService } from '../indicadores/comparacionIndicadores.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
})
export class MenuPrincipalComponent implements OnInit, AfterViewInit {
  botonesIndicadores = [
    {
      ruta: '/analisis/mostraranalisis/balanceGeneral',
      bgColor: 'bg-gradient-radial from-[#23DFF6] to-[#3CBEFD]',
    },
    {
      ruta: '/analisis/mostraranalisis/estadoResultados',
      bgColor: 'bg-gradient-radial from-[#87ADFE] to-[#ABA1FF]',
    },
    {
      ruta: '/analisis/indicadores',
      bgColor: 'bg-gradient-radial from-[#5FEBBE] to-[#57D7C9]',
    },
  ];
  @ViewChildren(TemplateTextoDirective) textosMenus: QueryList<TemplateTextoDirective>;

  textosBotones: TemplateRef<any>[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private comparacionIndicadoresService: ComparacionIndicadoresService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.textosBotones.push(
      ...this.textosMenus.map((directive) => directive.templateRef)
    );
    // * cdRef se usa solo para evitar que salga el error ExpressionChangedAfterItHasBeenCheckedError en la consola
    this.cdRef.detectChanges();
  }

  get fechaHeader() {
    const fechaNueva = this.comparacionIndicadoresService.getFechasNuevo();
    return `${fechaNueva?.[2] || ''} ${fechaNueva?.[3] || ''}`
  }
}
