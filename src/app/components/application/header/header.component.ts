import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }

  public Username: String;

  public ServerTime: string;

  ngOnInit(): void {

    this.startServerTimer();
    this.Username = this.authService.authenticatedUser.name;

  }

  startServerTimer() {
    setInterval(() => {

      this.ServerTime = new Date().toUTCString();

    }, 1000);
  }


}
