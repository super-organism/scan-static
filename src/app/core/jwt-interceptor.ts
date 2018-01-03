import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.injector.get(AuthService);
        const token = auth.getToken();
        if(token){
            if (!auth.isTokenExpired()){
                const JWT = `Bearer ${token}`;
                req = req.clone({
                    setHeaders: {
                        Authorization: JWT,
                    },
                });
            }else{
                auth.deleteToken()
            }
        }
        return next.handle(req);
    }
}