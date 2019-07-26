import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
/**
 * inercept the request and add header and Token
 *
 */
export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpHeader = {
      "Content-Type": "application/json"
    };

    //change the request add add the new header
    const request = req.clone({ setHeaders: httpHeader });
    return next.handle(request);
  }
}
