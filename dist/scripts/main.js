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

(function(){

App.Collections.Feelings = Backbone.Collection.extend({
  model: App.Models.Feeling,
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/feelingsmax'
});

}());

(function () {

  App.Views.FeelingsView = Backbone.View.extend({

    tagName: 'ul',
    className: 'feels',

    events: {
      'click li' : 'deleteMyFeel'
    },

    initialize: function () {

      this.render();

      App.all_feelings.on('sync', this.render, this);
      App.all_feelings.on('destroy', this.render, this);

    },

    render: function () {
      // Binding `this` to `self` for use in
      // nested functions/callbacks
      var self = this;

      // Straight up Underscore Template Goodness
      var template = $('#feels').html();
      var rendered = _.template(template);

      // Clear our El
      this.$el.empty();

      // Iterating over our models
      _.each(App.all_feelings.models, function (c) {
          // Each iteration... appending the data
          // to our element that Backbone created
          self.$el.append(rendered(c.attributes));
      });

      // Take the data and append it into a specific element
      // on my page
      $('#feelsContainer').html(this.el);

      return this;
    },

    deleteMyFeel: function (e) {

      e.preventDefault();

      var id = $(e.target).attr('id');

      var goodbye = App.all_feelings.get(id);

      goodbye.destroy();

    }

  });

}());

(function () {

  App.Views.FeelingsAdd = Backbone.View.extend({

    el: '#feelsAdder',

    events: {
      'submit #feelsAdd' : 'addNewFeel'
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      var form_html = $('#addFeels').html()
      this.$el.html(form_html);
    },

    addNewFeel: function (e) {
      e.preventDefault();

      // Grab feel values from my form
      var feels_title = $('#title').val();
      var feels_cause = $('#cause').val();

      // Create a new Feel
      var feel = new App.Models.Feeling({
        title: feels_title,
        cause: feels_cause
      });

      // Add to our collection & save to server
      App.all_feelings.add(feel).save();

      // Clear My Form
      $('#feelsAdd')[0].reset();

    }

  });

}());

(function () {

  // Add our Form
  new App.Views.FeelingsAdd();

  // Create instance of Feelings Collection
  App.all_feelings = new App.Collections.Feelings();

  // Pull our feelings from our server
  App.all_feelings.fetch().done( function () {
    new App.Views.FeelingsView();
  });


}());
