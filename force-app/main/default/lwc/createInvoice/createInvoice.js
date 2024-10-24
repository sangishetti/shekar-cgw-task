import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateInvoice extends NavigationMixin(LightningElement) {
    @api recordId;
     
    originRecordId = this.recordId;
    accountId = '0015g00000XU0jQAAT';    
    invoiceDate = '2024-10-15';          
    invoiceDueDate = '2024-11-15';       
    childRelationshipName = 'OpportunityLineItems';
    lineItemDescription = 'ProductX';  
    lineItemQuantity = 10;
    lineItemUnitPrice = 200;
    url;
    redirectPage(event) {                
        
        alert(this.recordId);
        if(event.target.dataset.id == 'invoicePage'){
            this.url= `https://d5g0000050snaea2-dev-ed.preview.salesforce-experience.com/s/createinvoicepage?origin_record=${this.originRecordId}&account=${this.accountId}&invoice_date=${this.invoiceDate}&invoice_due_date=${this.invoiceDueDate}&child_relationship_name=${this.childRelationshipName}&line_item_description=${this.lineItemDescription}&line_item_quantity=${this.lineItemQuantity}&line_item_unit_price=${this.lineItemUnitPrice}`;
        }else if(event.target.dataset.id == 'showJson'){
            this.url= `https://d5g0000050snaea2-dev-ed.preview.salesforce-experience.com/s/json-page?origin_record=`+this.recordId+`&account=AccountId&invoice_date=CloseDate&invoice_due_date=CloseDate&child_relationship_name=ContractId&line_item_description=Description&line_item_quantity=3&line_item_unit_price=3`;
        }    
         
        window.location.href = this.url;
    }

}