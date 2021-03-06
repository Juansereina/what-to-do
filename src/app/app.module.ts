import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from './../environments/environment';
import { routes } from './routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {  OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListCreatorComponent } from './list/creator/list.creat.component';
import { ListComponent } from './list/list.component';
import { TodoCardComponent } from './todos/card/todo.card.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/users.service';
import { ListService } from './services/list.service';
import { TodoService } from './services/todos.service';
import { PushNotificationsService } from './services/push-notifications.service';

import { TodoCreatorComponent } from './todos/creator/todos.creator.component';

import { AuthGuard } from './guards/auth.guard.service';

import { TransferHttpCacheModule } from '@nguniversal/common';

const MY_MOMENT_FORMATS = {
  parseInput: 'dd, L, LT',
  fullPickerInput: 'dd, L, LT',
  datePickerInput: 'dd, L, LT',
  monthYearLabel: 'MMMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCreatorComponent,
    ListComponent,
    TodoCreatorComponent,
    TodoCardComponent
  ],
  imports: [
BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(routes, {useHash: true}),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ListService,
    TodoService,
    PushNotificationsService
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
