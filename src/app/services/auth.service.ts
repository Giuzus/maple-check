import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authenticatedUser: User;

  constructor(private router: Router, private fetchService: FetchService) {

  }

  public async getAuthenticatedUser(): Promise<boolean> {

    try {
      let response = await this.fetchService.get(`user`);

      this.authenticatedUser = await response.json();

      return response.status == 200;

    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public async getToken(code: string): Promise<boolean> {

    try {

      let body = {
        code: code,
        redirect: environment.redirectUrl
      }

      let response = await this.fetchService.post('auth/getToken', body);

      return (response && response.status == 200);
    } catch (err) {
      console.error(err);
    }

  }

  async fetchLoginUrl(): Promise<string> {

    try {

      let response = await this.fetchService.get(`auth/authUrl?redirect=${environment.redirectUrl}`);

      let url = await response.text();

      return url;

    } catch (err) {
      console.error(err);
    }
  }
}
