import { LightningElement, api } from 'lwc';

export default class RegisterWithDetails extends LightningElement {

    @api accountNumber;
    @api emailAddress;
    @api firstName;
    @api lastName;
    @api address;
    @api unitNumber;
    @api phoneNumber;

    handleChangeValue(event){
        if(event.target.dataset.id == 'firstName'){
            this.firstName = event.detail.value;
        }else if(event.target.dataset.id == 'lastName'){
            this.lastName = event.detail.value;
        }else if(event.target.dataset.id == 'address'){
            this.address = event.detail.value;
        }else if(event.target.dataset.id == 'unitNumber'){
            this.unitNumber = event.detail.value;
        }else if(event.target.dataset.id == 'phoneNumber'){
            this.phoneNumber = event.detail.value;
        }
    }

    handleEmailAddressChange(event){
        this.emailAddress = event.target.value;
        console.log('emailAddress',this.emailAddress);
        if(this.emailAddress){
            this.emailField = false;
        }else{
            this.emailField= false;
        }
    }

}