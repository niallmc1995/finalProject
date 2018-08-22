import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;
  
    constructor(public authService: AuthService) {}
  
    ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
          this.isLoading = false;
        }
      );
    }

  //handling whether the information entered into the signup form is valid or not and if it is then a user will be created
    onSignup(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.isLoading = true;
      this.authService.createUser(form.value.email, form.value.password);
    }
  
    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
  }