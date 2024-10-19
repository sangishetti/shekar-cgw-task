import { LightningElement, api } from 'lwc';

export default class Signupflow extends LightningElement {
    @api flowName = 'Self_Register_Flow';

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // Flow finished successfully
            // Handle any post-flow logic here
        }
    }

    // handleFlowError(event) {
    //     // Handle flow error here
    //     console.error('Flow error: ', event.detail.error);
    // }
}