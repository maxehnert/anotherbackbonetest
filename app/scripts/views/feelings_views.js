
var FeelingsView = Backbone.View.extend({
  //el: '#feels'

  tagName: 'ul',
  className: 'feels',

  initialize: function(options){
    //console.log('inited')
    this.render(options.collection);

  },

  render: function(collection){
  //  console.log(col);

    //binding 'this' to 'self' for use in nested functions/callbacks
    var self = this;

    //regular underscore templates
    var template = $('#feels').html();
    var rendered = _.template(template);


    //iterating over our models
    _.each(collection.models, function(c){
    //  console.log(c.get('title'));

      //each iteration we are appending the data to our el that
      //backbone created
      self.$el.append(rendered(c.attributes));
    });

    $('#feelsContainer').html(this.el);

    console.log(this.el);
    return this;
  }
});
