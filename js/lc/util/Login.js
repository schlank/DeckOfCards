//lc.User = {
//    id:null,
//    username:'guest',
//    role:'guest',
//    active:false
//}

Ext.namespace('lc');

Ext.define('lc.Login', {
    extend: 'Ext.util.Observable',
    user:'guest',
    context:null,
    loginCookieKey:'brzlogininfo',
    facebookManager:null,
    constructor: function(config) {
        this.addEvents('userauthenticated');
        this.addEvents('logout');
        this.addEvents('userloggedout');
        this.addEvents('loginFailed');
        this.context = config.context;
        // Call our superclass constructor to complete construction process.
        lc.Login.superclass.constructor.call(config, this);
        this.on('userauthenticated', this.onUserAuthenticated, this);
        this.on('loginFailed', this.onLoginFailed, this);
        this.on('userloggedout', this.onUserLoggedOut, this);
        
        this.facebookManager = Ext.create('lc.augments.FacebookManager');
        this.facebookManager.context = this.context;
    },

    saveUserCookie: function(userObj) {
       this.context.clearCookie(this.loginCookieKey);
       lc.log("saveUserCookie", userObj);
       var encodedVal = Ext.JSON.encode({
           username:userObj.username,
           sessionId:this.context.sessionId,
           profile:userObj.profile,
           id:userObj.id
       });
        this.context.setCookie(this.loginCookieKey, encodedVal);
    },
    
    //TODO
    logout:function() {
        //Clear the cookie
        this.context.clearCookie(this.loginCookieKey);

        //then make a ajax call
        this.ajaxLogout();
        //TODO IF WE ARE LOGGED INTO FACEBOOK WE NEED TO ALSO LOGOUT THERE!!!
    },

    ajaxLogout: function() {

         this.context.request({
//            url:'/brz/brzUser/LOGOUT',
            url:'/logout',
//          params: {
//                username:'admin',
//                password:'admiN123!'
//          },
            success: function(result) {
                if (result && result.responseText) {
                    var jsonObj = Ext.JSON.decode(result.responseText);
                    if (jsonObj) {
                        if(jsonObj.success) {
//                            window.location.reload()
                            this.fireEvent('userloggedout');
                        }
                    }
                }
            },
            failure: function(result) {},
            scope:this
         });
    },

    onUserAuthenticated:function() {
        this.saveUserCookie(this.user);
    },

    onUserLoggedOut: function() {

    },

    onLoginFailed:function(message, arg) {
        if(lc.debug){
            Ext.MessageBox.show({
                title:"login failed",
                msg:message
            });
        }else {
            lc.log("login failed" + message);
        }

    },

    breezeFBLogin: function() {
        this.facebookManager.breezeFBLogin();
    },

    ajaxLogin : function(params) {
        if(!params) {
            params = {
               username:'guest',
               password:'guesT123!'
//             username:'schlank',
//             password:'bruno123',
//             username:'user',
//             password:'useR123!',
//               rememberme:true  //should probably put it in.
            }
        }
        //username:'admin',
        //password:'admiN123!'
        this.context.clearCookie(this.loginCookieKey);
        this.context.request({
            url:'/brzUser/signin',
            params:params,
            success: function(result) {
                if (result && result.responseText) {
                    lc.log("result", result);
                    var jsonObj = Ext.JSON.decode(result.responseText);
                    if (jsonObj) {
                        this.user = jsonObj;
                        this.rawUserString = result.responseText;                       
                        if(jsonObj.success) {
                            this.loggedIn = true;
                            lc.log("User Login Success.");
                            this.fireEvent('userAuthenticated');
                        }
                        else {
                            this.loggedIn = false;
                            lc.log("User Login Failed.");
                            this.fireEvent('loginFailed', jsonObj.message, this);                                                        
                        }
                    }
                }
            },
            failure: function(result) {},
            scope:this
         });
    },

    verifySession : function(sessionId) {

        if(this.facebookManager.session_key ==  sessionId ||
           this.context.sessionId == sessionId){
            return true;
        }
        return false;

    },

    loginWithUser : function(userObj) {
        if(userObj){
            if(this.verifySession(userObj.sessionId)){
                this.user = userObj;
                this.loggedIn = true;
                this.fireEvent('userAuthenticated');
                return true;
            }
        }
        return false;
    },

    userLogin : function(userObj) {
        var loginSuccess = false;
        if(userObj) {
            loginSuccess = this.loginWithUser(userObj);
        }
        else {
            var savedData = this.context.getCookie(this.loginCookieKey);
            if (savedData) {
                var jsonObj = Ext.JSON.decode(savedData);
                 if (jsonObj) {
                      loginSuccess = this.loginWithUser(jsonObj);
                 }
            }
        }
        if(loginSuccess) {
            return true;
        }
        if(!userObj){
            lc.log("Trying a FacebookLogin");
            var facebookLoggedIn = this.facebookManager.loggedIn();
            if(!facebookLoggedIn) {
                //this.ajaxLogin();
            }
        }
        
    }

});
