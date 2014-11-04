
(function(){

  App.Views.FeelingsAdd = Backbone.View.extend({

      el: '#feelsAdder',

      events: {
        "submit #feelsAdd" : "addNewFeel"
      },

      initialize: function (){
        this.render();
      },

      render: function (){
        this.$el.html($('#addFeels').html());
      },

      addNewFeel: function(e){
        e.preventDefault();

        //Grab feel values from my form
        var feels_title = $('#title').val();
        var feels_cause = $('#cause').val();
        var feels_type = $('#type').val();

        //create a new feel
        var feel = new App.Models.Feeling({
          title: feels_title,
          cause: feels_cause,
          type: feels_type
        });

        //Add to our collection $ save to server
        App.all_feelings.add(feel).save();

        //clears out the form after submit
        $('#feelsAdd')[0].reset();
      }


  });

}());
