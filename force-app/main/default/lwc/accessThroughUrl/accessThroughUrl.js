import { LightningElement, wire } from 'lwc';
import createInvoice from '@salesforce/apex/InvoiceController.createInvoice';
import { CurrentPageReference } from 'lightning/navigation';


export default class AccessThroughUrl extends LightningElement {
    originRecordId = '';
    accountId = '';
    invoiceDate = '';
    invoiceDueDate = '';
    childRelationshipName = '';
    lineItemDescription = '';
    lineItemQuantity = '';
    lineItemUnitPrice = '';

    // connectedCallback() {
    //      console.log('dfdfdf');
    //     console.log(URLSearchParams(window.location.search));
    //     const urlParams = new URLSearchParams(window.location.search);
    //     alert(urlParams.get('origin_record'));
    //     console.log('dfdfdf'+ urlParams.get('origin_record'));

    //     // Extract parameters from the URL
    //     this.originRecordId = urlParams.get('origin_record') || 'No Record ID';
    //     this.accountId = urlParams.get('account') || 'No Account ID';
    //     this.invoiceDate = urlParams.get('invoice_date') || 'No Invoice Date';
    //     this.invoiceDueDate = urlParams.get('invoice_due_date') || 'No Invoice Due Date';
    //     this.childRelationshipName = urlParams.get('child_relationship_name') || 'No Child Relationship Name';
    //     this.lineItemDescription = urlParams.get('line_item_description') || 'No Description';
    //     this.lineItemQuantity = urlParams.get('line_item_quantity') || 'No Quantity';
    //     this.lineItemUnitPrice = urlParams.get('line_item_unit_price') || 'No Unit Price';

    //     //this.createInvoiceRecord();
    // }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            const params = currentPageReference.state;
            // Assign parameters to component properties
            this.originRecordId = params.origin_record || '';
            this.accountId = params.account || '';
            this.invoiceDate = params.invoice_date || '';
            this.invoiceDueDate = params.invoice_due_date || '';
            this.childRelationshipName = params.child_relationship_name || '';
            this.lineItemDescription = params.line_item_description || '';
            this.lineItemQuantity = params.line_item_quantity || '';
            this.lineItemUnitPrice = params.line_item_unit_price || '';
            alert('-ccccccccccc-'+this.lineItemDescription);
        }
    }
    // createInvoiceRecord() {
    //     createInvoice({
    //         originRecordId: this.originRecordId,
    //         accountId: this.accountId,
    //         invoiceDate: this.invoiceDate,
    //         invoiceDueDate: this.invoiceDueDate,
    //         childRelationshipName: this.childRelationshipName,
    //         lineItemDescription: this.lineItemDescription,
    //         lineItemQuantity: this.lineItemQuantity,
    //         lineItemUnitPrice: this.lineItemUnitPrice
    //     })
    //     .then(result => {
    //        console.log('reslut' + result);
    //     })
    //     .catch(error => {
    //         console.log('error' + error.body.message);
    //     });
    // }
}