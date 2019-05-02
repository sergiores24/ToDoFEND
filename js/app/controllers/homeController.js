var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService,taskService,userService,$uibModal) {
    	$scope.tgroups=[];

    	var getTasksGroups=function(){
    		tasksGroupService.getTasksGroups().then(function(response){
    			$scope.tgroups=response.data;
    		});
    	};

      var getUsers=function(){
        userService.getUsers().then(function(res){
                $scope.users=res.data;
        });
      }

      $scope.createUser=function(){

        var valid= $scope.user.name!=null && $scope.user.surname!=null
        if(valid){
            taskService.createTask($scope.user).then(function(response){
                getUsers();
            })
        }
      }

      getTasksGroups();

      $scope.userModal=function(){
        modalInstance=$uibModal.open({
          animation: true,
            templateUrl: 'pages/modals/user.html',
            controller: 'userController',
            size:'lg'
        });
      }

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