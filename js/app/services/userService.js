var servicesModule = angular.module('ToDoAppServices');

servicesModule.factory('userService', function ($http,api_url) {
    var baseUrl=api_url;
    var headers={headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
    return {
    	getUsers: function(users){
            console.log(JSON.stringify(users));
    		return $http.get(baseUrl+'/user/getall',{params:{users:JSON.stringify(users)}});
    	},
    	createUser: function(user){
    		return $http.post(baseUrl+'/user/register',user,[headers]);
    	}
    };
});