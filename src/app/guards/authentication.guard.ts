import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    let code = route.queryParams.code;

    if (code) {
      await this.authService.getToken(code);
    }

    let authenticatedUser = await this.authService.getAuthenticatedUser()

    if (!authenticatedUser) {
      this.router.navigate(['login']);
      return false;
    }

    if(code)
      this.router.navigate(['/']);

    return true;
  }

}
