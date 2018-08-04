import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@types/selenium-webdriver/http";

@Injectable({providedIn: "root"})
export class AuthService{
    constructor(private http:HttpClient){

    }
    createUser(email: string, password: string){
        this.http.post("http://localhost:3000/api/user/signup")
    }

}