import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrainerComponent } from './trainer/trainer.component';
import { TrainerResolver } from './trainer/trainerResolver.service';

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'profile', component: TrainerComponent, canActivate: [AuthGuard],resolve:{TrainerResolver}},
  {path:'',redirectTo: 'login',pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
