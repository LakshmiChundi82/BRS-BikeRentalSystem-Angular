import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  bookingForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
  }


  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      rentStart: ['', Validators.required],
      rentEnd: ['', Validators.required],
      bikeSel: ['', Validators.required],


    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.bookingForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    }

    this.loading = true;
  }

  navigateToRegistration() {
    this.router.navigateByUrl('');
  }
}
