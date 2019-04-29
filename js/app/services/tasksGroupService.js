var servicesModule = angular.module('ToDoAppServices');

servicesModule.factory('tasksGroupService', function ($http,api_url) {
    var baseUrl=api_url;
    var headers={headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
    return {
    	getTasksGroups: function(){
    		return $http.get(baseUrl+'/tasksgroup/getall');
    	},
    	createTasksGroup: function(tasksGroup){
    		return $http.post(baseUrl+'/tasksgroup/create',tasksGroup,[headers]);
    	}
    };
});