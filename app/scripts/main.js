(function () {

  // Add our Form
  new App.Views.FeelingsAdd();

  // Create instance of Feelings Collection
  App.all_feelings = new App.Collections.Feelings();

  // Pull our feelings from our server
  App.all_feelings.fetch().done( function () {
    new App.Views.FeelingsView();
  });


}());
