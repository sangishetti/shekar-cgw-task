import { LightningElement, api } from 'lwc';
import problemIcon from "@salesforce/resourceUrl/EC_Problem";

export default class ApptBookingSelectProblem extends LightningElement {

    imgUrl;
    @api inputVal;
    @api stage;
    @api issues = [];
    @api problem;

    connectedCallback(){

        this.imgUrl = problemIcon;
    }

    problems = [{"image" : "image url", "name" : "Blocked Pipe"},{"image" : "image url", "name" : "Broken Pipe"},{"image" : "image url", "name" : "Slow Leak"},{"image" : "image url", "name" : "Faucet Repair"},{"image" : "image url", "name" : "High Velocity Leak"}];
    additionalDetails;

    getAdditionalDetails(event){
        this.additionalDetails = event.target.value;
        console.log(this.additionalDetails);
    }

    handleIssueSelect(event){
        console.log(JSON.stringify(event));
        this.issues.append(event.target.value);
        console.log(this.issues);
    }
}