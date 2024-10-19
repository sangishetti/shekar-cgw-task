({
    qsToEventMap: {
        'expid'  : 'e.c:setExpId'
    },
    
    handleForgotPassword: function (component, event, helper) {
        var username = component.find("username").get("v.value");
        component.set("v.username",username);
        console.log('Username entered:', username);
        var checkEmailUrl = component.get("v.checkEmailUrl");
        console.log('checkEmailUrl:', checkEmailUrl);
        var action = component.get("c.forgotPassword");
        action.setParams({username: username, checkEmailUrl: checkEmailUrl});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var rtnValue = response.getReturnValue();
                console.log('Forgot Password Response:', rtnValue);
                if (rtnValue != null) {
                    component.set("v.errorMessage", rtnValue);
                    component.set("v.showError", true);
                }
            } else {
                // Handle error
                console.error('Error resetting password:', response.getError());
            }
        });
        $A.enqueueAction(action);
    },

    setBrandingCookie: function (component, event, helper) {
        var expId = component.get("v.expid");
        if (expId) {
            console.log('Setting branding cookie with expId:', expId);
            var action = component.get("c.setExperienceId");
            action.setParams({expId: expId});
            action.setCallback(this, function(response) {
                // Handle response if needed
                console.log('Branding cookie set response:', response);
            });
            $A.enqueueAction(action);
        }
    }
})