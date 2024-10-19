import { LightningElement, api, track } from 'lwc';
import ECLogo from '@salesforce/resourceUrl/ECLogo';
import resetPassword from '@salesforce/apex/LoginController.resetPassword';
import getUserByUsername from '@salesforce/apex/LoginController.getUserByUsername';

export default class ForgotPasswordReturn extends LightningElement {
    @api username;
   @track resendLabel = 'Resend';
   // @track isResendDisabled = true;
   // resendTimer;
   @api forgotPasswordUrl = '/s/login/ForgotPassword';
   @api SigninUrl = '/s/login';
   imageUrl = ECLogo;
   @track retrievedValue = '';
   email;
   connectedCallback() {    
       this.email = this.getQueryParameter('param');    
       // this.startResendTimer();
       console.log('username in lwc:', this.email);
   }
   getQueryParameter(param) {
       const urlParams = new URLSearchParams(window.location.search);
       return urlParams.get(param);
   }
   // startResendTimer() {
   //     let counter = 15;
   //     this.resendLabel = `Resend (${counter} seconds)`;
   //     this.isResendDisabled = true;
   //     this.resendTimer = setInterval(() => {
   //         counter--;
   //         if (counter > 0) {
   //             this.resendLabel = `Resend (${counter} seconds)`;
   //         } else {
   //             clearInterval(this.resendTimer);
   //             this.resendLabel = 'Resend';
   //             this.isResendDisabled = false;
   //         }
   //     }, 1000);
   // }
   handleResend() {
       console.log('Handle resend clicked. Username:', this.email);
       // this.isResendDisabled = true;
       // this.startResendTimer();
       getUserByUsername({ email: this.email })
       .then((result) => {
           if (result){
               this.username = result.Username;
               //   alert(this.username);
                 event.preventDefault();
       resetPassword({ username: this.username })
           .then(() => {
               console.log('Password reset successful');
               // Handle success (e.g., show a success message)
           })
           .catch(error => {
               // Handle error (e.g., show an error message)
               console.error('Error resetting password:', error);
           });
        }
     });
   }
   handleGoBack() {
       console.log('Go back clicked. Redirecting to:', this.forgotPasswordUrl);
       // Redirect to the forgot password page
       window.location.href = this.forgotPasswordUrl;
   }
}