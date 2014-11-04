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
