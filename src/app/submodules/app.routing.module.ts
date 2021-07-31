import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/application/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { ApplicationComponent } from '../components/application/application.component';
import { TasksComponent } from '../components/application/tasks/tasks.component';
import { NewTaskComponent } from '../components/application/tasks/new-task/new-task.component';
import { EditTaskComponent } from '../components/application/tasks/edit-task/edit-task.component';
import { CharactersComponent } from '../components/application/characters/characters.component';
import { NewCharacterComponent } from '../components/application/characters/new-character/new-character.component';
import { EditCharacterComponent } from '../components/application/characters/edit-character/edit-character.component';

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
                children: [
                    {
                        path: 'new',
                        component: NewTaskComponent
                    },
                    {
                        path: 'edit/:id',
                        component: EditTaskComponent
                    },
                    {
                        path: '',
                        component: TasksComponent
                    }
                ]
            },
            {
                path: 'characters',
                children: [
                    {
                        path: 'new',
                        component: NewCharacterComponent
                    },
                    {
                        path: 'edit/:id',
                        component: EditCharacterComponent
                    },
                    {
                        path: '',
                        component: CharactersComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }