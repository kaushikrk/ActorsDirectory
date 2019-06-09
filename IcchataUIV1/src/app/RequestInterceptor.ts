import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { timeout } from "rxjs/operators";
import { Observable } from "rxjs";

export class RequestInterceptor implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        // request = request.clone({
        //     setHeaders:{
        //         Origin: 'https://www.icchata.com' 
        //     },
        //     withCredentials:true
        //   });
        return next.handle(request).pipe(timeout(10000));
    }
}