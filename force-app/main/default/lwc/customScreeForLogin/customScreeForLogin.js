import { LightningElement, track, api, wire } from 'lwc';
import ECLogo from "@salesforce/resourceUrl/ECLogo";
import getIsUsernamePasswordEnabled from '@salesforce/apex/LoginController.getIsUsernamePasswordEnabled';
//import getUserByUsername from '@salesforce/apex/LoginController.getUserByUsername';
import login from '@salesforce/apex/LoginController.login';
//import validateCred from '@salesforce/apex/LoginController.validateCred';
import Account_Email_address from '@salesforce/label/c.Account_Email_address';
import Account_Password from '@salesforce/label/c.Account_Password';
import FORGOT_PASSWORD_HREF  from '@salesforce/label/c.ForgotPasswordHref';
import FORGOT_PASSWORD_TEXT  from '@salesforce/label/c.ForgotPasswordText';
import Sign_In from '@salesforce/label/c.Sign_In';
import By_Sign_In from '@salesforce/label/c.By_signing_into';
import Terms_Conditions_link_HREF from '@salesforce/label/c.Terms_Conditions_link';
import Terms_Conditions_Text from '@salesforce/label/c.Terms_and_Conditions_Text';
import New_to_account_Text from '@salesforce/label/c.New_to_my_account_text';
import self_register_Link from '@salesforce/label/c.self_register_link';
import self_register_Text from '@salesforce/label/c.self_register_text';
import see_the_list_of_my_account from '@salesforce/label/c.see_the_full_list_of_my_account';
import Why_My_Account from '@salesforce/label/c.Why_My_Account';
import Why_MyAccount_Text from '@salesforce/label/c.Why_MyAccount_Text';
import View_Enercare_bill from '@salesforce/label/c.View_Enercare_bill';
import Book_appointments_Text from '@salesforce/label/c.Book_appointments_Text';
import View_products_text from '@salesforce/label/c.View_products_text';
import moving_text from '@salesforce/label/c.moving_text';
import seefulllist_text from '@salesforce/label/c.seefulllist_text';
// import getManagedContentByContentTypes from '@salesforce/apex/PortalService.getManagedContentByContentTypes';

// const CMS_MAPPING = {
//     LOGIN_CARD : "MCNED2HEDJIFCYPLXWEKB3C2UVHQ",
    
// };

export default class CustomScreeForLogin extends LightningElement {

    Accountemailaddress = Account_Email_address;
    Accountpassword = Account_Password;
    forgotpasswordhrefLabel = FORGOT_PASSWORD_HREF;
    ForgotpasswordtextLabel = FORGOT_PASSWORD_TEXT ;
    Signin = Sign_In ;
    Bysigninginto = By_Sign_In ;
    tclink = Terms_Conditions_link_HREF ;
    TandCText = Terms_Conditions_Text ;
    NewtoMyAccount = New_to_account_Text ;
    SelfRegisterlink = self_register_Link ;
    Registernow = self_register_Text ;
    Seethefulllist = see_the_list_of_my_account ;
    WhyMyAccount = Why_My_Account ;
    WhyMyAccountText = Why_MyAccount_Text ;
    ViewEnercarebill = View_Enercare_bill ;
    Bookappointments = Book_appointments_Text ;
    Viewproducts = View_products_text ;
    movingtext = moving_text ;
    Seefulllist = seefulllist_text;

    isUsernamePasswordEnabled;
    username;
    password;
    @track password = '';
    @track passwordInputType = 'password';
    @track eyeIcon = 'utility:hide';
  //  @track eyeIcon = 'utility:preview';
    @api forgotPasswordUrl;
    @api RegisterUrl;
    imageUrl = ECLogo;
    email;
    usernameField= false;
    passwordField= false;
    errorMsg='The username or password provided are incorrect, please try again.';
    errorMsgidentification ='Cannot process your request right now, please try again later';
    showError= false;
    secondScreen=false;
    firstScreen=true;
    agreeTerms=false;
    message;
    showErroridentification =false;
    updateRecord = false;
    // @api WhyMyAccount;
    // @api WhyMyAccountText;
    // @api ViewEnercarebill;
    // @api Bookappointments;
    // @api Viewproducts;
    // @api movingtext;

    
//   async connectedCallback() {
     
//         try{
//             const Login_Screen = await getManagedContentByContentTypes({ communityName: 'MyAccount2', contentType: 'Login_Screen' });
//             const LoginCardMapping = Login_Screen?.items.reduce((acc, cur) => {
//                 console.log(acc, cur)
//                 const key = cur?.contentKey;
//                 acc.set(key, cur?.contentNodes);
//                 return acc;
//             }, new Map())
//             console.log('card mapping', LoginCardMapping);
         
//             this.WhyMyAccount = LoginCardMapping.get(CMS_MAPPING.LOGIN_CARD).Title.value;
//             console.log('service Name', this.serviceName);
//             this.WhyMyAccountText = LoginCardMapping.get(CMS_MAPPING.LOGIN_CARD).Description.value;
//             this.ViewEnercarebill = LoginCardMapping.get(CMS_MAPPING.LOGIN_CARD).Bulletone.value;
//             this.Bookappointments = this.decodeHtmlEntities(LoginCardMapping.get(CMS_MAPPING.LOGIN_CARD).Bullettwo.value);
//             this.Viewproducts = this.decodeHtmlEntities(LoginCardMapping.get(CMS_MAPPING.LOGIN_CARD).BulletThree.value);
//             this.movingtext = LoginCardMapping.get(CMS_MAPPING.LOGIN_CARD).BulletFour.value;
//         }
//         catch(e){
//             console.log('error', e);
//             console.log('errorMessage', e.message);
    
//         }
//   }
//   decodeHtmlEntities(str) {
//     var textarea = document.createElement('textarea');
//     textarea.innerHTML = str;
//     return textarea.value;
// }
    handleEmailChange(event) {
        this.email = event.target.value;
        if(this.email){
            this.usernameField = false;
        }else{
            this.usernameField= false;
        }
        this.showError = false;
    }
 
