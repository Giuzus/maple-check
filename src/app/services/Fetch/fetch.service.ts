import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { AuthError } from 'src/app/models/AuthError';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private apiUrl: string = environment.apiEndpoint;

  constructor() { }

  public async get(url: string): Promise<Response> {
    return this.fetch(`${this.apiUrl}/${url}`, {
      credentials: 'include'
    });
  }

  public async post(url: string, body: object): Promise<Response> {

    return this.fetch(`${this.apiUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });
  }

  private fetch(url, options): Promise<Response> {
    return fetch(url, options)
      .then(this.handleErrors)
  }

  private handleErrors(response: Response): Response {
    if (response.status == 401) {
      throw new AuthError("Auth error");
    }
    return response;
  }

}
