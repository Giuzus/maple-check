import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { AuthError } from 'src/app/models/AuthError';
import { AuthService } from '../Auth/auth.service';
import { ModalService } from '../Modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  private modalService: ModalService;
  private authService: AuthService;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.modalService = injector.get(ModalService);
      this.authService = injector.get(AuthService);
    });

  }

  handleError(error): void {

    if (error.rejection instanceof AuthError) {
      this.modalService.show("Authentication error", "Refreshing token");

      this.authService.signIn();
      return;
    }

    this.modalService.show("ERROR", error.message)
    console.error(error);

  }
}