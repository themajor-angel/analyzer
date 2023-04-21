import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/usuario.model';
import { PerfilService } from '../../perfil.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GuardaArchivosService } from 'src/app/analisis/guarda-archivos.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.component.html',
  styleUrls: ['./verperfil.component.css'],
})
export class VerPerfilComponent implements OnInit {
  private coleccionUsuarios: AngularFirestoreCollection<Usuario>;
  ItemUser: Observable<Usuario[]>;
  usuar: any[] = [];
  //usuario;
  usuarioData: Usuario;
  prueba: any;
  products: any;
  public cargo: any;

  constructor(
    private _perfilService: PerfilService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private gservicio: GuardaArchivosService,
    private cokie: CookieService
  ) {}

  //NuevoUsuario: Usuario = new Usuario();

  ngOnInit(): void {
       
       this.db.collection('usuarios', ref => ref.where("id", "==", this._perfilService.getIDUser())).get()
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            //console.log("Vaciooo");
          } else {
            ss.docs.forEach(doc => {
              this.usuar.push(doc.data());
              //console.log(this.usuar);
              if (this.usuar[0].cargo == 'Contable') {
                this.cargo = 1;
                // Aqui pongo la nueva ruta a la vista del contador
                //this.router.navigate(['/perfil/verperfilcontable'])
              }else{
                this.cargo = 2;
                //console.log("Empresario");
                //this.router.navigate(['/perfil/verperfil'])
              }
            })
          }}
        )
       
   //  this.getProductStock();
    
  }

  async getProductStock() {
    let supplier = await this._perfilService.getSupplier('Arts and Crafts Supplier'); 
    this.products = await this._perfilService.getProductsFromSupplier();
  }

  submit(){
    this.router.navigate(['/perfil/editarperfil'])
  }
}
