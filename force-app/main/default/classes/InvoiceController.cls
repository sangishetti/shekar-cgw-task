public class InvoiceController {
    
     @AuraEnabled
    public static String createInvoice(String originRecordId, String accountId, Date invoiceDate, Date invoiceDueDate, 
                                       String childRelationshipName, String lineItemDescription, Integer lineItemQuantity, Decimal lineItemUnitPrice) {
                                           
		//use logic here to manipulate or create invoice                                           
        return 'Invoice Id';                                
   }

}