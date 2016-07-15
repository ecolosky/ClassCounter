// ================================================================
// 			  JS Script for setting up the bookmarlet
// 			  Ed Colosky
// 			  July, 2016
// =================================================================
(function(){
  // remote code location
  var appRoot = 'http://localhost:8080/';

  // Load the script from url and when it's ready loading run the callback.
  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;

    // Attach handlers for all browsers
    var done = false;
    script.onload = script.onreadystatechange = function() {
      if(
          !done && (
          !this.readyState ||
          this.readyState === 'loaded' ||
          this.readyState === 'complete')
        ) {
        done = true;
        // Continue code
        callback();
        // Handle memory leak in IE just in case
        script.onload = script.onreadystatechange = null;
        document.head.removeChild(script);
      }
    };

    document.head.appendChild(script);
  }


  // Load a list of scripts
  var loadScripts = function(scripts, cb) {
    var script;
    if(scripts.length) {
      script = scripts.shift();
      loadScript(script, function(){
        loadScripts(scripts.slice(0), cb);
      });
    } else {
      if (cb) { cb(); }
    }
  };
  // Load a list of styles
  var loadStyles = function(csss) {
    var css, i, len;
    for (i = 0, len = csss.length; i < len; i++) {
      css =  csss[i];
      var e = document.createElement('link');
      e.setAttribute('rel','stylesheet');
      e.setAttribute('href', css);
      document.head.appendChild(e);
    }
  };

  // load style stylesheet
  loadStyles([
    appRoot + 'css/style.css'
  ]);

  //
  if (document.getElementById('bookmarklet root') != undefined) throw new Error("bookmarklet is already running");

  console.log('now loading the scripts...');
  // scripts to be loaded
  var pendingScripts =
  [
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min.js',
    appRoot + 'js/analyzer.js',
    appRoot + 'js/init.js',
    appRoot + 'js/controller.js'
  ];
  loadScripts(pendingScripts, function() {
    // Initialization of angular app - manually bootstrapped to the document
    angular.element(document).ready(function($scope) {
        angular.bootstrap(document, ['bookmarklet']);
        console.log("bootstrapped angular app to page");
        console.log("lift off!");
    });
  });


})();
