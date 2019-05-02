controllerModule.controller('taskController',
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