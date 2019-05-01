var servicesModule = angular.module('ToDoAppServices');

servicesModule.factory('userService', function ($http,api_url) {
    var baseUrl=api_url;
    var headers={headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
    return {
    	getUsers: function(){
    		return $http.get(baseUrl+'/user/getall');
    	},
    	createUser: function(tasksGroup){
    		return $http.post(baseUrl+'/user/register',tasksGroup,[headers]);
    	}
    };
});