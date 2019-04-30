var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService,taskService) {
    	$scope.tgroups=[];
    	$scope.task={};
    	$scope.tasksGroup={};
    	$scope.selectedGroup={};
    	$scope.divGroup=false;
    	$scope.divTask=false;
    	var getTasksGroups=function(){
    		tasksGroupService.getTasksGroups().then(function(response){
    			$scope.tgroups=response.data;
    		});
    	};
    	getTasksGroups();
    	$scope.createTasksGroup=function(){
    		if($scope.tasksGroupForm.$valid){
    			tasksGroupService.createTasksGroup($scope.tasksGroup).then(function(response){
    				$scope.tasksGroup={};
    				$scope.divGroup=false;
    				$scope.tasksGroupForm.$submitted=false;
    				getTasksGroups();
    			});
    		}
    	};

    	$scope.createTask=function(){
    		if($scope.taskForm.$valid && $scope.divTask){
    			$scope.task.groupId=$scope.selectedGroup._id;
    			taskService.createTask($scope.task).then(function(response){
    				$scope.tasks={};
    				$scope.divTask=false;
    				$scope.taskForm.$submitted=false;
    				getTasksGroups();
    			})
    		}
    	};

    	$scope.toggledivGroup=function(){
    		$scope.divGroup=!$scope.divGroup;
    		if(!$scope.divGroup){
    			$scope.tasksGroup={};
    			$scope.tasksGroupForm.$submitted=false;
    		}
    	};

    	$scope.toggledivTask=function(group){
    		$scope.divTask=!$scope.divTask;
    		if($scope.divTask){
    			$scope.selectedGroup=group;
    		}else{
    			$scope.tasks={};
    			$scope.selectedGroup={};
    			$scope.taskForm.$submitted=false;
    		}
    	};
});