import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService)
    {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap({
            next: (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // process the response
                }
            },
            error: (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.authService.logout();
                    }
                }
            }
        }))
    }
}