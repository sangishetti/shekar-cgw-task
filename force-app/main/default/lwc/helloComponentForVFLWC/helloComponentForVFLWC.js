import { LightningElement, track, api } from 'lwc';
import ECLogo from '@salesforce/resourceUrl/ECLogo';
import changePassword from '@salesforce/apex/setPasswordController.changePassword';

// import changePassword from '@salesforce/apex/setPasswordController.changePassword';
export default class HelloComponentForVFLWC extends LightningElement {
    @track password = '';
    @track confirmPassword = '';
    @track passwordInputType = 'password';
    @track confirmPasswordInputType = 'password';
    @track eyeIcon = 'utility:hide';
	@track eyeIcon = 'utility:preview';
    @track isPasswordTyped = false;
    @track isConfirmPasswordTyped = false;
    @track message = '';
    @track messageClass = '';
    @track iconName = '';
    @track iconClass = '';
    @track showMessage = false;
    imageUrl = ECLogo;

    connectedCallback(){

    }


    handleInput(event) {
        const inputId = event.target.dataset.id;
        const eventValue = event.detail.value;
        console.log(eventValue);
        console.log(inputId);
        if (inputId) {
            if (inputId === 'password') {
             
                if(eventValue){
                    this.isPasswordTyped = true; 
                    this.password =   eventValue; 
                }else{
                    this.isPasswordTyped = false;
                }                
            } else if (inputId === 'confirmPassword') {
                this.isConfirmPasswordTyped = true;
            }
        } else {
            if (event.target.name === 'password') {
                this.isPasswordTyped = false;
            } else if (event.target.name === 'confirmPassword') {
                this.isConfirmPasswordTyped = false;
            }
        }
    }
    handlePasswordChange(event) {
        this.password = event.target.value;
        this.checkPasswordMatch();
    }

    handleConfirmPasswordChange(event) {
        this.confirmPassword = event.target.value;
        this.checkPasswordMatch();
    }
    checkPasswordMatch() {
        if (this.password && this.confirmPassword) {
            this.showMessage = true;
            if (this.password === this.confirmPassword) {
                this.message = 'Passwords match';
                this.messageClass = 'match';
                this.iconName = 'utility:success';
                this.iconClass = 'icon-match';
            } else {
                this.message = 'Passwords do not match';
                this.messageClass = 'no-match';
                this.iconName = 'utility:error';
                this.iconClass = 'icon-no-match';
            }
        } else {
            this.showMessage = false;
        }
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
    handleConfirmPasswordFocus() {
        if (this.confirmPasswordInputType === 'password') {
            this.eyeIcon = 'utility:hide';
        } else {
            this.eyeIcon = 'utility:preview';
        }
    }
    handleConfirmPasswordBlur() {
        this.eyeIcon = 'utility:hide';
    }
    toggleConfirmPasswordVisibility() {
        if (this.confirmPasswordInputType === 'password') {
            this.confirmPasswordInputType = 'text';
        } else {
            this.confirmPasswordInputType = 'password';
        }
        

        if (this.confirmPasswordInputType === 'password') {
            this.eyeIcon = 'utility:hide';
        } else {
            this.eyeIcon = 'utility:preview';
        }
    }
    // @track password = '';
    // @track confirmPassword = '';
    
    // handlePasswordChange(event) {
    //     this.password = event.target.value;
    // }

    // handleConfirmPasswordChange(event) {
    //     this.confirmPassword = event.target.value;
    // }

    handleSubmit() {
        changePassword({ newPassword: this.password, verifyNewPassword: this.confirmPassword })
            .then(result => {
                this.message = 'Password changed successfully';
                this.messageClass = 'success';
                this.iconName = 'utility:success';
                this.iconClass = 'icon-success';
                this.showMessage = true;
                // Implement login logic here if necessary
            })
            .catch(error => {
                this.message = 'Error changing password: ' + error.body.message;
                this.messageClass = 'error';
                this.iconName = 'utility:error';
                this.iconClass = 'icon-error';
                this.showMessage = true;
            });
    }
}