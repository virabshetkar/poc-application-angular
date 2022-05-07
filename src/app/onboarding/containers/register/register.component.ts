import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { RegistrationModel } from '../../../core/models/registration.model';
import { registerUser } from '../../../core/store/user/user.actions';
import { userLoadingSelector } from '../../../core/store/user/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading$ = this.store.select(userLoadingSelector);

  constructor(auth: AngularFireAuth, private store: Store) {}

  ngOnInit(): void {}

  register(user: RegistrationModel) {
    this.store.dispatch(registerUser({ user }));
  }
}
