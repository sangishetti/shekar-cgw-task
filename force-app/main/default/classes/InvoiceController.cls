public class InvoiceController {
    
     @AuraEnabled
    public static String createInvoice(string invoiceRecord) {
        string result;
        try{       
        Invoice invoiceObj = (Invoice) JSON.deserialize(invoiceRecord, Invoice.class);
        Insert invoiceObj;
		result = invoiceObj.Id;
                                                            
        }catch(exception ex){
            result = ex.getMessage();   
            system.debug(ex.getMessage());
        }
 	return result;                               
   }
    
        @AuraEnabled
    	public static String generateInvoice(String originRecordId, String accountId, String invoiceDate, String invoiceDueDate, string lineItemQuantity) {        
        Opportunity opp = [
            SELECT Id, Name, CloseDate,contactID, AccountId, (SELECT Description, Quantity, UnitPrice FROM OpportunityLineItems)
            FROM Opportunity
            WHERE Id = :originRecordId
        ];
        system.debug(opp.contactID);
     	List<Map<String, Object>> lineItems = new List<Map<String, Object>>();
        
        Map<String, Object> invoice = new Map<String, Object>();
        Map<String, Object> contact = new Map<String, Object>();
        if(lineItemQuantity != Null){
                 for (Integer i=0; i<=Integer.valueOf(lineItemQuantity); i++) {
            Map<String, Object> lineItem = new Map<String, Object>();
            lineItem.put('Description', 'description');
            lineItem.put('Quantity', '2');
            lineItem.put('UnitAmount', '10');
            lineItem.put('TaxType', 'OUTPUT');
            lineItem.put('TaxAmount', String.valueOf(10 * 0.15)); // Assuming 15% tax
            lineItem.put('LineAmount', String.valueOf(2 * 10));
            lineItem.put('AccountCode', '200');        
            lineItems.add(lineItem);
        }
            invoice.put('LineItems', lineItems);
        }
           
        contact.put('ContactID', opp.contactID);
        system.debug(contact);
           
        invoice.put('Type', 'ACCREC');
        invoice.put('Contact', contact);
        invoice.put('DateString', invoiceDate);
        invoice.put('DueDateString', invoiceDueDate);
        invoice.put('InvoiceNumber', opp.Id);
        invoice.put('Reference', 'Ref:' + opp.Name);
        invoice.put('BrandingThemeID', 'DefaultThemeID');        
        invoice.put('CurrencyCode', 'USD');
        invoice.put('Status', 'SUBMITTED');
        invoice.put('LineAmountTypes', 'Inclusive');      	
                
        Decimal subTotal = 0;
        Decimal totalTax = 0;
        for (Map<String, Object> item : lineItems) {
            subTotal += Decimal.valueOf((String) item.get('LineAmount'));
            totalTax += Decimal.valueOf((String) item.get('TaxAmount'));
        }        
        invoice.put('SubTotal', String.valueOf(subTotal));
        invoice.put('TotalTax', String.valueOf(totalTax));
        invoice.put('Total', String.valueOf(subTotal + totalTax));
         
        return JSON.serialize(invoice);
    }

}