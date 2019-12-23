import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from 'src/app/services/authentication.service';
import {User} from 'src/app/models/user';

import 'src/app/content/app.less';
import {CommonService} from './common.service';

// tslint:disable-next-line:component-selector
@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent implements OnInit {
  currentUser: User;
  Repdata;
  valbutton = 'Save';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private newService: CommonService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
     // this.newService.GetRegistration().subscribe(data => this.Repdata = data);
  }

  onSave = function(user, isValid: boolean) {
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
          alert(data.data);

          this.ngOnInit();
        }
        , error => this.errorMessage = error);

  };
  edit = function(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valbutton = 'Update';
  };

  delete = function(id) {
    this.newService.deleteUser(id)
      .subscribe(data => {
        alert(data.data);
        this.ngOnInit();
      }, error => this.errorMessage = error);
  };
}
