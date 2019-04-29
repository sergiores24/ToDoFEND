var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService) {
    	$scope.tgroups=[]
    	var getTasksGroups=function(){
    		tasksGroupService.getTasksGroups().then(function(response){
    			console.log(response.data);
    			$scope.tgroups=response.data;
    		});
    	}
    	getTasksGroups();
});