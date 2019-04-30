var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService,taskService,userService,$uibModal) {
    	$scope.tgroups=[];
      $scope.users=[];
    	$scope.divTask=false;
      $scope.divUser=false;
      $scope.sentUser=false;

    	var getTasksGroups=function(){
    		tasksGroupService.getTasksGroups().then(function(response){
    			$scope.tgroups=response.data;
    		});
    	};
    	getTasksGroups();

      var getUsers=function(){
        userService.getUsers().then(function(res){
                $scope.users=res.data;
        });
      }

        $scope.createUser=function(){
          $scope.sentUser=true;

          var valid= $scope.user.name!=null && $scope.user.surname!=null
          if(valid){
              taskService.createTask($scope.user).then(function(response){
                  getUsers();
              })
          }
        }

        $scope.addToUsersList=function(index){
            $scope.task.users.push($users[index]._id);
            $scope.users.splice(index,1);
        };

        $scope.removeFromUsersList=function(index){
            $scope.users.push($scope.task.users[index]);
            $scope.task.users.splice(index,1);
        };

      $scope.tasksGroupModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'tasksGroup.html',
            controller: 'tGroupController'
          });
        modalInstance.result.then(function(){
          getTasksGroups();
        });
      }

      $scope.taskModal = function(group){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'task.html',
            controller: 'taskModalController',
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

      $scope.toggledivUser=function(){
        $scope.divUser=!$scope.divUser;
        if(!$scope.divUser){
          $scope.user={};
          $scope.sentUser=false;
        }
      };
});

controllerModule.controller('tGroupController',function($scope,tasksGroupService,$uibModalInstance){
  $scope.createTasksGroup=function(){
    if($scope.tasksGroupForm.$valid){
      tasksGroupService.createTasksGroup($scope.tasksGroup).then(function(response){
        $uibModalInstance.close();
      });
    }
  };
});

controllerModule.controller('taskModalController',function($scope,taskService,$uibModalInstance,group){
  $scope.group=group;
  console.log($scope.group);
  $scope.createTask=function(){
    if($scope.taskForm.$valid){
      $scope.task.groupId=$scope.selectedGroup._id;
      taskService.createTask($scope.task).then(function(response){
        $uibModalInstance.close();
      });
    }
  };
});