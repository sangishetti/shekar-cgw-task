import { LightningElement } from 'lwc';

export default class ApptBookingFlow extends LightningElement {

    inputVariables

    connectedCallback(){
        this.inputVariables = [{  name: 'stage', type: 'Number', value: 0}];
    }

    handleStatusChange(event){

        console.log('eventchage', JSON.stringify(event.detail))
        if (event.detail.status === "FINISHED"){
            console.log('Finished')
        }
    }
}