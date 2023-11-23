import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isUserSignedin() && this.authService.getToken()) {
      const request = req.clone({
        setHeaders: {
          authorization: this.authService.getToken(),
        },
      });
      return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.authService.signout();
          }
          return throwError(err);
        })
      );
    }

    return next.handle(req);
  }
}
