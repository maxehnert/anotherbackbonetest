(function () {

  App.Models.Feeling = Backbone.Model.extend({

    defaults: {
      title: '',
      cause: '',
      type: ''
    },

    idAttribute: '_id',

    initialize: function () {}

  });

}());
