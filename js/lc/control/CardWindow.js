lc.namespace('lc.control');
Ext.define('lc.control.CardWindow', {
    extend: 'Ext.window.Window',
    alias:['cardWindow'],
    layout: 'fit',
    id:"cardWindow",
    closable:false,
//    headerPosition: 'top',
    resizable:false,
//    height:133,
    frame:false,
//    preventHeader:true,
    frameHeader:false,
//    bodyBorder:false,
    maxWidth:78,
    width:78,
    plain:true,
    shadow:true,
//    overlapHeader:true,
    padding:0
});