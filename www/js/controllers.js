// angular.module('controllers', [])

// var app=angular.module('module.controllers',[]);

//Creating the module which will be referenced in "app.js" with a specific controller named Maincontroller

app.controller('MainController', function ($scope, $timeout,$interval) {

	var timeChart=[];
	$scope.test = "Voyons voir";

	$scope.currentData = {};
	// $scope.arrayLength=datas.length;
	$scope.datas = [
	// 	{
	// 		time: 1,
	// 		hR: 85,
	// 		rR: 12,
	// 		sa02: 96
	// 	},
	// 	{
	// 		time:2,
	// 		hR:97,
	// 		rR:14,
	// 		sa02:99
	// 	},
	// 	{
	// 		time:3,
	// 		hR:94,
	// 		rR:14,
	// 		sa02:95
	// 	},
	// 	{
	// 		time: 4,
	// 		hR: 75,
	// 		rR:19,
	// 		sa02:99
	// 	}
	];



	$scope.test2="test suivant";

	$scope.simulateRead = function () {
		while (1) {
			$scope.$interval(function () {
				var DataSample = {
					time: Math.random() * 10,
					hR: Math.random() * 100,
					rR: Math.random() * 100,
					sa02: Math.random() * 100
				};
				$scope.datas.push(DataSample);
			}, 2000);
		}
	};

	$scope.simulateReadAfterTwoSecs = function () {
		$timeout(function () {
			var DataSample = {
				time: Math.random() * 10,
				hR: Math.random() * 100,
				rR: Math.random() * 100,
				sa02: Math.random() * 100
			};
			$scope.datas.push(DataSample);
		}, 1000);
		$scope.currentData = DataSample;
	};

	$scope.addSampleData = function () {
		var DataSample = {
			time: Math.floor((Math.random() * 10) + 1),
			hR: Math.floor((Math.random() * 50) + 40),
			rR: Math.floor((Math.random() * 15) + 10),
			sa02: Math.floor((Math.random() * 10) + 90)
		};
		$scope.datas.push(DataSample);
		$scope.currentData = DataSample;
		console.log($scope.datas.length);
		$scope.testLengthDataSample=$scope.datas.length;

	};



	$scope.randomDataContinuously=function(){
		function addSampleDataTest(){
			var DataSample = { //We generate random values
				time: $scope.retrieves, // transform it to something better ie integrate in for loopg
				hR: Math.floor((Math.random() * 50) + 40),
				rR: Math.floor((Math.random() * 15) + 10),
				sa02: Math.floor((Math.random() * 10) + 90)
			};
			$scope.datas.push(DataSample); //we push into the array "datasample"
			$scope.currentData = DataSample;
			// console.log($scope.datas.length); // display the length, allow to show if the array is correctly expanding
			$scope.testLengthDataSample=$scope.datas.length;
		};
		$interval(addSampleDataTest,1000); // we repeat this function each second.
	};

	// $scope.arrayTransformation = function() {
	// 	//1 Convert the array of objects in an array of arrays
	// 	var outputData = $scope.datas.map( Object.values );
	//
	// 	console.log(outputData);
	// 	// 2 Transpose this array of arrays to go from N arrays with 4 values to 4 arrays with N values
	// 	var arraysTransposed = 	transposeArrays(outputData);
	// 	var timeChart = $scope.arraysTransposed[0];
	// 	arraysTransposed.shift();
	// 	console.log(arraysTransposed);
	// };

	$scope.chartGeneration = function() {
var transpTableaux = transposeArrays($scope.datas.map(Object.values));
console.log(transpTableaux);
var timeChart = transpTableaux[0];
console.log(timeChart);
var heartRateChart=transpTableaux[1];
var oxygenSaturationChart=transpTableaux[3];

$scope.labelsTest=timeChart;
$scope.seriesTest=['HR','Sa02'];
$scope.datasTest=[heartRateChart,oxygenSaturationChart];

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	$scope.options = {
		scales: {
			yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				},
				{
					id: 'y-axis-2',
					type: 'linear',
					display: true,
					position: 'right'
				}
			]
		}
	};
}
	$scope.retrieves = 0;

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
			$scope.currentData=[];
		}
	};

	$scope.$on('destroy', function() {
		$scope.stop();
	});

	$scope.showResults = false;
	$scope.showResultsButton = function() {
		$scope.showResults = !$scope.showResults;
	}
});

function transposeArrays(a)
{
	return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
};
