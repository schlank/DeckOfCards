lc.namespace('lc.control');
var msgCt;
Ext.define('lc.control.SlideMessage', {
    extend: 'Ext.util.Observable',
    alias:['slideMsg','slideDialog'],
    msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.core.DomHelper.append(msgCt, this.createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 1000, remove: true});
    },
    createBox : function(t, s){
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
});
lc.slideDialog = Ext.create('lc.control.SlideMessage');