
import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.component.html',
  styleUrls: ['./verperfil.component.css']
})
export class VerPerfilComponent implements OnInit {

  constructor(
    private _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    //sacar esto del auth service #borrar
    console.log(this._perfilService.getUsuario())
  }

}
