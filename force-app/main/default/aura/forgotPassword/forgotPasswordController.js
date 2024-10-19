({
    handleForgotPassword: function (component, event, helper) {
        helper.handleForgotPassword(component, event, helper);
    },
    
    onKeyUp: function(component, event, helper){
        alert('called');
        // Checks for "enter" key
        if (event.getParam('keyCode') === 13) {
            helper.handleForgotPassword(component, event, helper);
        }
    },
    setExpId: function (component, event, helper) {
        var expId = event.getParam('expid');
        if (expId) {
            component.set("v.expid", expId);
        }
        helper.setBrandingCookie(component, event, helper);
    },
    initialize: function(component, event, helper) {
        console.log('initialize called');
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap}).fire();
    },
      handleButtonClick: function(component, event, helper) {
        // Retrieve the value of the input field using the aura:id
        var inputValue = component.find("username").get("v.value");

        // Set the value to the component attribute
        component.set("v.inputValue", inputValue);
    }
})