import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateInvoice extends NavigationMixin(LightningElement) {

        // These values can be dynamically set based on your LWC's input fields
    originRecordId = '0015g00000XU0hQAAT'; // Example record ID
    accountId = '0015g00000XU0jQAAT';    // Example Account ID
    invoiceDate = '2024-10-15';          // Example Invoice Date
    invoiceDueDate = '2024-11-15';       // Example Due Date
    childRelationshipName = 'OpportunityLineItems'; // Example Relationship Name
    lineItemDescription = 'ProductX';    // Example Description
    lineItemQuantity = 10;               // Example Quantity
    lineItemUnitPrice = 200;             // Example Unit Price

    redirectPage() {
        // // Construct the URL with query parameters
        const url = `/lightning/n/Invoice_Creation?origin_record=${this.originRecordId}&account=${this.accountId}&invoice_date=${this.invoiceDate}&invoice_due_date=${this.invoiceDueDate}&child_relationship_name=${this.childRelationshipName}&line_item_description=${this.lineItemDescription}&line_item_quantity=${this.lineItemQuantity}&line_item_unit_price=${this.lineItemUnitPrice}`;
        
        // // Redirect to the constructed URL
         window.location.href = url;


        // const url = {
        //     type: 'standard__navItemPage',  // Navigate to a custom Lightning page
        //     attributes: {
        //         apiName: 'Invoice_Creation'  // The API Name of your Invoice Creation Lightning App Page
        //     },
        //     state: {
        //         origin_record: this.originRecordId,
        //         account: this.accountId,
        //         invoice_date: this.invoiceDate,
        //         invoice_due_date: this.invoiceDueDate,
        //         child_relationship_name: this.childRelationshipName,
        //         line_item_description: this.lineItemDescription,
        //         line_item_quantity: this.lineItemQuantity,
        //         line_item_unit_price: this.lineItemUnitPrice
        //     }
        // };

        // // Navigate to the Invoice Creation page
        // this[NavigationMixin.Navigate](url);
        
    }
}