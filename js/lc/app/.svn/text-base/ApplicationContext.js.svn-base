//The topmost Class.  The parent of parents.
//Context means the playground we are in.
//We are an application and the top most scope or global scope
//is the context.

Ext.namespace('lc');

Ext.define('lc.ApplicationContext', {
    extend: 'Ext.util.Observable',
    ajax: null,
    user:false,
    loggedIn:false,
    cookie:null,
    sessionId:null,
    meta:null,
    bagPanelFeature:null,
    leaderboard: null,
    //I should have a config with global settings that are in json that are sent from
    //A database that is set in a grails backend admin interface.
    init : function(config) {
        if (config) {
            if (config.enableToolTips) {
                this.initToolTips();
            }
            if (config.enableQuickTips) {
                Ext.QuickTips.init();
            }
        }
        this.cookie = new Ext.state.CookieProvider();
        Ext.state.Manager.setProvider(this.cookie);
        this.sessionId = this.getCookie('JSESSIONID');
        this.meta = lc.util.Meta;
        this.meta.getMetaFromPage();

        this.loginObj = Ext.create('lc.Login',{
            context:this
        });

        this.loginObj.on('userauthenticated', this.onUserAuthenticated, this);
        this.loginObj.on('userloggedout', this.onUserLoggedOut, this);
        this.ajax = lc.util.Ajax;
        this.ajax.on('beforerequest', this.showSpinner, this);
        this.ajax.on('requestcomplete', this.hideSpinner, this);
        this.ajax.on('requestexception', this.hideSpinner, this);
        this.loadBagFeature();

        //for now we just search the page for a hidden html element to check for login
        // later we can ajax call.
        this.login();
    },
    
    clearCookie: function(id){
         return Ext.util.Cookies.clear(id);
    },

    getCookie: function(id){
         return Ext.util.Cookies.get(id);
    },

    setCookie: function(id, value){
        Ext.util.Cookies.set(id, value);
    },

    facebookInit: function() {
        this.loginObj.facebookManager.facebookInit();    
    },

    fbLogin: function() {
        this.loginObj.breezeFBLogin();    
    },

    login: function(userObj) {
        this.loginObj.userLogin(userObj);
    },

    logout: function(){
       this.loginObj.logout();
    },
    
    onUserLoggedOut: function() {
        this.bagPanelFeature.reloadPanel();
    },

    //TODO Login as guest and restrict?
    //TODO OR not login.... and restrict.
    onUserAuthenticated: function() {
        this.loggedIn=this.loginObj.loggedIn;

        if(!this.leaderboard){
            this.leaderboard = Ext.create('lc.leaderboard');
        }
        this.leaderboard.showLeaderboardPanel();
    },

    isGuest: function() {
        var username = this.getUserName();
        lc.log("username", username);
        if(username && username == "guest"){
            return true;
        }
        return false;
    },

    getUserName: function() {
        if (this.user && this.user.username) {
            return this.user.username;
        }
        else {
            return this.getUser().username;
        }
    },

    getMetaContentByTag: function(tagName){
        if(this.meta && this.meta.tags){

            if(this.meta.tags[tagName]){
                return this.meta.tags[tagName].content; 
            }
            else {
                console.log("No page meta found for tagName:", tagName);
            }

        }
        else{
            console.log("No page meta found.");
        }
    },

    getUser: function() {
        if (!this.loggedIn) {

        }
        return this.loginObj.user;
    },

    request: function(args) {
        this.ajax.request(args);
        //        Ext.apply
    },

    showSpinner: function(sender, e) {

    },

    hideSpinner: function(sender, e) {

    },
    
    loadBagFeature : function() {
        if(!this.bagPanelFeature){
            this.bagPanelFeature = Ext.create('lc.features.BagPanelFeature');
//            this.bagPanelFeature = new lc.features.BagPanelFeature();
//            bagPanelFeature.init();
        }else {
            this.bagPanelFeature.reloadPanel();
        }
    },

    getBags : function() {
        if(this.bagPanelFeature){
            return this.bagPanelFeature.bags;            
        }
        else {return false;}
    },

    initToolTips : function() {
        var bagTooltip = new lc.features.BagToolTip();
    }

});






