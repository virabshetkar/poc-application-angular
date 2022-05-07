import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CredentialModel } from '../../../core/models/credentials.model';
import { loginUser } from '../../../core/store/user/user.actions';
import { userSelector } from '../../../core/store/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  todoList: { title: string; desc: string }[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {}

  loginWithEmail(credentials: CredentialModel) {
    this.store.dispatch(loginUser({ credentials }));
  }
}
