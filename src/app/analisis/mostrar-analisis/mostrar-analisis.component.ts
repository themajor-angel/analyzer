import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';

@Component({
  selector: 'app-mostrar-analisis',
  templateUrl: './mostrar-analisis.component.html',
  styleUrls: ['./mostrar-analisis.component.css']
})
export class MostrarAnalisisComponent implements OnInit {
  @Input() analisis = {} as any;
  @Input() estadoResultado = {} as any;

  constructor(
    private analisis_service: AnalisisService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.analisis = this.analisis_service.getAnalisis();
    this.estadoResultado = this.analisis_service.getEstadoResultado();
    if (!this.analisis || !this.estadoResultado) {
      this.router.navigateByUrl('/analisis/cargadearchivos')
    }
  }

}
