var Feelings = Backbone.Collection.extend({
  model: Feeling,
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/feelingsmax'
});
