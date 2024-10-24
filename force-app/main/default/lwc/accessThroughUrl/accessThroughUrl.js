import { LightningElement, wire, api } from 'lwc';
import createInvoice from '@salesforce/apex/InvoiceController.createInvoice';
import generateInvoice from '@salesforce/apex/InvoiceController.generateInvoice';
import { CurrentPageReference } from 'lightning/navigation';


export default class AccessThroughUrl extends LightningElement {
    @api recordId;
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
    hidebutton = true;

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
            this.hidebutton = false;
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
            this.getvalues();
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
                
        //this.josnFormatDetails = JSON.stringify(invoiceJson);
        console.log(this.josnFormatDetails)
     }

     redirectPage(event) {                
        if(event.target.dataset.id == 'invoicePage'){
            alert('insideit');
            this.url= `https://d5g0000050snaea2-dev-ed.preview.salesforce-experience.com/s/createinvoicepage?origin_record=${this.originRecordId}&account=${this.accountId}&invoice_date=${this.invoiceDate}&invoice_due_date=${this.invoiceDueDate}&child_relationship_name=${this.childRelationshipName}&line_item_description=${this.lineItemDescription}&line_item_quantity=${this.lineItemQuantity}&line_item_unit_price=${this.lineItemUnitPrice}`;
            this.createInvoiceLinteitem();
        }else if(event.target.dataset.id == 'showJson'){
            this.url= `https://d5g0000050snaea2-dev-ed.preview.salesforce-experience.com/s/json-page?origin_record=${this.originRecordId}&account=${this.accountId}&invoice_date=${this.invoiceDate}&invoice_due_date=${this.invoiceDueDate}&child_relationship_name=${this.childRelationshipName}&line_item_description=${this.lineItemDescription}&line_item_quantity=${this.lineItemQuantity}&line_item_unit_price=${this.lineItemUnitPrice}`;            
        }    
         
        window.location.href = this.url;
 
    }

    getvalues(){
        generateInvoice({ 
            originRecordId:this.originRecordId, 
            accountId:this.accountId, 
            invoiceDate:this.invoiceDate, 
            invoiceDueDate:this.invoiceDueDate,
            lineItemQuantity:this.lineItemQuantity
        })
        .then(result => {
            
            this.josnFormatDetails = result; // Store the JSON returned by Apex
            
            console.log(JSON.parse(result).Contact)
        })
        .catch(error => {
            console.error(error);
        });
    }

    createInvoiceLinteitem(){
        createInvoice({ 
            invoiceRecord:this.josnFormatDetails
        })
        .then(result => {
            
            this.josnFormatDetails = result; // Store the JSON returned by Apex
            
            console.log(JSON.parse(result).Contact)
        })
        .catch(error => {
            console.error(error);
        });
    }
    }