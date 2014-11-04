
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
