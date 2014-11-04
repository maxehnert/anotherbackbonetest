
var Feeling = Backbone.Model.extend({

  defaults: {
    title: '',
    cause: '',
    type: ''
  },

  idAttribute: '_id',

  initialize: function (){
    var feel = this.get('title');
  //  console.log(feel + ' have been created');
  }
});
