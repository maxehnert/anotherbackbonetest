
// create instance of our feeling constructor
var all_feelings = new Feelings();

//Pull our feelings from our server
all_feelings.fetch().done(function(){
  var feelsview = new FeelingsView({
    collection: all_feelings
  });
});



//var feelings_view = new FeelingsView();

// console.dir(feelings_view);
