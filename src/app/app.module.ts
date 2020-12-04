import { NgModule } from '@angular/core';

//Declarations
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

//Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing.module';

//Providers
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login.component';
import { QuestsComponent } from './components/quests/quests.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    QuestsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
