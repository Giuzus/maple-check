import { ErrorHandler, NgModule } from '@angular/core';

//Declarations
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/application/header/header.component';

//Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './submodules/app.routing.module';

//Providers
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/Auth/auth.service';
import { HomeComponent } from './components/application/home/home.component';
import { ApplicationComponent } from './components/application/application.component';
import { ModalComponent } from './components/modal/modal.component';
import { ErrorHandlerService } from './services/ErrorHandler/error-handler.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/Toast/toast.service';
import { TasksComponent } from './components/application/tasks/tasks.component';
import { TaskFormComponent } from './components/application/tasks/task-form/task-form.component';
import { NewTaskComponent } from './components/application/tasks/new-task/new-task.component';
import { FormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './pipes/enum-to-array/enum-to-array.pipe';
import { EditTaskComponent } from './components/application/tasks/edit-task/edit-task.component';
import { CharactersComponent } from './components/application/characters/characters.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CharacterFormComponent } from './components/application/characters/character-form/character-form.component';
import { NewCharacterComponent } from './components/application/characters/new-character/new-character.component';
import { EditCharacterComponent } from './components/application/characters/edit-character/edit-character.component';
import { CharacterTasksComponent } from './components/application/home/home-character-list-item/character-tasks/character-tasks.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { CharacterTaskListComponent } from './components/application/home/home-character-list-item/character-tasks/character-task-list/character-task-list.component';
import { CharacterListItemComponent } from './components/application/characters/character-list-item/character-list-item.component';
import { TaskListItemComponent } from './components/application/tasks/task-list-item/task-list-item.component';
import { CharacterTaskListItemComponent } from './components/application/home/home-character-list-item/character-tasks/character-task-list/character-task-list-item/character-task-list-item.component';
import { HomeCharacterListItemComponent } from './components/application/home/home-character-list-item/home-character-list-item.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { SortPipe } from './pipes/sort/sort.pipe';

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
    NewTaskComponent,
    EnumToArrayPipe,
    EditTaskComponent,
    CharactersComponent,
    LoaderComponent,
    CharacterFormComponent,
    NewCharacterComponent,
    EditCharacterComponent,
    CharacterTasksComponent,
    FilterPipe,
    CharacterTaskListComponent,
    CharacterTaskListItemComponent,
    CharacterListItemComponent,
    HomeCharacterListItemComponent,
    TaskListItemComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons)
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
