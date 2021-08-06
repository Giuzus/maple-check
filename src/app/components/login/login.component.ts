import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public loginUrl: string;

  ngOnInit(): void {
    
    this.authService.fetchLoginUrl()
    .then((url) => {
      this.loginUrl = url;
    });
  }

  signIn() {
    location.href = this.loginUrl;
  }
}
