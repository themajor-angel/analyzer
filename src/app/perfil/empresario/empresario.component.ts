import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresario',
  templateUrl: './empresario.component.html',
  styleUrls: ['./empresario.component.css']
})
export class EmpresarioComponent implements OnInit {
  usuario: any[] = [];

  constructor(private _perfilService: PerfilService,
    private router: Router) { }

  ngOnInit(): void {

    // Devuelvo el usuario logueado
    this.usuario = [];
    //console.log(this._perfilService.getIDUser());
    this._perfilService.ObtenUsuario(this._perfilService.getIDUser()).subscribe(u => {
      this.usuario = u;
      //console.log(u);
    })
  }

  submit(item){
    /*this._perfilService.ObtenUsuario(item.id).subscribe(u => {
      this.usuar = u;
      //console.log(this.usuar);
      if(this.usuar[0].cargo == "Contable"){
        this.router.navigate(['/perfil/editarperfilcontable'])
      }else{
        this.router.navigate(['/perfil/editarperfil'])
      }
      //console.log(u);
    })
    console.log(this.usuar);*/
    this._perfilService.SetIDUserModificar(item.id);
    if(item.cargo == "Contable"){
        this.router.navigate(['/perfil/editarperfilcontable'])
      }else{
        this.router.navigate(['/perfil/editarperfil'])
      }
  }

}
