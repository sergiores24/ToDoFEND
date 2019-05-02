controllerModule.controller('userController',
function($scope,userService,$uibModalInstance){

	$scope.user={};

	$scope.users=[];

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

	$scope.createUser=function(){
  	if($scope.userForm.$valid){
  		userService.createUser($scope.user).then(function(response){
  			alert('User: '+$scope.user.name+' '+$scope.user.surname+' created');
  			getUsers();
  		});
  	}
  };

	$scope.cancel = function () {
  	$uibModalInstance.dismiss('cancel');
  };

});