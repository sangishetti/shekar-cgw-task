public with sharing class SelfRegistrationHandlerController {

    @AuraEnabled(cacheable=true) 
    public static String verifyAndSendEmail(String email, String firstName, String lastName, String streetNumber, String streetName, String postalCode, String mobileNumber) {
        try {
            // Convert all input strings to lowercase for comparison
            email = email.toLowerCase().trim();
            firstName = firstName.toLowerCase().trim();
            lastName = lastName.toLowerCase().trim();
            streetNumber = streetNumber.toLowerCase().trim();
            streetName = streetName.toLowerCase().trim();
            postalCode = postalCode.toLowerCase().trim();
            mobileNumber = mobileNumber.toLowerCase().trim();

            // Query Contact object to find a match
            Contact matchingContact = [SELECT Id, Email, FirstName, LastName, MailingPostalCode, MailingStreet, MobilePhone
                                       FROM Contact
                                       WHERE Email = :email
                                       AND FirstName = :firstName
                                       AND LastName = :lastName
                                       AND MailingPostalCode = :postalCode
                                       AND MailingStreet = :streetName
                                       AND MobilePhone = :mobileNumber
                                       LIMIT 1];

            return processContactAndSendEmail(matchingContact);
            //system.debug('contact' + matchingContact);
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred: ' + e.getMessage());
        }
    }

    public static String processContactAndSendEmail(Contact matchingContact) {
        if (matchingContact != null) {
            // Send email to customer
            return sendWelcomeMail(matchingContact);
        } else {
            return 'Details do not match our records. Please verify and try again.';
        }
    }

    @AuraEnabled
    public static String sendWelcomeMail(Contact matchingContact) {
        try {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

            List<EmailTemplate> welcomeTemplate = [SELECT Id FROM EmailTemplate WHERE Id = '00XDn0000021EiNMAU' LIMIT 1];

            if (!welcomeTemplate.isEmpty()) {
                //mail.setSenderDisplayName(System.Label.Community_Email_Sender);
                mail.setTargetObjectId(matchingContact.Id); // Assuming the contact is the target object
                mail.setTemplateId(welcomeTemplate[0].Id);
                mail.setSaveAsActivity(false);

                Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{mail});
                
                return 'Success';
            } else {
                throw new AuraHandledException('Welcome email template not found.');
            }
        } catch (Exception e) {            
            throw new AuraHandledException(e.getMessage());
        }
    }
}