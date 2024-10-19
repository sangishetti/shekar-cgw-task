global without sharing class LoginController {

    @AuraEnabled
    public static String login(String username, String password) {
        String result = null;
        try {
            user updatingUser = [SELECT Id, Name,Terms_Conditions__c FROM User WHERE UserName = :username];            
            if(updatingUser.Terms_Conditions__c == false){
                updatingUser.Terms_Conditions__c = true;
                update updatingUser;
            }
            ApexPages.PageReference lgn = Site.login(username, password, '');
            result = (lgn != null) ? lgn.getUrl() : null;
        } catch (Exception ex) {
            result = ex.getMessage();
        }
        return result;
    }

    @AuraEnabled
    public static String validateCred(String username, String password) {
        String result = null;
        try {
         //   user updatingUser = [SELECT Id, Name,Terms_Conditions__c FROM User WHERE UserName = :username];            
          //  if(updatingUser.Terms_Conditions__c == false){
         //       updatingUser.Terms_Conditions__c = true;
         //       update updatingUser;
         //   }
            ApexPages.PageReference lgn = Site.login(username, password, '');
            result = (lgn != null) ? lgn.getUrl() : null;
        } catch (Exception ex) {
            result = ex.getMessage();
        }
        return result;
    }

    @AuraEnabled(cacheable = true)
    public static Boolean getIsUsernamePasswordEnabled() {
        Auth.AuthConfiguration authConfig = getAuthConfig();
        return authConfig.getUsernamePasswordEnabled();
    }
   //passwordresend method
    @AuraEnabled
    public static void resetPassword(String username) {
        List<User> users = [SELECT Id, Name FROM User WHERE UserName = :username];
        for (User u : users) {
            System.resetPassword(u.Id, true);
            // To set a specific password instead of resetting, use:
            // System.setPassword(u.Id, 'Test@1234');
        }
    }

    @AuraEnabled
    public static user getUserByUsername(String email) {
        User matchingUser = [SELECT Username, Terms_Conditions__c FROM User WHERE Email = :email AND IsActive = true LIMIT 1];
        return matchingUser != null ? matchingUser : null;
    }

    @TestVisible
    private static Auth.AuthConfiguration getAuthConfig() {
        Id networkId = Network.getNetworkId();
        Auth.AuthConfiguration authConfig = new Auth.AuthConfiguration(networkId, '');
        return authConfig;
    }
}