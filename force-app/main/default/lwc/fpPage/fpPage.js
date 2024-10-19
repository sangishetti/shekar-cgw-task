import { LightningElement, track, api } from 'lwc';
import forgotPassword from '@salesforce/apex/LightningForgotPasswordController.forgotPassword';
import getUserByUsername from '@salesforce/apex/LoginController.getUserByUsername';

export default class FpPage extends LightningElement {
    @track username;
    @api checkEmailUrl;
    usernameField = false;
    isInvalidEmail = false;
    isUsernameEmpty = false;
    email;

    handleUsernameChange(event) {
        this.email = event.target.value;

    // Reset error flags when input is changed
    this.isInvalidEmail = false;
    this.isUsernameEmpty = false;

    if (this.email) {
        this.usernameField = false;
    } else {
        this.usernameField = true;
    }

    // Check for valid email format only if username is not empty
    if (this.email) {
        this.isInvalidEmail = !this.isValidEmail(this.username);
    }
    }

    handleResetPassword() {
        // Check if username is empty
        if (!this.email) {
            this.isUsernameEmpty = true;
            return;
        }

        // Check if email format is valid
        if (!this.isValidEmail(this.email)) {
            this.isInvalidEmail = true;
            return;
        }

        const checkEmailUrl = './CheckPasswordResetEmail';
        const baseUrl = './CheckPasswordResetEmail';
        const url = `${baseUrl}?param=${encodeURIComponent('123654789')}`;
       
        
        getUserByUsername({ email: this.email })
        .then((result) => {
            if (result){
                this.username = result.Username;
                alert(this.username);
                //   alert(this.username);
               //   event.preventDefault();
        forgotPassword({ username: this.username, checkEmailUrl: checkEmailUrl })
            .then(result => {
                if (result) {
              
                    alert(result);
                   // window.location.href = url;
                    console.log('Error resetting password:', result);
                }
            })
            .catch(error => {
                console.log('Error resetting password:', error);
            });
        }

        })
        .catch((error) => {
            console.log('Error resetting password:', error);
        })
        
    }

    isValidEmail(email) {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    get isSubmitDisabled() {
        return !this.username || this.isInvalidEmail || this.isUsernameEmpty;
    }
}