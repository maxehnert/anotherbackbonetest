
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
