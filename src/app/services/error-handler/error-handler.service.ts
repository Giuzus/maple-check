import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { AuthError } from 'src/app/models/AuthError';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {



  constructor(private injector: Injector) { }

  handleError(error): void {

    const toastService = this.injector.get(ToastService);
    const authService = this.injector.get(AuthService);
    const zone = this.injector.get(NgZone);

    zone.run(() => {
      if (error.rejection instanceof AuthError) {
        authService.signIn();
        return;
      }
      toastService.show("ERROR", error.message);
    });

    console.error(error);

  }
}