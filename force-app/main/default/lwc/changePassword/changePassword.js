import { LightningElement, api, track, wire } from 'lwc';
import changeUserPassword from '@salesforce/apex/newchangepasswordController.changePassword';

export default class ChangePassword extends LightningElement {
    @track oldPassword = '';
    @track newPassword = '';
    @track verifyNewPassword = '';
    @track oldPasswordInputType = 'password';
    @track newPasswordInputType = 'password';
    @track confirmpasswordInputType = 'password';
    @track oldPasswordEyeIcon = 'utility:hide';
    @track newPasswordEyeIcon = 'utility:hide';
    @track confirmedPasswordEyeIcon = 'utility:hide';
    checkConfirmpassword= false;

    handleOldPasswordChange(event) {
        this.oldPassword = event.target.value;
    }

    handleNewPasswordChange(event) {
        this.newPassword = event.target.value;
       
    }

    handleconfirmPasswordChange(event) {
        this.verifyNewPassword = event.target.value;
        if(this.confirmPassword){
            this.checkConfirmpassword = true;
        }else{
            this.checkConfirmpassword = false;
        }
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
        if (this.confirmpasswordInputType === 'password') {
            this.confirmpasswordInputType = 'text';
            this.confirmedPasswordEyeIcon = 'utility:preview';
        } else {
            this.confirmpasswordInputType = 'password';
            this.confirmedPasswordEyeIcon = 'utility:hide';
        }     
    }

    handleClick() {
        if (this.newPassword !== this.verifyNewPassword) {
            this.errorMessage = 'New password and confirm password do not match.';
            return;
        }

        changeUserPassword({ newPassword: this.newPassword, verifyNewPassword: this.verifyNewPassword, oldPassword: this.oldPassword })
            .then(result => {
                if (result === 'Password changed successfully.') {
                    alert(result);
                } else {
                    this.errorMessage = result;
                    console.error('Error changing password:', result);
                }
            })
            .catch(error => {
                this.errorMessage = 'Error changing password: ' + error.body.message;
                console.error('Error changing password:', error);
            });
    }
}