import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './models/User';
import { AuthService } from './services/auth/auth.service';
import { loadCharacters } from './state/characters/character.actions';
import { loadCompletedTasks } from './state/completedTasks/completed-task.actions';
import { loadTasks } from './state/tasks/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'maple-check';

  authenticatedUser: User;

  constructor(private authService: AuthService, private store: Store) { }
  
  ngOnInit(): void {
    this.authenticatedUser = this.authService.authenticatedUser;
    this.authService.authenticatedUserChanged.subscribe(user => this.authenticatedUser = user);

    this.store.dispatch(loadCharacters());
    this.store.dispatch(loadCompletedTasks());
    this.store.dispatch(loadTasks());
  }
}
