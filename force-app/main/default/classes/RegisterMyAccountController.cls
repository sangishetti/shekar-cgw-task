public with sharing class RegisterMyAccountController {
    @AuraEnabled
    public static Boolean validateFields(String accountNumber, String postalCode){
        try { 
            Contact existingContact = [ SELECT Id, AccountNumber__c, MailingPostalCode
            FROM Contact
            WHERE AccountNumber__c = :accountNumber AND MailingPostalCode = :postalCode
            LIMIT 1];
            System.debug('existingContact: ' + existingContact);
            return true;
        } catch (Exception e) {
            // throw new AuraHandledException(e.getMessage());
            return false;
        }
    }
   
    
    @AuraEnabled(cacheable=true)
    public static Boolean checkExistingUser(String emailAddress) {
        // Placeholder logic to check if user already exists with this email address
        try {
            User existingUser = [
                SELECT Id,Name,Email
                FROM user
                WHERE Email = :emailAddress
                LIMIT 1
            ];
            return existingUser != null;
        } catch (Exception e) {
            System.debug('Error checking existing user: ' + e.getMessage());
            return false;
        }
    }

    // @AuraEnabled
    // public static string sendWelcomeMail(User usr, String userId){
    //     try {

    //         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

    //         List<EmailTemplate> welcomeTemplate = new List<EmailTemplate>([Select Id from EmailTemplate where name = 'Communities: New Email - Change Email Verification']);     
    //        // mail.setSenderDisplayName(System.Label.Community_Email_Sender);
    //         // Build registration URL without verification code
    //         String communityURL = 'https://curious-astro-184413-dev-ed.develop.my.site.com';
    //         String registrationPageName = '/login/ForgotPassword';
    //         // String registrationURL = RegistrationURLBuilder.buildRegistrationURL(communityURL, registrationPageName);
    //         String registrationURL = communityURL + registrationPageName;

    //         String emailBody = 'Welcome to our community! Please register your account by clicking the link below:\n\n' + registrationURL;

    //         mail.setTargetObjectId(userId);
    //         mail.setTemplateId(welcomeTemplate[0].Id);
    //         mail.setSaveAsActivity(false);
    //           // Set recipient email address
    //           User recipientUser = [SELECT Id,Email FROM Contact WHERE Id = :userId LIMIT 1];
    //           mail.setToAddresses(new String[]{recipientUser.Email});
  
    //           Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{mail});
  
    //           return 'success';
    //         Messaging.sendEmail( new List<Messaging.SingleEmailMessage>{mail} );

    //         return 'success';

    //     } catch (Exception e) {            
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    @AuraEnabled
    public static String sendWelcomeMail(String emailAddress) {
        try {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

            List<EmailTemplate> welcomeTemplate = new List<EmailTemplate>([
                SELECT Id 
                FROM EmailTemplate 
                WHERE Name = 'Communities: New Email - Change Email Verification'
            ]);     
            
            // Construct registration URL without verification code
            String communityURL = 'https://curious-astro-184413-dev-ed.develop.my.site.com';
            String registrationPageName = '/s/login/SelfRegister';
            String registrationURL = communityURL + registrationPageName;

            String emailBody = 'Welcome to our community! Please register your account by clicking the link below:\n\n' + registrationURL;
            
            // Retrieve contact information
            // Contact recipientContact = [SELECT Id, Email FROM Contact WHERE Id = :contactId LIMIT 1];
            
            mail.setToAddresses(new String[]{emailAddress});
            mail.setTemplateId(welcomeTemplate[0].Id);
            mail.setHtmlBody(emailBody);
            mail.setSaveAsActivity(false);

            Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{mail});

            return 'success';

        } catch (Exception e) {            
            throw new AuraHandledException(e.getMessage());
        }
    }
      
}