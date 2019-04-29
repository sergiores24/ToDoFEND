var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService) {
    	$scope.tgroups=[]
    	$scope.tasksGroup={};
    	$scope.selectedGroup={};
    	$scope.divGroup=false;
    	$scope.divTask=false;
    	var getTasksGroups=function(){
    		tasksGroupService.getTasksGroups().then(function(response){
    			console.log(response.data);
    			$scope.tgroups=response.data;
    		});
    	};
    	getTasksGroups();
    	$scope.createTasksGroup=function(){
    		if($scope.tasksGroupForm.$valid){
    			tasksGroupService.createTasksGroup($scope.tasksGroup).then((response)=>{
    				$scope.tasksGroup={};
    				$scope.divGroup=false;
    				$scope.tasksGroupForm.$submitted=false;
    				getTasksGroups();
    			});
    		}
    	};
    	$scope.toggledivGroup=function(){
    		$scope.divGroup=!$scope.divGroup;
    	}

    	$scope.toggledivTask=function(group){
    		$scope.divTask=!$scope.divTask;
    		if($scope.divTask){
    			$scope.selectedGroup=group;
    		}else{$scope.selectedGroup={};}
    	}
});