import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiEndpoint: String = environment.apiEndpoint;

  constructor() { }

  public async getAuthenticatedUser() {

    await fetch(`${this.apiEndpoint}/user`);

  }

}
