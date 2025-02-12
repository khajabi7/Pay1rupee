import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  // private upiLink: string =
  //   'upi://pay?pa=abdulsaabir@ybl&pn=Pay1Rupee&tn=1%20Rupee%20Challenge&am=1.00&cu=INR';
  private apiUrl = 'http://localhost:3000/payment';

  constructor(private http: HttpClient) {}


  // initiatePayment() {
  //   // Open UPI link in the **same tab** (Recommended for mobile)
  //   if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  //     // If on mobile, open UPI app directly
  //     window.location.href = this.upiLink;
  //   } else {
  //     // If on desktop, show a message to scan QR code or use mobile
  //     alert('Please use your mobile browser to complete the payment.');
  //   }
  // }

  // initiatePayment(): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/initiate`, {});
  // }

  verifyPayment(transactionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { transactionId });
  }

  getPaymentCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count`);
  }
}

