

// There is currently ONE main controller, which is definitely not ideal but
// nothing works when I try to split this in two controllers. To be clean,
// there should be two components, one with the timer and the data, and
// one taking the data to create the chart.
// Nonetheless, it currently works like this, so I will focus about
//improve the graph and the graph displays before working on split pages.


app.controller('MainController', function ($scope, $timeout,$interval,$cordovaSQLite) {

	var timeChart=[];
var heartRateChart=[];
var oxygenSaturationChart=[];


	// Datas is an array of every data we gather. Primarily, it is made of the
	//object currentData, displayed in the webpage, which is the data corresponding
	// to a particular second. This "currentData" is pushed every second into the
	// array of objects "datas", which will ultimately contain every data, second after
	//second.
	$scope.datas = [];
	$scope.currentData = {};
	// $scope.arrayLength=datas.length;

	// TESTING PURPOSE: Random function to create a sample of currentdata and display it.
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

	// TESTING PURPOSE: Sample generation after 2s to test $timeout
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
	//PURPOSE TESING: Value generation
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

	// THIS is the main function. We get a time linked to the timer plus
	// random values. This is where  bluetooth data should be implemented
	// personal note : consider changing the name of the function.

	$scope.randomDataContinuously=function(){
		function addSampleDataTest(){
			var DataSample = { //We generate random values
				time: $scope.retrieves,
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

	// Outside the controller, there is a function named "TransposeArrays",
	// used to convert the array of objects looking like
	// [{1,70,12,99}, {2,74,13,98} ... {800,n,n,n}] to an array of arrays
	// [ [ 1,2,3 ... 800], [70,74, ...], etc] to make it easy to read through



	$scope.chartGeneration = function() {
		var transpTableaux = transposeArrays($scope.datas.map(Object.values)); // we transpose the arrays of the data we have gathered
		// console.log(transpTableaux);
		// We create the variables we will play with in the charts
		 $scope.timeChart = transpTableaux[0];
		// console.log(timeChart);
		$scope.heartRateChart=transpTableaux[1];
		 $scope.oxygenSaturationChart=transpTableaux[3];

		$scope.labelsTest=$scope.timeChart;
		$scope.seriesTest=['HR','Sa02'];
		$scope.datasTest=[$scope.heartRateChart,$scope.oxygenSaturationChart];

		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};

		$scope.colors = ['#d10e35', '#0e32d1'];

		$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' },{xAxisID:'x-axis'}];
		$scope.options = {
			scales: {
				yAxes: [
					{
						id: 'y-axis-1',
						type: 'linear',
						display: true,
						position: 'left',
						ticks: {
							fontColor:'#d10e35',
							max:180,
							min:40,
							stepSize:5
						}
					},
					{
						id: 'y-axis-2',
						type: 'linear',
						display: true,
						position: 'right',
						ticks: {
							fontColor:'#0e32d1',
							max:100,
							min:80,
							stepSize:5}
						},
					],
					// xAxes:[{
					// 	type:'time',
					// 	time:{
					// 		displayFormats:{
					// 			second:'h:mm:ss a'
					// 		}
					// 	}
					// }]
				},
				legend:{
					display: true,
					position:'bottom'
				}
			};
		}

		// Part about the timer. When clicking on stop, values are set to 0, but that does
		// not prevent the function randomdatacontinously to push new data every second
		// I haven't been through this part since you told me last week that you had fixed that bug
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
				$scope.currentData.hR = 0;
				$scope.currentData.rR = 0;
				$scope.currentData.sa02 =0;
			}
		};

		$scope.$on('destroy', function() {
			$scope.stop();
		});

		$scope.showResults = false;
		$scope.showResultsButton = function() {
			$scope.showResults = !$scope.showResults;
		}


		// app.controller('FormulaireCtrl', function($scope,$cordovaSQLite){
		$scope.insert=function(etudiant){
			// var query="INSERT INTO session (time,heartrate,oxygen_saturation) VALUES(?,?,?)";
console.log($scope.timeChart[3]);
console.log($scope.heartRateChart[3]);
console.log($scope.oxygenSaturationChart[3]);
			db.transaction(function(tx) {
				for(i = 0;i<$scope.datas.length;i++){
				tx.executeSql('INSERT INTO session VALUES (?,?,?,?)', [null,$scope.timeChart[i],$scope.heartRateChart[i],$scope.oxygenSaturationChart[i]]);
			}}, function(error) {
				console.log('Transaction ERROR: ' + error.message);
			}, function() {
				console.log('Populated database OK');
			});

			// 		$scope.insert=function(etudiant){

			// 			$cordovaSQLite.execute(db,query,[$scope.currentData.time,$scope.currentData.,etudiant.prenom]).then(function(res){
			// 			// var query="INSERT INTO session (cne,nom,prenom) VALUES(?,?,?)";
			// 			// $cordovaSQLite.execute(db,query,[etudiant.cne,etudiant.nom,etudiant.prenom]).then(function(res){
			// 				alert($scope.status="Etudiant ajouté avec succès");
			// 			},
			// function(err){
			// 				alert($scope.status="Erreur lors de l'ajout : "+err.message);
			// 			});
			// $scope.load();
		};

		$scope.load=function(){
			$scope.donnees=[];
			$cordovaSQLite.execute(db,'SELECT cne,nom,prenom FROM etudiant')
			.then(
				function(res){
					if(res.rows.length){
						for(var i=0;i<res.rows.length;i++){
							$scope.donnees.push(res.rows.item(i));
						}
						$scope.status="Chargement réussi";
					}
				},function(err){
					$scope.status="Erreur lors du chargement" + err.message;

				}
			)
		};
		// });
	});
	function transposeArrays(a)
	{
		return a[0].map(function (_, c) {
			return a.map(function (r)
			{ return r[c];
			});
		});
	};

	// function convArrayToMin(a) {
	// 	for (i=0;i< a.length;i+60) {
	// math.
	// }
	// };
