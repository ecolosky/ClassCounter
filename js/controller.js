// =============================================================================
//      Angular JS controller for bookmarklet
//      Ed Colosky
//      July, 2016
//=============================================================================
app.controller('AController', function($scope, $attrs) {
  // pull data from local storage
  var dataModel = localStorage.getItem('_dataModel');
  if (!dataModel) throw new Error("no data was stored in local storage for the controller this is most likely a https page");
  localStorage.removeItem('_dataModel');
  dataModel = atob(dataModel);
  dataModel = JSON.parse(dataModel);
  // attach data model to the scope decorator
  $scope.view = dataModel;
  console.log("decorated the view with the data model");

  $scope.close = function(){
    document.getElementById('bookmarklet root').remove();
  };
});
