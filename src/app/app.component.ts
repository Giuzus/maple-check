import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'maple-check';

  authenticatedUser: User;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.authenticatedUser = this.authService.authenticatedUser;
    this.authService.authenticatedUserChanged.subscribe(user => this.authenticatedUser = user);
  }

}
