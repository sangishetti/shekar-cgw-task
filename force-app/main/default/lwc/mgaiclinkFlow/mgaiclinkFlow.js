import { LightningElement, api, track, wire } from 'lwc';

export default class MgaiclinkFlow extends LightningElement {

    @api emailAddress
    @api clarifyId;
    @api flowName = 'MagiclinkCustomerFlow';
    inputVariables;


    connectedCallback() {    
       
        this.emailAddress = this.getQueryParameter('param2');    
        this.clarifyId = this.getQueryParameter('param1');
    

     //   this.startFlow();
     const flowInputVariables = [
        {
            name: 'clarifyId',
           
            value: this.clarifyId
        },
        {
            name: 'emailAddress',
     
            value: this.emailAddress
        }
    ];
    this.inputVariables = flowInputVariables;

    }
    getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

 

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // Flow finished successfully
            // Handle any post-flow logic here
        }
    }


    startFlow() {
        const flow = this.template.querySelector('lightning-flow');
        const flowInputVariables = [
            {
                name: 'clarifyId',
               
                value: this.clarifyId
            },
            {
                name: 'emailAddress',
         
                value: this.emailAddress
            }
        ];
        this.inputVariables = flowInputVariables;

        if (flow) {
            flow.startFlow(this.flowName, flowInputVariables);
        }
    }

    handleFlowStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // Handle the flow finish event if needed
        }
    }

}