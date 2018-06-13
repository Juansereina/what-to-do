import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map((user: firebase.User) => {
        return !!user;
      }),
      tap((authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
