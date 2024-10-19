import { LightningElement, api, wire } from 'lwc';
import bullet from "@salesforce/resourceUrl/bullet";
import Emailicon from "@salesforce/resourceUrl/Emailicon";
import Houseicon from "@salesforce/resourceUrl/Houseicon";
import getUserContactDetails from '@salesforce/apex/IAP_AccountController.getUserContactDetails';

export default class AccountInfo extends LightningElement {
    @api contactName = ''; 
    @api contactPhone = ''; 
    @api contactAddress = ''; 
    header = 'Change Password';

    isModalOpen = false;
    showModal = false;
    imageUrl = bullet;
    EmailUrl = Emailicon;
    HouseUrl = Houseicon;
    contact;
    showModalExit = false;
   
    @wire(getUserContactDetails)
    wiredContact({ error, data }) {
        if (data) {
            this.contact = data;

        } else if (error) {
            console.error('Error fetching user contact details: ', error);
        }
    }

     // Getter properties for easier access in the template
     get contactName() {
        return this.contact ? this.contact.Name : '';
    }

    get contactPhone() {
        return this.contact ? this.contact.Phone : '';
    }

    get contactAddress() {
        // const address = this.contact ? this.contact.MailingAddress : '';
        // console.log('Contact Address:', address);
        // return address;
        if (this.contact) {
            let address = '';
            if (this.contact.MailingStreet) {
                address += this.contact.MailingStreet + ', ';
            }
            if (this.contact.MailingCity) {
                address += this.contact.MailingCity + ', ';
            }
            if (this.contact.MailingState) {
                address += this.contact.MailingState + ' ';
            }
            if (this.contact.MailingPostalCode) {
                address += this.contact.MailingPostalCode;
            }
            return address.trim();
        }
        return '';
    } 

    handleSignOut() {
        // Logic for signing out
        console.log('Signing out...');
        this.showModalExit = true;
    }

    openModal() {
        this.showModal = true;
    }

    handleClose() {
        this.showModal = false;
    }
    saveModal() {
        // Logic to handle saving the password changes
        this.handleClose();
    }

    closeModalExit(){
        this.showModalExit = false;
    }

    handleYes(){

        
    }
}