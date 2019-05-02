controllerModule.controller('taskCreateController',
function($scope,taskService,userService,$uibModalInstance,group){
  $scope.group=group;
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

  $scope.addToUsersList=function(index){
    $scope.selectedUsers.push($scope.users[index]);
    $scope.users.splice(index,1);
	};

  $scope.removeFromUsersList=function(index){
    $scope.users.push($scope.selectedUsers[index]);
    $scope.selectedUsers.splice(index,1);
  };

});