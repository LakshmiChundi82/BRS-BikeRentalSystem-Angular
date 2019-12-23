import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService} from 'src/app/services/alert.service';
import {UserService} from '../services/user.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {CommonService} from '../common.service';
import {Registration} from '../models/registration';
import {ModalService} from 'ng-bootstrap-modal';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  userEmail = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  id = new FormControl();
  updateForm: FormGroup;
  updateFirstName = new FormControl('', [Validators.required]);
  updateLastName = new FormControl('', [Validators.required]);
  updateUserEmail = new FormControl('', [Validators.required]);
  updatePassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  updateId = new FormControl();

  loading = false;
  submitted = false;
  Repdata;
  data: Registration;
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private alertService: AlertService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    // redirect to home if already logged in
    this.data = new Registration();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      userEmail: this.userEmail,
      password: this.password
    });

    this.updateForm = this.formBuilder.group({
      updateId: this.updateId,
      updateFirstName: this.updateFirstName,
      updateLastName: this.updateLastName,
      updateUserEmail: this.updateUserEmail,
      updatePassword: this.updatePassword
    });
    this.commonService.getRegistration().subscribe(data1 => this.Repdata = data1);
    this.registerForm.reset(true);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const registration = new Registration();
    // this.data.id = this.id.value;
    this.data.firstName = this.firstName.value;
    this.data.lastName = this.lastName.value;
    this.data.userEmail = this.userEmail.value;
    this.data.password = this.password.value;
    this.commonService.saveRegistration(this.data)
      .subscribe(data => {
        this.commonService.getRegistration().subscribe(data1 => this.Repdata = data1);
        this.loading = false;
      });

  }

  delete(id: string) {
    this.commonService.deleteExistingRegistration(id)
      .subscribe(data => {
        this.commonService.getRegistration().subscribe(data1 => this.Repdata = data1);
      });
  }

  edit() {
    const temp = {firstName: this.updateFirstName.value, lastName: this.updateLastName.value,
      id: this.updateId.value, userEmail: this.updateUserEmail.value, password: this.updatePassword.value};
    this.commonService.updateRegistration(temp)
      .subscribe(data => {
        this.commonService.getRegistration().subscribe(data1 => this.Repdata = data1);
      });
  }

  isValid() {
    return !this.registerForm.valid;
  }

  open(content, user) {
    this.updateId.setValue(user._id);
    this.updateFirstName.setValue(user.firstName);
    this.updateLastName.setValue(user.lastName);
    this.updateUserEmail.setValue(user.userEmail);
    this.updatePassword.setValue(user.password);
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}

