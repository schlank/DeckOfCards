lc.namespace('lc.util');
//lc.util.Meta = function(){};
//lc.util.Meta.prototype = {
lc.util.Meta = {
    objextType:'image',
    objectType:'image',
    tags:[],
    getMetaFromPage:function() {
        var metaDomObjArray = document.getElementsByTagName('meta');
        var cnt = metaDomObjArray.length;
        for(var x=0;x<=cnt-1;x++){
            var curMetaObj = metaDomObjArray[x];
            if(curMetaObj) {
//                this.tags[x]=curMetaObj.content;
                this.tags.push(curMetaObj);
                this.tags[curMetaObj.name]=curMetaObj;
            }
        }
    }
};
