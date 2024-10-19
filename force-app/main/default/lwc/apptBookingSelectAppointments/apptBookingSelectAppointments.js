import { LightningElement, track, api } from 'lwc';
import problemIcon from "@salesforce/resourceUrl/EC_Problem";

export default class ApptBookingSelectAppointments extends LightningElement {

    @track recommended = true
    @track showSlots = false;
    @api selectedDate
    @track days

    imgUrl

    connectedCallback(){

        this.imgUrl = problemIcon;
    }
    

    showDateSelector(){
        this.recommended = false;
    }

    getAvailableSlots(event){
        this.selectedDate = event.target.value;
        //this.days = this.selectedDate.getDay();
        console.log(this.selectedDate, JSON.stringify(event), this.days);
        this.showSlots = true;
    }

    handleSlotSelect(event){

        this.selectedDate += ', ' + '8:00 AM - 11:00 AM';
        console.log(this.selectedDate, JSON.stringify(event), this.days);
        console.log(event.detail.value)
    }
}