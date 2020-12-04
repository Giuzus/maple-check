import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {

  }

  public async signIn() {

  }

  public isAuthenticated(): boolean {

    return false;
  }

  public async getToken(code: string): Promise<boolean> {

    try {

      let response = await fetch(`${environment.apiEndpoint}/auth/getToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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

      let response = await fetch(`${environment.apiEndpoint}/auth/authUrl?redirect=${location.origin}`);

      let url = await response.text();

      return url;

    } catch (err) {
      console.error(err);
    }
  }
}
