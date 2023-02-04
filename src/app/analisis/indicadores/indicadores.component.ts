import { Component, OnInit } from '@angular/core';
import { ComparacionIndicadoresService } from './comparacionIndicadores.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css'],
})
export class IndicadoresComponent implements OnInit {
  constructor(
    private comparacionIndicadoresService:ComparacionIndicadoresService 
  ) {}

  ngOnInit(): void {
    this.comparacionIndicadoresService.iniciar();
  }
 
}
