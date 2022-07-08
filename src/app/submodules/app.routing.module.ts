import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { ApplicationComponent } from '../components/application.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CharactersComponent } from '../components/characters/characters.component';
import { TaskFormComponent } from '../components/tasks/task-form/task-form.component';
import { CharacterFormComponent } from '../components/characters/character-form/character-form.component';
import { CharacterTasksComponent } from '../components/home/character-tasks/character-tasks.component';
import { LevelingComponent } from '../components/leveling/leveling.component';

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
                component: HomeComponent,
                children: [
                    {
                        path: ':id',
                        component: CharacterTasksComponent
                    },
                    {
                        path: '',
                        pathMatch: "full",
                        component: CharacterTasksComponent
                    }
                ]
            },
            {
                path: 'tasks',
                children: [
                    {
                        path: 'new',
                        component: TaskFormComponent
                    },
                    {
                        path: 'edit/:id',
                        component: TaskFormComponent
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
                        component: CharacterFormComponent
                    },
                    {
                        path: 'edit/:id',
                        component: CharacterFormComponent
                    },
                    {
                        path: '',
                        component: CharactersComponent
                    }
                ]
            },
            {
                path: 'leveling',
                component: LevelingComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }