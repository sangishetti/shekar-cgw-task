import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import validateFields from '@salesforce/apex/RegisterMyAccountController.validateFields';
import checkExistingUser from '@salesforce/apex/RegisterMyAccountController.checkExistingUser';
import sendWelcomeMail from '@salesforce/apex/RegisterMyAccountController.sendWelcomeMail';

export default class RegisterMyAccount extends LightningElement {
    @track accountNumber = '';
    @track postalCode = '';
    @track emailAddress = '';
    @track error = '';

    handleAccountNumberChange(event) {
        this.accountNumber = event.target.value.trim().toUpperCase();
    }

    handlePostalCodeChange(event) {
        this.postalCode = event.target.value.trim().toUpperCase();
    }

    handleEmailAddressChange(event) {
        this.emailAddress = event.target.value.trim().toLowerCase();
    }

    async handleSubmit() {
        // Field validation
        if (!this.accountNumber || !this.postalCode || !this.emailAddress) {
            this.error = 'Please fill in all fields.';
            return;
        }

        // Validate fields against SFSC records
        try {
            const isValid = await validateFields({
                accountNumber: this.accountNumber,
                postalCode: this.postalCode
            });
            console.log('Validation AN:', this.accountNumber);
            console.log('Validation PC:', this.postalCode);
            console.log('Validation Status:', isValid); // Add console log here
            if (!isValid) {
                this.error = 'No matching record found.';
                return;
            }
        } catch (error) {
            console.error('Error validating fields:', error);
            this.error = 'An error occurred while validating fields.';
            return;
        }
        // Check if user already exists with this email address
        try {
            const isExistingUser = await checkExistingUser({ emailAddress: this.emailAddress });
            if (isExistingUser) {
                this.error = 'User with this email address already exists.';
                return;
            }
        } catch (error) {
            console.error('Error checking existing user:', error);
            this.error = 'An error occurred while checking existing user.';
            return;
        }

        // Send registration email to the user
        try {
            await sendWelcomeMail({ emailAddress: this.emailAddress });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account registered successfully. Please check your email for registration instructions.',
                    variant: 'success'
                })
            );
        } catch (error) {
            console.error('Error sending registration email:', error);
            this.error = 'An error occurred while sending registration email.';
            return;
        }

        // Submit successful
        this.error = ''; // Clear any previous errors
        
        // Perform any additional actions after successful submission
    }


    handleBack() {
        // Navigate back to toggle selection screen
        // Logic to navigate back to previous screen
    }
}