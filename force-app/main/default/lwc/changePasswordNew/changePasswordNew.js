import { LightningElement,track } from 'lwc';

export default class ChangePasswordNew extends LightningElement {

    @track oldPassword = '';
    @track newPassword = '';
    @track confirmPassword = '';
    @track checkConfirmpassword=false;
    
    @track oldPasswordInputType = 'password';
    @track newPasswordInputType = 'password';
    @track confirmPasswordInputType = 'password';
    
    @track oldPasswordEyeIcon = 'utility:hide';
    @track newPasswordEyeIcon = 'utility:hide';
    @track confirmPasswordEyeIcon = 'utility:hide';
   

    handleOldPasswordChange(event) {
        this.oldPassword = event.target.value;
    }

    handleNewPasswordChange(event) {
        this.newPassword = event.target.value;
        if(this.newPassword){
            this.checkConfirmpassword = true;
        }else{
            this.checkConfirmpassword = false;
        }
    }

    handleConfirmPasswordChange(event) {
        this.confirmPassword = event.target.value;
    }

    toggleOldPasswordVisibility() {
        if (this.oldPasswordInputType === 'password') {
            this.oldPasswordInputType = 'text';
            this.oldPasswordEyeIcon = 'utility:preview';
        } else {
            this.oldPasswordInputType = 'password';
            this.oldPasswordEyeIcon = 'utility:hide';
        }
    }

    toggleNewPasswordVisibility() {
        if (this.newPasswordInputType === 'password') {
            this.newPasswordInputType = 'text';
            this.newPasswordEyeIcon = 'utility:preview';
        } else {
            this.newPasswordInputType = 'password';
            this.newPasswordEyeIcon = 'utility:hide';
        }
    }

    toggleConfirmPasswordVisibility() {
        if (this.confirmPasswordInputType === 'password') {
            this.confirmPasswordInputType = 'text';
            this.confirmPasswordEyeIcon = 'utility:preview';
        } else {
            this.confirmPasswordInputType = 'password';
            this.confirmPasswordEyeIcon = 'utility:hide';
        }
    }
}