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
		
	  },
	 getUsers: function() {
				return $http.post('/api/getUsers');
		
	  }	 	  
	}
  }];

  app.factory('Login', Login);

})(App);
