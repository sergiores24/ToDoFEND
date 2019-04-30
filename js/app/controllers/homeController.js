var controllerModule = angular.module('ToDoAppControllers');

controllerModule.controller('homeController',
    function ($scope,tasksGroupService,taskService,userService) {
    	$scope.tgroups=[];
      $scope.users=[];
    	$scope.divGroup=false;
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
                getUsers();
    		}else{
                $scope.users=[];
    			$scope.tasks={};
    			$scope.selectedGroup={};
    			$scope.taskForm.$submitted=false;
    		}
    	};

      $scope.toggledivUser=function(){
        $scope.divUser=!$scope.divUser;
        if(!$scope.divUser){
          $scope.user={};
          $scope.sentUser=false;
        }
      };
});