import { LightningElement, api, track, wire } from 'lwc';
import ECLogo from "@salesforce/resourceUrl/ECLogo";
import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';
import { CurrentPageReference } from 'lightning/navigation';
export default class MagicLinkInputs extends LightningElement {
   
    @api emailAddress
    imageUrl = ECLogo;
    @api Error1;
    @api
    availableActions = [];
    @api clarifyId;
    @api SuccessMessage;
    showresetpassword =false;

    connectedCallback() {    
       
       this.emailAddress = this.getQueryParameter('param2');   
        this.email =  this.emailAddress;
         alert(this.emailAddress);
        this.clarifyId = this.getQueryParameter('param1');
        if(!this.Error1 && !this.SuccessMessage){
            this.handleGoNext();
        }
        else{
            if(this.Error1 == 'ResetPassword'){
                this.showresetpassword = true;
            }else{
                this.showresetpassword = false;
            }
        }
      
    }
    getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    

   
    handleGoNext() {
    
               if (this.availableActions.find((action) => action === 'NEXT')) {
                // navigate to the next screen
                const navigateNextEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(navigateNextEvent);
            }
           
        // check if NEXT is allowed on this screen
        
    }
}