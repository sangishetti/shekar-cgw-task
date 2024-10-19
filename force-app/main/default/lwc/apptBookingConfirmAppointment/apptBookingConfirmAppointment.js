import { LightningElement, api } from 'lwc';

export default class ApptBookingConfirmAppointment extends LightningElement {

    @api product;
    @api issue;
    @api apptSlot;
    
    confirmAppointment(){

    }
}