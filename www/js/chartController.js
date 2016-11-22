// angular.module("Chart.controllers", ["chart.js"])

app.controller("LineCtrl", function ($scope) {

  var arraysTransposedChart = [];

  // $scope.$watch(function () {
  //   return dataEx.getValueCharts();
  //   }, function (newValue, oldValue) {
  //        if (newValue != null) {
  //            //update Controller2's xxx value
  //            $scope.valueCharts= newValue;
  //        }
  //    }, true);

//   $scope.newValue()= function(){
// return dataEx.getValueCharts();
//   };



  // $scope.$watch(getValues(),setNewValue(),true);

  //
  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B', 'Series C'];
  // $scope.data = $scope.arraysTransposed;
  //
  //
  //
  //
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
  //
  // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  // $scope.options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         id: 'y-axis-1',
  //         type: 'linear',
  //         display: true,
  //         position: 'left'
  //       },
  //       {
  //         id: 'y-axis-2',
  //         type: 'linear',
  //         display: true,
  //         position: 'right'
  //       }
  //     ]
  //   }
  // };









  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];



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


});


// datas are in an array of objects presented like {1;98;12;99};{2;85;13;100}.
// Hence, what we require is to loop through it and extract the value at the end to get
//  {1,2};{98,85};{12,13};{99,100};
// the length of the graph will the size of the array.

-->
