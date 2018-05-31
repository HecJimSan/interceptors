import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export class BaseInterceptor {

  public handleError(responseError: HttpErrorResponse): ErrorObservable {
    let httpErrorResponse: HttpErrorResponse = null;
    if (responseError.error instanceof ErrorEvent) {
      httpErrorResponse = new HttpErrorResponse({
        url: responseError.url,
        headers: responseError.headers,
        error: responseError.error,
        status: responseError.status,
        statusText: 'A client-side or network error occurred'
      });
    } else {
      httpErrorResponse = responseError;
    }
    return ErrorObservable.create(httpErrorResponse);
  }
}
