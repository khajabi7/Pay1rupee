import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { AppRoutingModule } from '../app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    QRCodeModule
  ]
})
export class PaymentModule { }
