import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-empresario',
  templateUrl: './datos-empresario.component.html',
  styleUrls: ['./datos-empresario.component.css']
})
export class DatosEmpresarioComponent implements OnInit {
  listEmpresas : any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
