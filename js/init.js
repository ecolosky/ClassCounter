// =============================================================================
//      JS script for appending HTML content to page
//      Ed Colosky
//      July, 2016
//=============================================================================
// append new div for population
var div = document.createElement('div');
div.setAttribute('ng-controller', 'AController');
div.setAttribute('id','bookmarklet root');
var content = '<div class="bookmarklet outer" >';
content += '<div class = "bookmarklet header"><h2 class="bookmarklet title"><b>Class</b>Counter';
content += '<a class="bookmarklet close" ng-click="close();">X</a></h2></div>';
content += '<div class = "bookmarklet inner">';
content += '<div ng-repeat="class in view" class="bookmarklet label {{class.color}}"><div class = "bookmarklet class text" style="{{class.size}}">{{class.name}}</div></div>';
content += '</div>';
content += '</div>';

div.innerHTML = content;
var rootDiv = document.body.firstChild;
document.body.insertBefore(div,rootDiv);
var app = angular.module('bookmarklet', []);

console.log("injected HTML and starting app");
app.run(function ($rootScope) {
  $rootScope.URL = location.href;
});
