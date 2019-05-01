var servicesModule = angular.module('ToDoAppServices');

servicesModule.factory('taskService', function ($http,api_url) {
    var baseUrl=api_url+'/task/';
    var headers={headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
    return {
    	createTask: function(task){
    		return $http.post(baseUrl+'create',task,[headers]);
    	},
    	getUsers: function(taskId){
    		return $http.get(baseUrl+'getusers',{params:{taskId:taskId}});
    	},
        addUser: function(ids){
            return $http.patch(baseUrl+'adduser',ids,[headers]);
        },
        removeUser: function(ids){
            return $http.patch(baseUrl+'removeuser',ids,[headers]);
        },
        setStatus: function(status){
            return $http.patch(baseUrl+'setstatus',status,[headers]);
        }
    };
});