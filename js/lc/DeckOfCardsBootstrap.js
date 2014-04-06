Ext.onReady(function() {
    var dealButton = Ext.get('deal-btn');
    var shuffleButton = Ext.get('shuffle-btn');
    var dealer = null;
    var cardStore = null;
    var shuffleTooltip = null;
    var deckOfCardsFeature = Ext.create('lc.feature.DeckOfCards');
    shuffleButton.on('click', function() {
        deckOfCardsFeature.dealer.shuffle();
        dealButton.dom.disabled = false;
    });
    dealButton.on('click', function() {
        deckOfCardsFeature.dealer.deal();
        dealButton.dom.disabled = true;
    });
});
