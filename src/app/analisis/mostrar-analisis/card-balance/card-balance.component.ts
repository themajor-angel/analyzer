import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-balance',
  templateUrl: './card-balance.component.html',
  styleUrls: ['./card-balance.component.css']
})
export class CardBalanceComponent implements OnInit {
  @Input() imagen: string;
  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() cuerpo: string;
  @Input() tarjetas: string[];
  @Input() color: 'red' | 'blue' = 'red';
  constructor() { }

  ngOnInit(): void {
  }

}
