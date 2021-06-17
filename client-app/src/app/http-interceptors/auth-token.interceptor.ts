import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";

@Injectable({ providedIn: 'root'})
export class AuthTokenHttpInteceptor implements HttpInterceptor {
    constructor(
        private auth: AngularFireAuth
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.idToken.pipe(take(1), switchMap(idToken => {
            let clone = req.clone();
            if (idToken) {
                clone = clone.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
            }
            return next.handle(clone);

        }));
    }
}

export const AuthTokenHttpInteceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenHttpInteceptor,
    multi: true
}