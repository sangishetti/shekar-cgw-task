import { LightningElement, track, api} from 'lwc';
import ECLogo from "@salesforce/resourceUrl/ECLogo";
export default class RegistrationTermsAndConditions extends LightningElement {
    @track agreeTerms = false;
    imageUrl = ECLogo;

    handleContinue() {        
        if (this.agreeTerms) {
            // Handle form submission logic here
            console.log('Form Submitted:', this.accountNumber, this.postalCode, this.email);

            const event = new CustomEvent('login', {
                detail: { agreeTerms: this.agreeTerms }
            });
            this.dispatchEvent(event);
        } else {
            alert('Please agree to the Terms and Conditions.');
        }
    }

    handleInputChange(event) {

        const field = event.target.name;
    //   if (field === 'agreeTerms') {
            this.agreeTerms = event.target.checked;          
    //    }
    }
}