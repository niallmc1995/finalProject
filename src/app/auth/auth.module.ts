import { NgModule } from "@angular/core";
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "../../../node_modules/@angular/common";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
declarations: [
    LoginComponent,
    SignupComponent
],
 imports: [
     AngularMaterialModule,
     CommonModule,
     FormsModule,
     AuthRoutingModule
 ]
})

export class AuthModule {}

// I have split the auth module from the app module purely for easy reading and clarity, specifying the elements which would be required for this module