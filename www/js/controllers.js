// angular.module('controllers', [])

angular.module('module.controllers',[])

//Creating the module which will be referenced in "app.js" with a specific controller named Maincontroller

.controller('MainController',function ($scope) {




 // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
$scope.test="Voyons voir";

$scope.datas = [
{
	time: 1,
	hR: 85,
	rR: 12,
	sa02: 96 	
},
{ 
time:2,
hR:97,
rR:14,
sa02:99 
},
{
	time:3,
	hR:94,
	rR:14,
	sa02:95
},
{
	time: 4,
	hR: 75,
	rR:19,
	sa02:99
}];
$scope.test2="test suivant";
});

