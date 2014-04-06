Ext.namespace('lc.app');

lc.app.ApplicationRegister = {

    jsObjectsArray: [],
    init : function() {
        for(var x=0;x<=this.jsObjectsArray.length-1;x++) {
            var currentObj = this.jsObjectsArray[x];
            if(currentObj.lcInit){
                currentObj.lcInit();                
            }
        }
    },

    register : function(stringJSObj, jsObject) {
//       Ext.reg(stringJSObj, jsObject);
       this.jsObjectsArray.push(jsObject);
    }
};
//Ext.reg('lc.app.AppRegister', lc.app.ApplicationRegister);
//Ext.reg('lc.app.ApplicationRegister', lc.app.ApplicationRegister);

