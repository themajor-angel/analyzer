import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((m) => m.PerfilModule),
      //canLoad: [AuthGuard],
    //está funcionando la autenticación?
  },
  {
    path: 'analisis',
    loadChildren: () =>
      import('./analisis/analisis.module').then((m) => m.AnalisisModule),
    // * comentado para poder probar
    canLoad: [AuthGuard],
  },
  { path: '', redirectTo: '/analisis/cargadearchivos', pathMatch:'full'},
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training.module').then((m) => m.TrainingModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
