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
