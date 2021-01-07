import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

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
    this.SetHeaderTime(); //so it doesnt wait one second before showing in the first place
    
    setInterval(() => {
      this.SetHeaderTime();
    }, 1000);
  }

  private SetHeaderTime() {
    this.ServerTime = new Date().toUTCString();
  }
}
