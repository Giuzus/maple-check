import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

import { environment } from 'src/environments/environment';
import { FetchService } from '../Fetch/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authenticatedUser: User;
  public authenticatedUserChanged = new EventEmitter<User>();

  constructor(private router: Router, private fetchService: FetchService) {

  }

  public async getAuthenticatedUser(): Promise<boolean> {

    let response = await this.fetchService.get(`user`);

    let isOk = response.status == 200;

    if (isOk) {
      this.authenticatedUser = await response.json();
      this.authenticatedUserChanged.emit(this.authenticatedUser);
    }

    return isOk
  }

  public async getToken(code: string): Promise<boolean> {

    let body = {
      code: code,
      redirect: environment.redirectUrl
    }

    let response = await this.fetchService.post('auth/getToken', body);

    return (response && response.status == 200);

  }

  async fetchLoginUrl(): Promise<string> {

    let response = await this.fetchService.get(`auth/authUrl?redirect=${environment.redirectUrl}`);

    let url = await response.text();

    return url;

  }

  async signIn() {
    let url = await this.fetchLoginUrl();
    location.href = url;
  }
}
