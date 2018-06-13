import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { environment } from './../environments/environment';
import { routes } from './routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard.service';

import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [

BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
