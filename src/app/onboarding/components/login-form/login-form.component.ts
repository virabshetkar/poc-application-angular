import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../core/store/user/user.selectors';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() login = new EventEmitter<{ email: string; password: string }>();
  errorMessage?: string;
  loginFormGroup: FormGroup;

  user$ = this.store.select(userSelector);

  constructor(fb: FormBuilder, private store: Store) {
    this.loginFormGroup = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user.error) {
        if (user.error instanceof FirebaseError) {
          if (user.error.code === 'auth/user-not-found') {
            this.errorMessage = 'Emial not registered';
          } else if (user.error.code === 'auth/wrong-password') {
            this.errorMessage = 'Password is incorrect';
          } else if (user.error.code === 'auth/too-many-requests') {
            this.errorMessage = 'User has many failed login attempts';
          }
        }
        this.loginFormGroup.enable();
      }
    });
  }

  get emailControl() {
    return this.loginFormGroup.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginFormGroup.get('password') as FormControl;
  }

  submitForm() {
    this.loginFormGroup.disable();
    this.login.emit(this.loginFormGroup.value);
  }
}
