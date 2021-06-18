import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthTokenHttpInteceptorProvider } from './http-interceptors/auth-token.interceptor';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    UsersModule,
    NgbModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SignInComponent
  ],
  providers: [
    AuthTokenHttpInteceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
