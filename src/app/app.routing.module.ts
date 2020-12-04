import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/application/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuestsComponent } from './components/application/quests/quests.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { BossesComponent } from './components/application/bosses/bosses.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'quests',
        component: QuestsComponent
      },
      {
        path: 'bosses',
        component: BossesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }