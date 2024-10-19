public class PortalEmailService {
    // Helper method to get the org-wide email address ID
    private static Id getOrgWideEmailAddressId(String email) {
        OrgWideEmailAddress[] orgWideEmailAddresses = [SELECT Id FROM OrgWideEmailAddress WHERE Address = :email LIMIT 1];
        return orgWideEmailAddresses.isEmpty() ? null : orgWideEmailAddresses[0].Id;
    }

    // Method to send reset password email
    public static void sendResetPasswordEmail(Id userId, String communityUrl) {
        // Retrieve the user record
        User receivingUser = [SELECT Id, FirstName, Email FROM User WHERE Id = :userId LIMIT 1];
        
        // Retrieve the organization details
        Organization org = [SELECT Name FROM Organization LIMIT 1];
        
        // Get the org-wide email address ID
        Id orgWideEmailAddressId = getOrgWideEmailAddressId('your-email@example.com');

        // Create a new email object
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        
        // Set the target user and template
        email.setTargetObjectId(receivingUser.Id);
        email.setTemplateId([SELECT Id FROM EmailTemplate WHERE DeveloperName = 'Your_New_Password_Is_Set' LIMIT 1].Id);
        
        // Set the organization-wide email address if found
        if (orgWideEmailAddressId != null) {
            email.setOrgWideEmailAddressId(orgWideEmailAddressId);
        }
        
        // Set the merge fields
        email.setWhatId(org.Id); // Assuming the template uses an Organization merge field
        email.setTreatTargetObjectAsRecipient(true);

        // Ensure saveAsActivity is false
        email.setSaveAsActivity(false);
        
        // Send the email
        if (!Test.isRunningTest()) {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        }
    }

    // Method to send welcome email
    public static void sendWelcomeEmail(Id userId) {
        // Retrieve the user record
        User receivingUser = [SELECT Id, FirstName, Email FROM User WHERE Id = :userId LIMIT 1];
        
        // Get the org-wide email address ID
        Id orgWideEmailAddressId = getOrgWideEmailAddressId('your-email@example.com');

        // Create a new email object
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        
        // Set the target user and template
        email.setTargetObjectId(receivingUser.Id);
        email.setTemplateId([SELECT Id FROM EmailTemplate WHERE DeveloperName = 'MyAccount_Welcome_Email' LIMIT 1].Id);
        
        // Set the organization-wide email address if found
        if (orgWideEmailAddressId != null) {
            email.setOrgWideEmailAddressId(orgWideEmailAddressId);
        }
        
        // Set the merge fields
        email.setTreatTargetObjectAsRecipient(true);

        // Ensure saveAsActivity is false
        email.setSaveAsActivity(false);
        
        // Send the email
        if (!Test.isRunningTest()) {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        }
    }
}