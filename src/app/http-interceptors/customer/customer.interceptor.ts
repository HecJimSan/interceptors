import { HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { BaseInterceptor } from '../base.interceptor';

@Injectable()
export class CustomerInterceptor extends BaseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'PLACE_YOUR_TOKEN_HERE'),
    });

    return next.handle(newRequest).pipe(
        catchError(this.handleError)
    );
  }
}
