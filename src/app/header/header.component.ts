import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models/user';
import { UserService  } from 'src/app/services/user.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({ templateUrl: 'header.component.html' })
export class HeaderComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }
}
