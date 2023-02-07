import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-indicadores',
  templateUrl: './home-indicadores.component.html',
  styleUrls: ['./home-indicadores.component.css'],
})
export class HomeIndicadoresComponent implements OnInit {
  botonesIndicadores = [{
    nombre: 'Rentabilidad',
    ruta: 'rentabilidad',
    bgColor: 'bg-gradient-radial from-[#23DFF6] to-[#3CBEFD]'
  },{
    nombre: 'Liquidez',
    ruta: 'liquidez',
    bgColor: 'bg-gradient-radial from-[#87ADFE] to-[#ABA1FF]'
  },{
    nombre: 'Solvencia',
    ruta: 'solvencia',
    bgColor: 'bg-gradient-radial from-[#5FEBBE] to-[#57D7C9]'
  },{
    nombre: 'Endeudamiento',
    ruta: 'endeudamiento',
    bgColor: 'bg-gradient-radial from-[#FCBDCA] to-[#FAA6BA]'
  },{
    nombre: 'Eficiencia',
    ruta: 'eficiencia',
    bgColor: 'bg-gradient-radial from-[#F18AD9] to-[#D19AE1]'
  },]

  constructor() {}

  ngOnInit(): void {}
}
