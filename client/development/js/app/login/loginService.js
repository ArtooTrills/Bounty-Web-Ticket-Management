'use strict';

(function(app) {

  // super simple service
  // each function returns a promise object
  var Login = ['$http', function($http) {
    return {
      //validate: function(user) {
		//  return {
			submit: function(user) {
				return	$http.post('/api/verifyCredentials', user,{
					withCredentials: true,
					headers:{ 'Authorization':  'Basic ' + btoa(user.username + ":" + user.password)}
				});
			},			
		//}
	 //},
	  getUserRoles: function() {
				return $http.post('/api/getUserRoles');
		
	  }	  
	}
  }];

  app.factory('Login', Login);

})(App);
