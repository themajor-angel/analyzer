import { Component, Input, OnInit } from '@angular/core';
import { AnalisisService } from '../analisis.service';
import { AnalisisService2 } from '../analisis2.service';

@Component({
  selector: 'app-mostrar-analisis',
  templateUrl: './mostrar-analisis.component.html',
  styleUrls: ['./mostrar-analisis.component.css']
})
export class MostrarAnalisisComponent implements OnInit {
  @Input() analisis;
  @Input() estadoResultado;

  constructor(
    private analisis_service: AnalisisService
    ) { }

  ngOnInit(): void {
    this.analisis = this.analisis_service.getAnalisis();
    this.estadoResultado = this.analisis_service.getEstadoResultado();
  }

}
