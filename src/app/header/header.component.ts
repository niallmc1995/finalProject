
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  // here for the header component I am setting the default so that anyone who 
  //visits the site is not granted authentication until they sign up and have an account
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }


//ensuring that the user is logged in
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });


  }
// ensuring that the user is logged out when they click the logout button
  onLogout() {
    this.authService.logout();
  }
// removing their logged in subscription
  ngOnDestroy() {

    this.authListenerSubs.unsubscribe();
  }
}
