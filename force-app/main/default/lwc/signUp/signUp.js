import { LightningElement, track} from 'lwc';
import verifyAndSendEmail from '@salesforce/apex/SelfRegistrationHandlerController.verifyAndSendEmail';

export default class SignUp extends LightningElement {
    @track email = '';
    @track confirmEmail = '';
    @track firstName = '';
    @track lastName = '';
    @track streetNumber = '';
    @track streetName = '';
    @track postalCode = '';
    @track mobileNumber = '';
    @track error = '';

    handleSubmit() {
      // Clear previous errors
      this.error = '';

      // Perform validations
      if (!this.email || !this.confirmEmail || !this.firstName || !this.lastName || !this.streetNumber || !this.streetName || !this.postalCode || !this.mobileNumber) {
          this.error = 'Please fill in all fields.';
          return;
      }

      if (this.email !== this.confirmEmail) {
          this.error = 'Email addresses do not match.';
          return;
      }

      // Call Apex method for verification and email sending
      verifyAndSendEmail({ 
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          streetNumber: this.streetNumber,
          streetName: this.streetName,
          postalCode: this.postalCode,
          mobileNumber: this.mobileNumber
      })
      .then(result => {
          // Handle success response
          if (result === 'success') {
              console.log('Email has been sent successfully.');
              // You can handle success here, like showing a success message or navigating to another page
          } else {
              this.error = result;
          }
      })
      .catch(error => {
          // Handle error response
          this.error = error.body.message;
      });
    }

    handleBack() {
        // Logic to navigate back to the previous screen
    }
}