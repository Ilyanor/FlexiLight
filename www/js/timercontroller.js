


app.controller('timerController', ['$scope', '$interval',
function ($scope, $interval) {
	$scope.retrieves = 5;

	var stop;
	$scope.start = function() {
		if ( angular.isDefined(stop) ) return;
		stop = $interval( function() {
			$scope.retrieves = $scope.retrieves + 1;

		}, 1000);
	};
	$scope.pause = function() {
		if ( angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	}

	$scope.stop = function() {
		if ( angular.isDefined(stop)) {
			$interval.cancel(stop);
			$scope.retrieves = 0;
			stop = undefined;
		}
	};

	$scope.$on('destroy', function() {
		$scope.stop();
	});
}])
