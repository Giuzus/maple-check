import { NgModule } from '@angular/core';

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
import { QuestsComponent } from './components/application/quests/quests.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/application/home/home.component';
import { ApplicationComponent } from './components/application/application.component';
import { BossesComponent } from './components/application/bosses/bosses.component';
import { QuestListComponent } from './components/application/quests/quest-list/quest-list.component';
import { QuestListItemComponent } from './components/application/quests/quest-list/quest-list-item/quest-list-item.component';
import { BossListComponent } from './components/application/bosses/boss-list/boss-list.component';
import { BossListItemComponent } from './components/application/bosses/boss-list/boss-list-item/boss-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    QuestsComponent,
    HomeComponent,
    ApplicationComponent,
    BossesComponent,
    QuestListComponent,
    QuestListItemComponent,
    BossListComponent,
    BossListItemComponent
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
