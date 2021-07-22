import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/application/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ApplicationComponent } from './components/application/application.component';
import { TasksComponent } from './components/application/tasks/tasks.component';
import { NewTaskComponent } from './components/application/tasks/new-task/new-task.component';
import { EditTaskComponent } from './components/application/tasks/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthenticationGuard],
    component: ApplicationComponent,
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
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent
      },
      {
        path: 'tasks/edit/:id',
        component: EditTaskComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }