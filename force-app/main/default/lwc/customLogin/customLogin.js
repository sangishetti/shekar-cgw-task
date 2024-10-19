import { LightningElement, track, api, wire } from 'lwc';
import getIsUsernamePasswordEnabled from '@salesforce/apex/LoginController.getIsUsernamePasswordEnabled';
import login from '@salesforce/apex/LoginController.login';
import ECLogo from "@salesforce/resourceUrl/ECLogo";
// import LOGINHERE from '@salesforce/label/c.LOGIN_HERE';
// import PASSWORD from '@salesforce/label/c.LOGIN_PASSWORD_PLACEHOLDER';
// import LOGIN from '@salesforce/label/c.LOGIN_BUTTON_LABEL';
// import USERNAME from '@salesforce/label/c.LOGIN_USERNAME_PLACEHOLDER';


export default class CustomLogin extends LightningElement {
    isUsernamePasswordEnabled;
    username;
    password;
	@track password = '';
    @track passwordInputType = 'password';
    @track eyeIcon = 'utility:hide';
	@track eyeIcon = 'utility:preview';
    @api forgotPasswordUrl;
    @api RegisterUrl;
    imageUrl = ECLogo;

    // _password = '';
    // isLoaded = false;

    // @api
    // get password() {
    //     return this._password;
    // }

    // set password(value) {
    //     this._password = value;
    //     this.handlePasswordCheck();
    // }
  
    // label = {
    //     LOGINHERE,
    //     PASSWORD,
    //     LOGIN,
    //     USERNAME

    // };
    // handlePasswordCheck() {

    //     // Check password length
    //     if (!this._password && !this.isLoaded) {
    //         this.isLoaded = true;
    //         return;
    //     }
    //     const meetsLengthReq = this._password.length >= 8;

    //     // Check special characters
    //     const specialChars = ['!', ',', '#', '$', '%', '&', "'", '(', ')', '*', '+', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'];
    //     const hasSpecialChar = specialChars.some(char => this._password.includes(char));

    //     // Check uppercase 
    //     const hasUppercase = /[A-Z]/.test(this._password);

    //     // Update UI based on checks
    //     this.template.querySelector('p').innerText = meetsLengthReq ? '✓ At least eight characters' : 'x At least eight characters';
    //     this.template.querySelectorAll('p')[1].innerText = hasSpecialChar ? '✓ At least one special character' : 'x At least one special character';
    //     this.template.querySelectorAll('p')[2].innerText = hasUppercase ? '✓ At least one uppercase character' : 'x At least one uppercase character';

    //     this.template.querySelector('p').classList.toggle('success', meetsLengthReq);
    //     this.template.querySelectorAll('p')[1].classList.toggle('success', hasSpecialChar);
    //     this.template.querySelectorAll('p')[2].classList.toggle('success', hasUppercase);

    //     this.template.querySelector('p').classList.toggle('error', !meetsLengthReq);
    //     this.template.querySelectorAll('p')[1].classList.toggle('error', !hasSpecialChar);
    //     this.template.querySelectorAll('p')[2].classList.toggle('error', !hasUppercase);

    // }


    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handlePasswordFocus() {
        if (this.passwordInputType === 'password') {
            this.eyeIcon = 'utility:hide';
        } else {
            this.eyeIcon = 'utility:preview';
        }
    }

    handlePasswordBlur() {
        this.eyeIcon = 'utility:hide';
    }

    togglePasswordVisibility() {
        if (this.passwordInputType === 'password') {
            this.passwordInputType = 'text';
        } else {
            this.passwordInputType = 'password';
        }
        

        if (this.passwordInputType === 'password') {
            this.eyeIcon = 'utility:hide';
        } else {
            this.eyeIcon = 'utility:preview';
        }
    }
    @wire(getIsUsernamePasswordEnabled)
    wiredIsUsernamePasswordEnabled({ error, data }) {
        if (data) {
            this.isUsernamePasswordEnabled = data;
        } else if (error) {
            alert(error);
        }
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleUsernameChange(event) {
        this.username = event.target.value;
    }


    handleClick(event){
        if(this.username && this.password){
            event.preventDefault();
            login({ username: this.username, password: this.password })
                .then((result) => {
                   if (this.isValidURL(result)) {
                       window.location.href = result;
                   }
                   else {
                       alert(result);
                   }
               })
                .catch((error) => {
                   alert(error);
            });
        }
    }

    isValidURL(url) {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(url);
    }
}