lc.namespace('lc.feature');
Ext.define('lc.feature.DeckOfCards', {
    extend: 'lc.feature.Feature',
    alias:['deckOfCards'],
    id:'deckOfCardsFeature',
    dealer:null,
    cardStore:null,
    
    onInit: function() {
        this.cardStore = this.getCardStore();
        this.dealer = Ext.create('lc.app.CardDealer', {
            cardsPerPlayer:5,
            game:null,//this could be an class that contained instructions on dealing and game rules. (dealstrategy)
            cardStore:this.cardStore
        });
        this.cardStore.on("load", function() {
//            this.dealer.deal();
            this.dealer.stack();
        },this);
    },
    
    getCardStore: function() {
       if(!this.cardStore) {
           this.cardStore = Ext.create('Ext.data.Store', {
                    model: 'lc.data.Card',
                    proxy: {
                            type: 'ajax',
                             url:'js/lc/data/cards.json',
                            reader: {
                                type: 'json',
                                root: 'cards'
                            }
                    },
                    autoLoad: true
            });
       }
       return this.cardStore;
    }
});