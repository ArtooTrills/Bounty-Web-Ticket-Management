'use strict';

(function(app) {

  var mdInputContainer = function($timeout) {
    return function($scope, element) {
      var ua = navigator.userAgent;
      if (ua.match(/chrome/i) && !ua.match(/edge/i)) {
        $timeout(() => {
          if (element[0].querySelector('input[type=password]:-webkit-autofill')) {
            element.addClass('md-input-has-value');
          }
        }, 100);
      }
    };
  };

  app.directive('mdInputContainer', mdInputContainer);

})(App);
