import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateInvoice extends NavigationMixin(LightningElement) {
     
    originRecordId = '0015g00000XU0hQAAT';
    accountId = '0015g00000XU0jQAAT';    
    invoiceDate = '2024-10-15';          
    invoiceDueDate = '2024-11-15';       
    childRelationshipName = 'OpportunityLineItems';
    lineItemDescription = 'ProductX';  
    lineItemQuantity = 10;
    lineItemUnitPrice = 200;
    url;
    redirectPage(event) {                
        if(event.target.dataset.id == 'invoicePage'){
            this.url= `https://d5g0000050snaea2-dev-ed.preview.salesforce-experience.com/s/createinvoicepage?origin_record=${this.originRecordId}&account=${this.accountId}&invoice_date=${this.invoiceDate}&invoice_due_date=${this.invoiceDueDate}&child_relationship_name=${this.childRelationshipName}&line_item_description=${this.lineItemDescription}&line_item_quantity=${this.lineItemQuantity}&line_item_unit_price=${this.lineItemUnitPrice}`;
        }else if(event.target.dataset.id == 'showJson'){
            this.url= `https://d5g0000050snaea2-dev-ed.preview.salesforce-experience.com/s/json-page?origin_record=${this.originRecordId}&account=${this.accountId}&invoice_date=${this.invoiceDate}&invoice_due_date=${this.invoiceDueDate}&child_relationship_name=${this.childRelationshipName}&line_item_description=${this.lineItemDescription}&line_item_quantity=${this.lineItemQuantity}&line_item_unit_price=${this.lineItemUnitPrice}`;
        }    
         
        window.location.href = this.url;
    }

}