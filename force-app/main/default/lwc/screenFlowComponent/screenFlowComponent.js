import { LightningElement,track } from 'lwc';

export default class ScreenFlowComponent extends LightningElement {

    @track options = [
        { label: 'I own the property', value: 'Option1', checked: false },
        { label: 'I rent the property', value: 'Option2', checked: false },
    ];
    @track address = {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    };

    @track address2 = {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    };

    handleCheckboxChange(event) {
        const { value, checked } = event.target;
        this.options = this.options.map(option =>
            option.value === value ? { ...option, checked } : option
        );
    }

    handleAddressChange1(event) {
   
   
    if(event.target.street){
        this.address.street = event.target.street;
    }
    if(event.target.city){
        this.address.city = event.target.city;
    }
    if(event.target.postalCode){
        this.address.postalCode = event.target.postalCode;
    }
    if(event.target.province){
        this.address.state = event.target.province;
    }
    if(event.target.country){
        this.address.country = event.target.country;
    }
        
    }

    handleAddressChange2(event) {
        if(event.target.street){
            this.address2.street = event.target.street;
        }
        if(event.target.city){
            this.address2.city = event.target.city;
        }
        if(event.target.postalCode){
            this.address2.postalCode = event.target.postalCode;
        }
        if(event.target.province){
            this.address2.state = event.target.province;           
        }
        if(event.target.country){
            this.address2.country = event.target.country;
        }
    }

    handleSyncAddressChange(event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            this.address2 = { ...this.address };
        }else{
            this.address2 = {
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            };
        }
        
    }
}