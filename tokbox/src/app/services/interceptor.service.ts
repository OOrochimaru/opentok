import { Injectable, Injector} from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; 
@Injectable()
export class Interceptor implements HttpInterceptor{

  constructor() { 

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const headersConfig = {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        } 

        //getting token from jwtservice

        //clone the request and set the new header here 
        const request = req.clone({ setHeaders: headersConfig});
        return next.handle(request);
  }
}