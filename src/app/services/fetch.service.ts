import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private apiUrl: string = environment.apiEndpoint;
  
  constructor() { }

  public async get(url: string): Promise<Response> {
    return fetch(`${this.apiUrl}/${url}`, {
      credentials: 'include'
    });
  }

  public async post(url: string, body: object) {

    return fetch(`${this.apiUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });
  }

}
