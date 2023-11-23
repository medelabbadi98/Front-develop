import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/Auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  header=new HttpResponse();
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.authService.signout();
        }else if(err instanceof HttpErrorResponse && err.status === 400){
          this.authService.signout();
         }else if(err instanceof HttpErrorResponse && err.status === 406){
          this.authService.signout();
        }
        else if(err instanceof HttpErrorResponse && err.status === 404){
          this.authService.signout();
        } 
        return throwError(err);
      })
    );
  }
}