    handlePasswordFocus() {
        if (this.passwordInputType === 'password') {
            this.eyeIcon = 'utility:hide';
        } else {
            this.eyeIcon = 'utility:preview';
        }
    }
    handlePasswordBlur() {
        this.eyeIcon = 'utility:hide';
    }
    togglePasswordVisibility() {
        console.log('called');
        if (this.passwordInputType === 'password') {
            this.passwordInputType = 'text';
        } else {
            this.passwordInputType = 'password';
        }
 
        if (this.passwordInputType === 'password') {
            this.eyeIcon = 'utility:hide';
        } else {
            this.eyeIcon = 'utility:preview';
        }
    }
    @wire(getIsUsernamePasswordEnabled)
    wiredIsUsernamePasswordEnabled({ error, data }) {
        if (data) {
            this.isUsernamePasswordEnabled = data;
        } else if (error) {
            //alert(error);
        }
    }
    handlePasswordChange(event) {
        this.password = event.target.value;
        if(this.password){
            this.passwordField = false;
        }else{
            this.passwordField= false;
        }
      this.showError = false;
    }
    handleUsernameChange(event) {
        this.username = event.target.value;
 
    }
    handleClick(event){
        if(!this.email || !this.password){
            if(!this.email){
            this.usernameField=true;    
            }else{
                this.usernameField=false;    
            }
            if(!this.password){
                this.passwordField = true;
            }else{
                this.passwordField = false;
            }
 
        }else{
            this.usernameField = false;
            this.passwordField = false;
            this.handlelogin();
            // getUserByUsername({ email: this.email })
            // .then((result) => {
            //     // console.log("Login successful");
            //     if (result){
            //         this.username = result.Username;
            //        this.agreeTerms = result.Terms_Condition__c;
            //         // alert(this.username);
            //         if(this.username && this.password){
            //             event.preventDefault();
            //             this.handlevalidateCred(result.Terms_Condition__c);  
            //             // if(result.Terms_Condition__c == true){
            //             //      event.preventDefault();
            //             //      this.handlelogin();     
            //             // }else{
            //             //  this.firstScreen = false;
            //             //  this.secondScreen = true;
            //             // }
                        
            //         }
            //         else {
            //             this.showError=true;
            //         }
            //     }
            //     else{
            //         // alert('no usernamefound');
            //     }
            // })
            // .catch((error) => {
            //     this.showError=true;
            //     // alert(error.body.message);
            // });
        }
    }
    isValidURL(url) {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(url);
    }
    // handlevalidateCred(termsConditions){
    //     validateCred({ username: this.username, password: this.password })
    //     .then((result) => {
    //         // console.log("Login successful");      
    //         if (this.isValidURL(result)) {
    //            // console.log("Valid URL");
    //             this.showError=false;
    //             if(termsConditions == true){
    //                 this.handlelogin();                
    //             }else{
    //                 this.firstScreen = false;
    //                 this.secondScreen = true;
    //             }            
    //         }
    //         else {
              
    //             // alert('Entered Username or Password are incorrect');
    //             this.showError=true;
    //         }
    //     })
    //     .catch((error) => {
    //         this.showError=true;
    //         // console.log("Error occurred during login");
    //         // alert(error.body.message);
    //     });
    //    }
         
    handlelogin(){
       console.log ('username:' + this.email );
       console.log ('password:' + this.password );
     login({ username: this.email, password: this.password, updateRecord:this.updateRecord })
     .then((result) => {
        if(result){
                let url = JSON.parse(result);
                //let userrecord = JSON.parse(re);
                console.log(url.result);
                console.log(JSON.parse(url.userrecord).Terms_Condition__c);
                if(JSON.parse(url.userrecord).Terms_Condition__c == false){
                    this.firstScreen = false;
                    this.secondScreen = true
                }else{
                    if (this.isValidURL(url.result)) {
                        //  console.log("Valid URL");
                        this.showError=false;
                        window.location.href = url.result;
                      }
                      else {
                          // console.log("Invalid URL");
                          this.showError=true;
                         // alert('result'+ result);
                      }

                }                

        }
        //  console.log("Login successful");
         
     })
     .catch((error) => {
        console.log('error')
        console.log(error);
        console.log(error.message);
        console.log(error.body.message);
        let errorMsg = error.body.message;
        console.log('error')
        if(errorMsg.includes('Make sure the username and password are correct')){
            this.showError=true;
        }else{
            this.showErroridentification = true;
        }
         

         //alert(error.body.message);
     });
    }
 
    handleAgreeTerms(event){
     if(event.detail.agreeTerms == true){
        this.updateRecord = true;
         this.handlelogin();
     }
    }
    
   
}