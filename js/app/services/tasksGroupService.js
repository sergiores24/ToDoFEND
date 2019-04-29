var servicesModule = angular.module('ToDoAppServices');

servicesModule.factory('tasksGroupService', function ($http,api_url) {
    var baseUrl=api_url;
    return {
    	getTasksGroups: function(){
    		return $http.get(baseUrl+'/tasksgroup/getall');
    	}
    };
});