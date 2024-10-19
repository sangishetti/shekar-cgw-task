import { LightningElement, track, api } from 'lwc';
import ECLogo from "@salesforce/resourceUrl/ECLogo";
import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';
import registerPDF from '@salesforce/resourceUrl/registerPDF';
export default class RegistrationWithAccount extends LightningElement {
    @api accountNumber
    @api emailAddress
    @api postalCode
    @track accountNumber;
    @track postalCode;
    @track emailAddress;
    @api agreeTerms = false;
    imageUrl = ECLogo;
    @track isModalOpen = false;
    @track showModal = false;
    emailField= false;
    postalCodeField= false;
    pdfUrl = registerPDF;
    @api Error1;
    @api enableLink;
    @api
    availableActions = [];
    postalCodeErrorMsg;
    PoseCodeFormatError= false;
    checkLink = false;
    isModalPDF = false;

    connectedCallback(){
    
        if(this.enableLink == 'yes'){
            this.checkLink = true;
            alert(this.enableLink);
        }
    }

    handleAccountNumberChange(event){
        this.accountNumber = event.target.value;
        console.log('accountnumber',this.accountNumber);

        // if(this.email){
        //     this.usernameField = false;
        // }else{
        //     this.usernameField= true;
        // }
    }

    handlePostalCodeChange(event){
        let value = event.target.value.toUpperCase(); // Convert to uppercase
        value = value.replace(/\s+/g, ''); // Remove any spaces

        if (value.length > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        }
        this.postalCode = value;
        const postalCodePattern = /^[A-Z0-9]{3} [A-Z0-9]{3}$/;
        console.log(postalCodePattern.test(this.postalCode.toUpperCase()));
        if(!postalCodePattern.test(this.postalCode.toUpperCase())){
            this.PoseCodeFormatError = true;
        }else{
            this.PoseCodeFormatError = false;
        }
        console.log('postalcode',this.postalCode);
        if(this.postalCode){
            this.postalCodeField = false;
        }else{
            this.postalCodeField= false;
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
    handleInputChange(event){
        this.agreeTerms = event.target.checked;
        console.log('emailAddress',this.agreeTerms);
       
    }

    // handleInputChange(event) {
    //     const field = event.currentTarget.dataset.fieldIdentifier;
    // const value = event.target.value;
    // console.log('field: ', field ,'value: ', value);
   
    // if (field === 'accountNumber') {
    //     this.accountNumber = value;
    //     console.log( this.accountNumber);
    // } else if (field === 'postalCode') {
    //     this.postalCode = value;
    // } else if (field === 'emailAddress') {
    //     this.emailAddress = value;
    // } else if (field === 'agreeTerms') {
    //     this.agreeTerms = event.target.checked;
    // }
   
    // }
    handleSubmit(event) {
           if(!this.emailAddress || !this.postalCode){
         if(!this.emailAddress){
            this.emailField=true;    
          }else{
           this.emailField=false;    
         }
         if(!this.postalCode){
               this.postalCodeField = true;
         }else{
                this.postalCodeField = false;
           }
 
        }else{
            this.emailField = false;
            this.postalCodeField = false;
        }

    console.log('Submitting form with the following data:');
    console.log('Account Number:', this.accountNumber);
    console.log('Postal Code:', this.postalCode);
    console.log('Email Address:', this.emailAddress);

    // Create an array of input variables for the flow
    const inputVariables = [
        { name: 'accountNumber', type: 'String', value: this.accountNumber },
        { name: 'postalCode', type: 'String', value: this.postalCode },
        { name: 'emailAddress', type: 'String', value: this.emailAddress }
    ];

    console.log('Input Variables:', inputVariables);

    // Start the flow with the input variables
 //   const flowNavigationEvent = new FlowNavigationNextEvent();
  //  flowNavigationEvent.setParams({ inputVariables });
  //  this.dispatchEvent(flowNavigationEvent);
        }
         
    get isSubmitDisabled() {
        return !this.agreeTerms;
    }
   
    handleInfoClickAccount() {
        // Open modal for Account Number
        this.isModalOpen = true;
    }

    handleInfoClickPostal() {
        // Open modal for Postal Code
        this.isModalOpen = true;
    }

    handleInfoClickEmail() {
        // Open modal for Email Address
        this.isModalOpen = true;
    }

    handleCloseModal() {
        // Close modal logic
        this.isModalOpen = false;
    }


    handleGoNext() {
        if(!this.emailAddress || !this.postalCode){
            if(!this.emailAddress){
               this.emailField=true;    
             }else{
              this.emailField=false;    
            }
            if(!this.postalCode){
                  this.postalCodeField = true;
            }else{
                   this.postalCodeField = false;
              }
    
           }else{
               this.emailField = false;
               this.postalCodeField = false;
               if (this.availableActions.find((action) => action === 'NEXT')) {
                // navigate to the next screen
                const navigateNextEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(navigateNextEvent);
            }
           }
        // check if NEXT is allowed on this screen
        
    }

    handleLinkClick(){

        this.isModalPDF = true;
    }
    closeModalPDF(){
        this.isModalPDF = false;
    }

}