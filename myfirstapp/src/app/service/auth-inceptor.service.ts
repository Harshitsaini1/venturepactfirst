import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.info('request INTERCEPTOR is started: NOW');
    const modifiedUrl = req.clone({
      headers: req.headers.append(
        'authorization',
        localStorage.getItem('auth') || ''
      ),
    });
    console.log("inceptor running");
    console.log(localStorage.getItem('auth'));
    return next.handle(modifiedUrl).pipe(
      tap((event) => {
        console.info(event);
        console.log('Response INTERCEPTOR recieved from request');
        if (event.type == HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}