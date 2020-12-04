import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuestsComponent } from './components/quests/quests.component';
import { AuthenticationGuard } from './guards/authentication.guard';

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
        component: HomeComponent
      },
      {
        path: 'quests',
        component: QuestsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }