import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthError } from 'src/app/models/AuthError';
import { AuthService } from '../Auth/auth.service';
import { ModalService } from '../Modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {



  constructor(private injector: Injector) { }

  handleError(error): void {

    const modalService = this.injector.get(ModalService);
    const authService = this.injector.get(AuthService);
    const zone = this.injector.get(NgZone);

    zone.run(() => {
      if (error.rejection instanceof AuthError) {
        authService.signIn();
        return;
      }
      modalService.show("ERROR", error.message);
    });

    console.error(error);

  }
}