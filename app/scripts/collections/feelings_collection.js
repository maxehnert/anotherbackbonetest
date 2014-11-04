(function(){

App.Collections.Feelings = Backbone.Collection.extend({
  model: App.Models.Feeling,
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/feelingsmax'
});

}());
