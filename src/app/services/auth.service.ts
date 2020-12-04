import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private fetchService: FetchService) {

  }

  public async getAuthenticatedUser(): Promise<{ name: string }> {

    try {
      let response = await this.fetchService.get(`user`);

      let user = await response.json();

      return user

    } catch (err) {
      console.log(err);
    }
  }

  public async getToken(code: string): Promise<boolean> {

    try {

      let body = {
        code: code,
        redirect: location.origin
      }

      let response = await this.fetchService.post('auth/getToken', body);

      return response?.status == 200
    } catch (err) {
      console.error(err);
    }

  }

  async fetchLoginUrl(): Promise<string> {

    try {

      let response = await this.fetchService.get(`auth/authUrl?redirect=${location.origin}`);

      let url = await response.text();

      return url;

    } catch (err) {
      console.error(err);
    }
  }
}
