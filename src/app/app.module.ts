import { ErrorHandler, NgModule } from '@angular/core';

//Imports
import { FormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './submodules/app.routing.module';
import { StoreModule } from '@ngrx/store';

//Providers
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/toast/toast.service';

//Declarations
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ApplicationComponent } from './components/application.component';
import { ModalComponent } from './components/modal/modal.component';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { ToastComponent } from './components/toast/toast.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';
import { EnumToArrayPipe } from './pipes/enum-to-array/enum-to-array.pipe';
import { CharactersComponent } from './components/characters/characters.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CharacterFormComponent } from './components/characters/character-form/character-form.component';
import { CharacterTasksComponent } from './components/home/character-tasks/character-tasks.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { CharacterTaskListComponent } from './components/home/character-tasks/character-task-list/character-task-list.component';
import { CharacterListItemComponent } from './components/characters/character-list-item/character-list-item.component';
import { TaskListItemComponent } from './components/tasks/task-list-item/task-list-item.component';
import { CharacterTaskListItemComponent } from './components/home/character-tasks/character-task-list/character-task-list-item/character-task-list-item.component';
import { SortPipe } from './pipes/sort/sort.pipe';
import { EffectsModule } from '@ngrx/effects';
import { characterReducer } from './state/characters/character.reducer';
import { CharacterEffects } from './state/characters/character.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CompletedTaskEffects } from './state/completedTasks/completed-tasks.effects';
import { completedTaskReducer } from './state/completedTasks/completed-task.reducer';
import { taskReducer } from './state/tasks/task.reducer';
import { TaskEffects } from './state/tasks/task.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ApplicationComponent,
    ModalComponent,
    ToastComponent,
    TasksComponent,
    TaskFormComponent,
    EnumToArrayPipe,
    CharactersComponent,
    LoaderComponent,
    CharacterFormComponent,
    CharacterTasksComponent,
    FilterPipe,
    CharacterTaskListComponent,
    CharacterTaskListItemComponent,
    CharacterListItemComponent,
    TaskListItemComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    StoreModule.forRoot({
      characters: characterReducer,
      completedTasks: completedTaskReducer,
      tasks: taskReducer
    }, {}),
    EffectsModule.forRoot([
      CharacterEffects,
      CompletedTaskEffects,
      TaskEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    CookieService,
    AuthService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
