import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    
    


  ],
  providers: [
    //this interceptor is used for the Authentication to be applied throughout the web app where required
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //this interceptor is used for the Error handling functionality so that every page if needed can access its functionality
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }


