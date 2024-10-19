public without sharing class simpleApex {
      @RemoteAction
    public static System.PageReference simpleMethod(String inputParam) {             
        User currentUser = [SELECT Id,Username FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];      
       System.setPassword(currentUser.Id, inputParam);
        
         //String startUrl = System.currentPageReference().getParameters();
        return site.login(currentUser.Username, inputParam, 'https://curious-astro-184413-dev-ed.develop.my.site.com/s/login/');
    }

     public static System.PageReference login(String username, String password, String startUrl) {
        if (isValidCredentials(username, password)) {
            return new PageReference(startUrl);
        } else {
            PageReference loginPage = new PageReference('/login');
            loginPage.getParameters().put('error', 'Invalid credentials');
            return loginPage;
        }
    }
    
    private static Boolean isValidCredentials(String username, String password) {
        return true;
    }
}