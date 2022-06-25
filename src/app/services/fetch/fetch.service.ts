import { Injectable } from '@angular/core';
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
    return this.sendRequest(url,body, "POST");
  }
  
  public async put(url: string, body: object): Promise<Response> {
    return this.sendRequest(url,body, "PUT");
  }

  public async delete(url: string, body: object): Promise<Response> {
    return this.sendRequest(url,body, "DELETE");
  }

  public async sendRequest(url: string, body: object, method: string): Promise<Response> {

    return this.fetch(`${this.apiUrl}/${url}`, {
      method: method,
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

  private async handleErrors(response: Response): Promise<Response> {
    if (response.status == 401) {
      throw new AuthError("Authentication error");
    }
    else if(!response.ok){
      let text = await response.text();
      throw new Error(text);
    }
    return response;
  }

}
