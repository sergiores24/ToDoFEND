var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService,taskService,userService,$uibModal) {
    	$scope.tgroups=[];

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

      $scope.taskModal = function(task){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/task.html',
            controller: 'taskModalController',
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


      $scope.taskCreateModal = function(group){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'pages/modals/taskCreate.html',
            controller: 'taskCreateModalController',
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

controllerModule.controller('taskCreateModalController',
function($scope,taskService,userService,$uibModalInstance,group){
  $scope.group=group;
  $scope.divUser=false;
  $scope.task={users:[]};
  $scope.selectedUsers=[];

  var getUsers=function(){
  	userService.getUsers().then(function(response){
  		$scope.users=response.data;
  		angular.forEach($scope.users,function(val,i){
  			val.fullName=val.name+' '+val.surname;
  			val.index=i;
  		});
  	});
  }

  getUsers();

  $scope.toggledivUser=function(){
        $scope.divUser=!$scope.divUser;
        if(!$scope.divUser){
          $scope.user={};
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

controllerModule.controller('taskModalController',
function($scope,task,taskService,userService,$uibModalInstance){
	$scope.modifyUsers=false;
	$scope.modifyStatus=false;
	$scope.task=task;
	$scope.taskUsers=[];
	$scope.users=[];
	$scope.statusOps=[
	{id:0,name:'Open'},
	{id:1,name:'In-Progress'},
	{id:2,name:'Completed'},
	{id:3,name:'Archived'}];
	
	var getUsers=function(){
		userService.getUsers($scope.task.users).then(function(response){
			$scope.users=response.data;
			angular.forEach($scope.users,function(val,i){
  			val.fullName=val.name+' '+val.surname;
  			val.index=i;
  		});
		});
	};

	var getTaskUsers= function(){
		taskService.getUsers(task._id).then(function(response){
			$scope.taskUsers=response.data;
			angular.forEach($scope.taskUsers,function(val,i){
  			val.fullName=val.name+' '+val.surname;
  		});
		});
	};
	getTaskUsers();

	$scope.togglemodifyUsers=function(){
    $scope.modifyUsers=!$scope.modifyUsers;
    if(!$scope.modifyUsers){
      $scope.user={};
    } else{
    	if($scope.users.length==0){
    		getUsers();
    	}
    }
  };

  $scope.togglemodifyStatus=function(){
    $scope.modifyStatus=!$scope.modifyStatus;
  };

  $scope.changeStatus=function(){
  	if(!$scope.newStatus){
  		alert('Choose a valid status');
  	} else{
  		var status={status: $scope.newStatus.name,taskId: task._id};
  		taskService.setStatus(status).then(function(response){
  			$scope.task.status=$scope.newStatus.name;
  			$scope.newStatus=null;
  			$scope.modifyStatus=false;
  		});
  	}

  }

  $scope.addToUsersList=function(index){
  	var ids={
  		taskId:task._id,
  		userId:$scope.users[index]._id
  	}

  	taskService.addUser(ids).then(function(response){
  		$scope.taskUsers.push($scope.users[index]);
    	$scope.users.splice(index,1);
  	});
	};

  $scope.removeFromUsersList=function(index){
  	var ids={
  		taskId:task._id,
  		userId:$scope.taskUsers[index]._id
  	}

  	taskService.removeUser(ids).then(function(response){
	    $scope.users.push($scope.taskUsers[index]);
	    $scope.taskUsers.splice(index,1);
  	});
  };

});