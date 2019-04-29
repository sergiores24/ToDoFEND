var servicesModule = angular.module('ToDoAppServices');

servicesModule.factory('taskService', function ($http,api_url) {
    var baseUrl=api_url+'/task/';
    var headers={headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
    return {
    	createTask: function(task){
    		return $http.post(baseUrl+'create',task,[headers]);
    	}
    };
});