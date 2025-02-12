import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  template: `<h2>Welcome to Payment Page</h2>`,
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  upiLink: string = '';
  qrCodeData: string = ''; // QR Code Data
  totalCount: number = 0;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.getCount();
    this.generateUpiQr();
    // ✅ Delay transaction check so QR is shown first
  setTimeout(() => {
    this.checkForTransaction();
  }, 20000); // Wait 10 seconds before asking for transaction ID

    //this.checkForTransaction(); // Check if redirected with a transaction ID
  }

  generateUpiQr() {
    alert("flow has reached to generateUpiQr method");
    this.upiLink = encodeURI('upi://pay?pa=abdulsaabir@ybl&pn=Pay1Rupee&tn=1%20Rupee%20Challenge&am=1.00&cu=INR');

    //this.upiLink = 'upi://pay?pa=abdulsaabir@ybl&pn=Pay1Rupee&tn=1%20Rupee%20Challenge&am=1.00&cu=INR';
    this.qrCodeData = this.upiLink;

    alert("flow has reached to initiatePayment method");
    this.upiLink = encodeURI('upi://pay?pa=abdulsaabir@ybl&pn=Pay1Rupee&tn=1%20Rupee%20Challenge&am=1.00&cu=INR');
  
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      // On mobile → Open UPI app
      window.location.href = this.upiLink;

       // Check for transaction after a delay (in case redirect doesn't happen)
       setTimeout(() => {
        this.checkForTransaction();
      }, 15000); // Wait 15 seconds

    //   // 🌟 Call verifyPayment AFTER a delay (simulate user completing payment)
    // setTimeout(() => {
    //   let transactionId = prompt("Enter transaction ID from payment app:");
    //   if (transactionId) {
    //     this.verifyPayment(transactionId);
    //   }
    // }, 15000); // Wait 15 seconds, let user complete payment
 
    } else {
      // On desktop → Show message
      alert('Please use your mobile browser to complete the payment.');
    }
  }

  initiatePayment() {
    this.generateUpiQr();
  }

  // initiatePayment() {
  //   this.paymentService.initiatePayment();
  // }

  // initiatePayment() {
  //   this.paymentService.initiatePayment().subscribe(response => {
  //     this.upiLink = response.upiLink;
  //     window.open(this.upiLink, '_blank');
  //   });
  // }

  checkForTransaction() {
    alert("flow has reached to checkForTransaction method");
    // 🌟 Extract transaction ID from URL if redirected back
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('txnId'); // Adjust key based on UPI response

    if (transactionId) {
      console.log('Transaction ID:', transactionId);
      this.verifyPayment(transactionId); // Send transaction ID to the backend
    } else {
      // ✅ Wait 10s before asking manually
      setTimeout(() => {
        const manualTransactionId = prompt('Payment successful? Enter your transaction ID:');
        if (manualTransactionId) {
          this.verifyPayment(manualTransactionId);
        }
      }, 10000);
    }
    //   // Fallback: Prompt user to enter transaction ID manually
    //   const manualTransactionId = prompt('Payment successful? Enter your transaction ID:');
    //   if (manualTransactionId) {
    //     this.verifyPayment(manualTransactionId);
    //   }
    // }
  }

  verifyPayment(transactionId: string) {
    alert("flow has reached to verifyPayment method");
    this.paymentService.verifyPayment(transactionId).subscribe(response => {
      if (response.success) { // ✅ Only increment if payment is valid
        alert("Payment verified successfully! Updating count...");
        this.getCount();
      } else {
        alert("Invalid transaction ID. Please check and try again.");
      }
    });
  }

  // verifyPayment(transactionId: string) {
  //   alert("flow has reached to verifyPayment method");
  //   this.paymentService.verifyPayment(transactionId).subscribe(() => {
  //     this.getCount();
  //   });
  // }

  getCount() {
    this.paymentService.getPaymentCount().subscribe(response => {
      console.log('Payment Count:', response.totalCount); // Debug log
      this.totalCount = response.totalCount;
    });
  }
}

