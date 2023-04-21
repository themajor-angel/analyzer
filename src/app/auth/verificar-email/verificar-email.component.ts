import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {
public correo : Observable<any> = this.autent.afAuth.user;
  constructor(private autent: AuthService) { }

  ngOnInit(): void {
  }

  Reenviar(){
     this.autent.EnviarVerificacionEmail();
  }

}
