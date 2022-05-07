import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustAll,
  exhaustMap,
  from,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import {
  loginFailure,
  loginSuccess,
  loginUser,
  registerFailure,
  registerSuccess,
  registerUser,
} from './user.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) =>
        this.auth.signInWithEmail(action.credentials).pipe(
          map((user) => {
            if (!user) return loginFailure({ error: 'User Not Found' });
            return loginSuccess({ user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['user']);
        }),
        catchError((error) => {
          return of(loginFailure({ error }));
        })
      ),
    { dispatch: false }
  );

  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap((action) =>
        this.auth.registerUser(action.user).pipe(
          mergeMap(() => of(registerSuccess({ error: null }))),
          catchError((error) => of(registerFailure({ error })))
        )
      )
    )
  );

  registerSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.router.navigate(['login']);
          this.snackbar.open('Registration Successful', undefined, {
            duration: 2000,
          });
        })
      ),
    { dispatch: false }
  );
  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerFailure),
        tap((error) => {
          console.log('REGISTER FAILURE');
          this.router.navigate(['error', 'register', { error }]);
        })
      ),
    { dispatch: false }
  );
}
