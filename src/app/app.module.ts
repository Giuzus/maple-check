import { ErrorHandler, NgModule } from '@angular/core';

//Declarations
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/application/header/header.component';

//Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing.module';

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
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EditTaskComponent } from './components/application/tasks/edit-task/edit-task.component';


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
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule 
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
