controllerModule.controller('tasksGroupController',
function($scope,tasksGroupService,$uibModalInstance){

//Send request to create new tasks group
  $scope.createTasksGroup=function(){
    if($scope.tasksGroupForm.$valid){
      tasksGroupService.createTasksGroup($scope.tasksGroup).then(function(response){
        $uibModalInstance.close();
      });
    }
  };
});