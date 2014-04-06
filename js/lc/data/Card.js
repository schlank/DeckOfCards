Ext.namespace('lc.data');
Ext.define('lc.data.Card', {
    extend: 'Ext.data.Model',
    alias:['cardRecord'],
    fields: [
        {type: 'number', name: 'id'},
        {type: 'number', name: 'weight'},
        {type: 'number', name: 'index'},
        {type: 'string', name: 'name'},
        {type: 'number', name: 'offsetX'},
        {type: 'number', name: 'offsetY'},
        {type: 'string', name: 'imageUrl'},
        {type: 'string', name: 'type'} //diamond, club, etc
//        {type: 'string', name: 'faceCard'}
    ]
});

//{
//    "cards":[{
//        "id":0,
//        "index":0,
//        "name":"Ace",
//        "type":"Spade",
//        "imageUrl":"images/windows-playing-cards.png",
//        "offsetX":0,
//        "offsetY":0
//       },{
//        "id":1,
//        "index":1,
//        "name":"Two",
//        "type":"Spade",
//        "imageUrl":"images/windows-playing-cards.png",
//        "offsetX":-50,
//        "offsetY":-100
//       }]
//}
//

