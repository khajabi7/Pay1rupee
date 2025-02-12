import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentModule } from './payment/payment.module';
//import { PaymentService } from './payment.service';
//import { PaymentComponent } from './payment/payment.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
   // PaymentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PaymentModule,
    AppRoutingModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
