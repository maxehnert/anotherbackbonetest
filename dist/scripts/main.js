(function(){

App.Models.Feeling = Backbone.Model.extend({

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

}());

(function(){

App.Collections.Feelings = Backbone.Collection.extend({
  model: App.Models.Feeling,
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/feelingsmax'
});

}());


(function(){

App.Views.FeelingsView = Backbone.View.extend({
  //el: '#feels'

  tagName: 'ul',
  className: 'feels',

  events: {
    "click li" : "deleteMyFeel"
  },

  initialize: function(){
    //console.log('inited')
    this.render();
    App.all_feelings.on('snyc', this.render, this);
  },

  render: function(){
  //  console.log(col);

    //binding 'this' to 'self' for use in nested functions/callbacks
    var self = this;

    //regular underscore templates
    var template = $('#feels').html();
    var rendered = _.template(template);

    //Clears out our element
    this.$el.empty();

    //iterating over our models
    _.each(App.all_feelings.models, function(c){
    //  console.log(c.get('title'));

      //each iteration we are appending the data to our el that
      //backbone created
      self.$el.append(rendered(c.attributes));
    });

    $('#feelsContainer').html(this.el);

    //console.log(this.el);
    return this;
  },

  deleteMyFeel: function(e){
    e.preventDefault();

    //Normally in a jquery event use $(this)
    //In backbone use $(e.target)

    var id = $(e.target).attr('id');

    //var goodbye = _.findWhere(App.all_feelings.models, { _id: id });
    var goodbye = App.all_feelings.get(id);

    goodbye.destroy();


    console.log(goodbye);

    //check which feel it is
    //Find that feel in our collection
    //Delete that feel
    //and maybe remove it from our collection

  }
});

}());


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


(function(){

//Add our form
new App.Views.FeelingsAdd();

// create instance of our feeling constructor
App.all_feelings = new App.Collections.Feelings();

//Pull our feelings from our server
App.all_feelings.fetch().done(function(){
new App.Views.FeelingsView();
});


}());
