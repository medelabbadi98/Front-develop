import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './../services/Auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ViewGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isUserSignedin())
      {
        console.log("not auth");
        this.router.navigate(['dashboard']);
        return false;
      }
    return true;
  }

}
