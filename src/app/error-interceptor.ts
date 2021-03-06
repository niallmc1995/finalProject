import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "../../node_modules/rxjs/operators";
import { throwError } from "../../node_modules/rxjs";
import { Injectable } from "../../node_modules/@angular/core";
import { MatDialog } from "../../node_modules/@angular/material";
import { ErrorComponent } from "./error/error.component";

//this is my error handler which is using an injectable which can be injected throughout the web application for handling any errors
//such as if the user enters in invalid information then this functionality is called to produce an error message
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private dialog: MatDialog){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let erorrMessage = " An unknown error occurred!!";
                if(error.error.message){
                    erorrMessage = error.error.message;
                }
                this.dialog.open(ErrorComponent, {data: {message: erorrMessage}});
                return throwError(error);
            })
        );
    }
}