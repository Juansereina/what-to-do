import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from './../environments/environment';
import { routes } from './routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListCreatorComponent } from './list/creator/list.creat.component';
import { ListComponent } from './list/list.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/users.service';
import { ListService } from './services/list.service';
import { TodoService } from './services/todos.service';

import { TodoCreatorComponent } from './todos/creator/todos.creator.component';

import { AuthGuard } from './guards/auth.guard.service';

import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCreatorComponent,
    ListComponent,
    TodoCreatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, UserService, ListService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
