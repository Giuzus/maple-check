import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiEndpoint;

  constructor(private router: Router) {

  }

  public async getAuthenticatedUser(): Promise<{ name: string }> {

    try {
      let response = await fetch(`${this.apiUrl}/user`, {
        credentials: 'include'
      });

      let user = await response.json();

      return user

    } catch (err) {
      console.log(err);
    }
  }

  public async getToken(code: string): Promise<boolean> {

    try {

      let response = await fetch(`${this.apiUrl}/auth/getToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          code: code,
          redirect: location.origin
        })
      });



      return response?.status == 200
    } catch (err) {
      console.error(err);
    }

  }

  async fetchLoginUrl(): Promise<string> {

    try {

      let response = await fetch(`${this.apiUrl}/auth/authUrl?redirect=${location.origin}`);

      let url = await response.text();

      return url;

    } catch (err) {
      console.error(err);
    }
  }
}
