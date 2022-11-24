import { Component, Input, OnInit } from '@angular/core';
import { AnalisisService } from '../analisis.service';

@Component({
  selector: 'app-mostrar-analisis',
  templateUrl: './mostrar-analisis.component.html',
  styleUrls: ['./mostrar-analisis.component.css']
})
export class MostrarAnalisisComponent implements OnInit {
  @Input() analisis;

  constructor(
    private analisis_service: AnalisisService
    ) { }

  ngOnInit(): void {
    this.analisis = this.analisis_service.getAnalisis();
  }

}
