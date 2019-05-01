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

      $scope.tasksGroupModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/tasksGroup.html',
            controller: 'tGroupController'
          });
        modalInstance.result.then(function(){
          getTasksGroups();
        });
      }

      $scope.taskModal = function(group){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/taskModal.html',
            controller: 'taskModalController',
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

controllerModule.controller('tGroupController',
function($scope,tasksGroupService,$uibModalInstance){
  $scope.createTasksGroup=function(){
    if($scope.tasksGroupForm.$valid){
      tasksGroupService.createTasksGroup($scope.tasksGroup).then(function(response){
        $uibModalInstance.close();
      });
    }
  };
});

controllerModule.controller('taskModalController',
function($scope,taskService,userService,$uibModalInstance,group){
  $scope.group=group;
  $scope.divUser=false;
  $scope.task={users:[]};
  $scope.selectedUsers=[];

  var getUsers=function(){
  	userService.getUsers().then(function(response){
  		$scope.users=response.data;
  	});
  }

  getUsers();

  $scope.toggledivUser=function(){
        $scope.divUser=!$scope.divUser;
        if(!$scope.divUser){
          $scope.user={};
          $scope.sentUser=false;
        }
      };

	$scope.createTask=function(){
    if($scope.taskForm.$valid){
      $scope.task.groupId=$scope.group._id;
      angular.forEach($scope.selectedUsers,function(val,i){
      	$scope.task.users.push(val._id);
      });
      taskService.createTask($scope.task).then(function(response){
        $uibModalInstance.close();
      });
    }
  };

  $scope.createUser=function(){
  	if($scope.userForm.$valid){
  		userService.createUser($scope.user).then(function(response){
  			$scope.divUser=false;
  			getUsers();
  		});
  	}
  };

  $scope.addToUsersList=function(index){
    $scope.selectedUsers.push($scope.users[index]);
    $scope.users.splice(index,1);
	};

  $scope.removeFromUsersList=function(index){
    $scope.users.push($scope.selectedUsers[index]);
    $scope.selectedUsers.splice(index,1);
  };

});