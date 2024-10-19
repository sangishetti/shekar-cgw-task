public without sharing class setPasswordController {
  public setPasswordController() { }

  @RemoteAction
  public static Boolean handleSubmit(String inputParam) {
    Boolean isPass = true;
    try {
      Datetime currentDateTime = Datetime.now();
      Long epochTime = currentDateTime.getTime();
      System.debug('Current Epoch Time: ' + epochTime);

      System.setPassword(UserInfo.getUserId(), '$Aa' + epochTime);
      Site.changePassword(inputParam, inputParam, '$Aa'  + epochTime);
    } catch (Exception e) {
      isPass = false;
    }
    return isPass;
  }

  // @RemoteAction
  // global static System.PageReference simpleMethod(String inputParam) {             
  //   //   User currentUser = [SELECT Id,Username FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];  
  //   System.debug(UserInfo.getUserId());
  //   System.setPassword(UserInfo.getUserId(), inputParam);

  //   // Retrieve the URL from Custom Setting
  //   Billing_Portal_Settings__c customSetting = Billing_Portal_Settings__c.getInstance();
  //   String passwordLoginUrl = customSetting.set_password_login_Url__c;
  //   System.debug(passwordLoginUrl);

  //   PageReference page = new PageReference(passwordLoginUrl);
  //   page.setRedirect(true);
  //   return page;
  // }

  //  public static System.PageReference login(String username, String password, String startUrl) {
  //     if (isValidCredentials(username, password)) {
  //       // System.debug('Credentials are valid');
  //         return new PageReference(startUrl);
  //     } else {
  //         PageReference loginPage = new PageReference('/login');
  //         loginPage.getParameters().put('error', 'Invalid credentials');
  //         return loginPage;
  //     }
  // }
  
  // private static Boolean isValidCredentials(String username, String password) {
  //     return true;
  // }
}