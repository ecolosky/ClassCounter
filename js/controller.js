// =============================================================================
//      Angular JS controller for bookmarklet
//      Ed Colosky
//      July, 2016
//=============================================================================
function setColors(model){
  // determine color of label
  var darkBlue = false;//used for alternating colors
  var darkYellow = false;//also yes
  var blue = false;

  var currentDisp = document.getElementsByClassName('bookmarklet label')
  for(item in model){
    if(currentDisp[item].offsetLeft < 20){
      // start of new row
      // reset light and dark determiners
      darkBlue = false;
      darkYellow = false;
      // flip color
      blue = !blue;
    }
    if(blue){
      // set to blue
      if(darkBlue){
        model[item].color = "label-primary dark"
      }
      else{
        model[item].color = "label-primary"
      }
      // switch
      darkBlue = !darkBlue;
    }
    else{
      // set to yellow
      if(darkYellow){
        model[item].color = "label-warning dark"
      }
      else{
        model[item].color = "label-warning"
      }
      // switch
      darkYellow = !darkYellow;
    }
  }
  return model;
}

app.controller('AController', function($scope, $attrs, $window) {
  // pull data from local storage
  var dataModel = localStorage.getItem('_dataModel');
  if (!dataModel) throw new Error("no data was stored in local storage for the controller this is most likely a https page");
  localStorage.removeItem('_dataModel');
  dataModel = atob(dataModel);
  dataModel = JSON.parse(dataModel);

  // attach data model to the scope decorator
  $scope.view = dataModel;
  console.log("decorated the view with the data model");
  // set origninal css classes upon doc ready
  angular.element(document).ready(function () {
    $scope.$apply(function(){
      dataModel = setColors(dataModel);
    });
  });
  // set new css classes upon window size change
  angular.element($window).bind('resize', function () {
    newModel = setColors(dataModel);
    $scope.$apply(function(){
       $scope.view = newModel;
     });
  });
  // remove root div upon close button click
  $scope.close = function(){
    document.getElementById('bookmarklet root').remove();
  };
});
