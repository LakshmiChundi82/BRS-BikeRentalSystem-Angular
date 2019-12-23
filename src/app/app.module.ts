import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {appRoutingModule} from 'src/app/app-routing';
import {JwtInterceptor} from 'src/app/helpers/jwt.interceptor';
import {AppComponent} from './app.component';
import {HeaderComponent} from 'src/app/header/header.component';
import {LoginComponent} from 'src/app/login/login.component';
import {RegisterComponent} from 'src/app/register/register.component';
import {AlertComponent} from 'src/app/components/alert.component';
import {FooterComponent} from './footer/footer.component';
import {SampleComponent} from './sample/sample.component';
import {ContactComponent} from './contact/contact.component';
import {CommonService} from './common.service';
import {BookingComponent} from './booking/booking.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    FooterComponent,
    SampleComponent,
    ContactComponent,
    BookingComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    CommonService
    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
};
