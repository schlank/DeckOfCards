Ext.namespace('lc');

Ext.define('lc.feature.Feature', {
    extend: 'Ext.util.Observable',
    context: null,
    onInit: Ext.emptyFn,
    onUserAuthenticate: Ext.emptyFn,
    initialized:false,
    constructor: function(arg, arg2) {
        this.init()
    },
    init: function() {
        if(!this.initialized){
            this.initialized = true;
            this.context = ApplicationContext;
            this.context.on('userAuthenticated', this.onUserAuthenticate, this);
            this.onInit();
        }
    }
});