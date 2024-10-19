import { LightningElement, api } from 'lwc';
import ECLogo from "@salesforce/resourceUrl/ECLogo";
export default class RegistrationResendEmail extends LightningElement {
 
    imageUrl = ECLogo;
    
    @api email;
    @api forgotPasswordUrl = '/s/login/SelfRegister';

    handleGoBack() {
        // Logic for the "Go back" button
        console.log('Go back button clicked');
        // Redirect to the forgot password page
        window.location.href = this.forgotPasswordUrl;
    }
    handleResend() {
        // Logic for the "Resend" link
        console.log('Resend link clicked');
    }
 }