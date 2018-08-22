import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
  
]

@NgModule({
declarations: [
   
],
 imports: [
    RouterModule.forChild(routes)
 ],
 exports: [RouterModule]
})

export class AuthRoutingModule {}

//I have split this code into this file purely for ease of reading the code and to have it more legible
// it is for handling the navigation of the login component and the signup component