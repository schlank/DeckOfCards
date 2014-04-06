lc.namespace('lc.app');
Ext.define('lc.app.CardDealer', {
    extend: 'Ext.util.Observable',
    alias:['cardDealer'],
    id:"cardDealer",
    cardStore:null,
    shuffled: false,
    cardWindows:null,
    windowZIndexManager:null,
    initWindowManager: function() {
        if (!this.windowZIndexManager) {
            this.windowZIndexManager = Ext.create('Ext.ZIndexManager');
        }
    },
    shuffle:function() {
        if (this.cardStore) {
            var cardRecords = this.cardStore.data.items;
            var randomIndex, tmp;
            var shuffles = 10;
            for (var x = 0; x < shuffles; x++) {
                for (var y = 0; y < cardRecords.length; y++) {
                    randomIndex = Math.floor(Math.random() * cardRecords.length);
                    tmp = cardRecords[y];
                    cardRecords[y].data.index = cardRecords[randomIndex].data.index;
                    cardRecords[randomIndex].data.index = tmp.data.index;
                    cardRecords[y] = cardRecords[randomIndex];
                    cardRecords[randomIndex] = tmp;
                }
            }
            this.shuffled = true;
            if (lc.slideDialog) {
                lc.slideDialog.msg('Shuffled', 'The cards are shuffled, click deal.');
            }
        }
        this.stack();
    },

    stack:function() {
        if (this.cardStore) {
            this.initWindowManager();
            if (!this.cardWindows) {
                this.cardWindows = [];
            }
            var cardRecords = this.cardStore.data.items;
            var pageOffsetY = 125;
            var pageOffsetX = 15;
            for (var c = 0; c <= cardRecords.length - 1; c++) {
                var cardRecord = cardRecords[c];
                var offsetX = -(cardRecord.data.weight * 73);
                offsetX = offsetX + 73;
                var offsetY = cardRecord.data.offsetY;
                pageOffsetX += .16;
                pageOffsetY += .16;
                var backgroundPosition = "0 -393px";
                var style = "background-image:url('" + cardRecord.data.imageUrl + "');" +
                        "background-position:0 -393px;" +
                        "width:73px;height:98px;";
                if (!this.cardWindows[cardRecord.data.id]) {
                    this.cardWindows[cardRecord.data.id] = Ext.create('lc.control.CardWindow', {
                        id:cardRecord.data.id,
                        title:"",
                        items:[{
                                xtype:'container',
                                layout:'fit',
                                bodyStyle:"background-image:url('" + cardRecord.data.imageUrl + "');",
                                style:style,
                                html:''
                        }]
                    });
                    this.windowZIndexManager.register(this.cardWindows[cardRecord.data.id]);
                    this.cardWindows[cardRecord.data.id].show();
                }
                else {
                    var cardDomObj = this.cardWindows[cardRecord.data.id].items.items[0].el.dom;
                    cardDomObj.attributes[2].nodeValue = style;
                    this.cardWindows[cardRecord.data.id].items.items[0].el.setStyle('background-position', "0 -393px"); 
                   // console.log(this.cardWindows[cardRecord.data.id]);
                }
                this.cardWindows[cardRecord.data.id].setTitle("");
                this.windowZIndexManager.bringToFront(this.cardWindows[cardRecord.data.id]);
                this.cardWindows[cardRecord.data.id].alignTo(Ext.getBody(), 'tl-tl', [pageOffsetX, pageOffsetY]);
            }
        }
    },

    deal:function() {
        if (this.cardStore) {
            this.initWindowManager();
            if (!this.cardWindows) {
                this.cardWindows = [];
            }
            var cardRecords = this.cardStore.data.items;
            var pageOffsetY = 188;
            var pageOffsetX = 20;
            for (var c = 0; c <= cardRecords.length - 1; c++) {
                var cardRecord = cardRecords[c];
                var offsetX = -(cardRecord.data.weight * 73);
                offsetX = offsetX + 73;
                var offsetY = cardRecord.data.offsetY;
                pageOffsetX += 73;
                if (c % 13 == 0) {
                    pageOffsetX = 20;
                    pageOffsetY += 98;
                }
                var style = "background-image:url('" + cardRecord.data.imageUrl + "');" +
                        "background-position:" + offsetX + "px " + offsetY + "px;" +
                        "width:73px;height:98px;";
                if (!this.cardWindows[cardRecord.data.id]) {
                    this.cardWindows[cardRecord.data.id] = Ext.create('lc.control.CardWindow', {
                        title:cardRecord.data.name + " of " + cardRecord.data.type + "s",
                        id:cardRecord.data.id,
                        animateTarget:"card-table-target",
                        items:[
                            {
                                xtype:'container',
                                layout:'fit',
                                style:style
                            }
                        ]
                    });
                    this.cardWindows[cardRecord.data.id].show(Ext.get("card-table-target"));
                }
                else {
                    var cardDomObj = this.cardWindows[cardRecord.data.id].items.items[0].el.dom;
                    cardDomObj.attributes[2].nodeValue = style;
                    //console.log(this.cardWindows[cardRecord.data.id]);
                    this.cardWindows[cardRecord.data.id].setTitle(cardRecord.data.name + " of " + cardRecord.data.type + "s");
                    this.cardWindows[cardRecord.data.id].items.items[0].el.setStyle('background-position', offsetX + "px " + offsetY + "px"); 
                    
                    
                }
                this.windowZIndexManager.bringToFront(this.cardWindows[cardRecord.data.id]);
                this.cardWindows[cardRecord.data.id].alignTo(Ext.getBody(), 'tl-tl', [pageOffsetX, pageOffsetY]);
            }
        }
    }
});