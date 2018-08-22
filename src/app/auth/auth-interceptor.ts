import { HttpInterceptor, HttpRequest, HttpHandler } from "../../../node_modules/@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}
// here we are handling the auth token functionality when the user logs in
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authToken)
        });
        return next.handle(authRequest);
    }
}