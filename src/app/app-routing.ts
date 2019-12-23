


import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/header/header.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';

import { AuthGuard } from 'src/app/helpers/auth.guard';
import {ContactComponent} from './contact/contact.component';
import {BookingComponent} from './booking/booking.component';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:  'contact', component: ContactComponent},
  {path: 'booking',  component: BookingComponent}


  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
