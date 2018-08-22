import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from "../../../node_modules/rxjs";
import { Router } from "../../../node_modules/@angular/router";
import { environment } from "../../environments/environment";

//implementing a constant url that will be used throughout this file
const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }
//here we are handling the authentication by requiring a token
    getToken() {
        return this.token;
    }
//making sure that the user is authenticated
    getIsAuth() {
        return this.isAuthenticated;
    }
//getting their user id
    getUserId() {
        return this.userId;
    }
//returning the status as an observable as a user
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
//here I am ensuring that the requirements must be met before allowing any backend functionality to be processed
    createUser(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http
            .post(BACKEND_URL + "/signup", authData)
            .subscribe(() => {
                this.router.navigate["/"];
            }, error => {
                this.authStatusListener.next(false);
            });

    }
// handling authentication for the login functionality
    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + "/login", authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate, this.userId);
                    this.router.navigate(['/']);
                }
            }, error => {
                this.authStatusListener.next(false);
            });
    }
// here we are specifying a specific time limit for our authentication token
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }
// logging out funcitonality
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }
//here I am setting the timer for the authentication token
    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
// saving the authentication token data
    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }
// clearing the authentication token data
    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }
//retreiving the authentication data
    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}
