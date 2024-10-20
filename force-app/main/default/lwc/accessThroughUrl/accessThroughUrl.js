import { LightningElement, wire } from 'lwc';
import createInvoice from '@salesforce/apex/InvoiceController.createInvoice';
import { CurrentPageReference } from 'lightning/navigation';


export default class AccessThroughUrl extends LightningElement {
    invoiceDetails = false;
    josnFormat = false;
    josnFormatDetails;
    originRecordId = '';
    accountId = '';
    invoiceDate = '';
    invoiceDueDate = '';
    childRelationshipName = '';
    lineItemDescription = '';
    lineItemQuantity = '';
    lineItemUnitPrice = '';
    currentPageApiName;    
    pageName;

     connectedCallback() {
        const path = window.location.pathname;
        const pathParts = path.split('/');
        if (pathParts.includes('n') || pathParts.includes('r') || pathParts.includes('s')) {
            this.pageName = pathParts[pathParts.length - 1];        
        } else {
            this.pageName = 'Unknown Page';
        }           
        if (this.pageName === 'createinvoicepage') {
            this.invoiceDetails = true;
        } else if(this.pageName === 'json-page'){
            this.josnFormat = true;                        
        }

     }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {                
        if (currentPageReference) {            
            const params = currentPageReference.state;            
            this.originRecordId = params.origin_record || '';
            this.accountId = params.account || '';
            this.invoiceDate = params.invoice_date || '';
            this.invoiceDueDate = params.invoice_due_date || '';
            this.childRelationshipName = params.child_relationship_name || '';
            this.lineItemDescription = params.line_item_description || '';
            this.lineItemQuantity = params.line_item_quantity || '';
            this.lineItemUnitPrice = params.line_item_unit_price || '';                                               
            this.createJsonFormat();
        }
    }
    
     createJsonFormat(){
        const invoiceJson = {
            origin_record: this.originRecordId,
            account: this.account,
            invoice_date: this.invoiceDate,
            invoice_due_date: this.invoiceDueDate,
            child_relationship_name: this.childRelationshipName,
            line_item_description: this.lineItemDescription,
            line_item_quantity: this.lineItemQuantity,
            line_item_unit_price: this.lineItemUnitPrice
        };
                
        this.josnFormatDetails = JSON.stringify(invoiceJson);
        console.log(this.josnFormatDetails)
     }
}