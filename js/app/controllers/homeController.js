var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService,taskService,userService,$uibModal) {
      $scope.tgroups=[];

    	var getTasksGroups=function(){
    		tasksGroupService.getTasksGroups().then(function(response){
    			$scope.tgroups=response.data;
    		});
    	};

      //Initial request
      getTasksGroups();

/*---------Opening modal functions------------*/

      //Modal for Creating users
      $scope.userModal=function(){
        modalInstance=$uibModal.open({
          animation: true,
            templateUrl: 'pages/modals/user.html',
            controller: 'userController',
            size:'lg'
        });
      }

      //Open modal for Task details
      $scope.taskModal = function(task){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/task.html',
            controller: 'taskController',
            size:'lg',
            resolve: {
              task: function(){
                return task;
              }
            }
          });
        modalInstance.result.then(function(){
          getTasksGroups();
        });
      };

      //Open modal for creating tasks group
      $scope.tasksGroupModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/tasksGroup.html',
            controller: 'tasksGroupController'
          });
        modalInstance.result.then(function(){
          getTasksGroups();
        });
      }

      //Open modal to creating new Task
      $scope.taskCreateModal = function(group){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/taskCreate.html',
            controller: 'taskCreateController',
            size:'lg',
            resolve: {
              group: function(){
                return group;
              }
            }
          });
        modalInstance.result.then(function(){
          getTasksGroups();
        });
      };
});