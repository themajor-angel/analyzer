import { Component, OnInit } from '@angular/core';
import { TextosIndicadoresService } from 'src/app/shared/services/textos-indicadores.service';

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

  descripcionesCategorias: Record<string, string> = {}

  constructor(private _textosIndicadoresService: TextosIndicadoresService) {}

  ngOnInit(): void {
    this.subscribeDescripcionesCategorias();
  }

  subscribeDescripcionesCategorias() {
    this._textosIndicadoresService.getCategoriasIndicadores$().subscribe(categorias => {
      this.descripcionesCategorias = categorias.reduce((a,b) => ({...a, [b.id]: b.descripcion}), {})
    })
  }
}
