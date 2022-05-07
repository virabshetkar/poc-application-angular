import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  user$ = this.auth.user;

  ngOnInit(): void {}

  signOut() {
    this.auth.signOut().then(() => this.router.navigate(['login']));
  }
}
