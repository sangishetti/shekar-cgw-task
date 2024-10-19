import { LightningElement, track } from 'lwc';

export default class ShowHidePassword extends LightningElement {
    // @track password = '';
    // @track passwordInputType = 'password';
    @track eyeIcon = 'utility:hide';
	@track eyeIcon = 'utility:preview';

   

    

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
   
}