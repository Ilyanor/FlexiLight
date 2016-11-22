app.service('dataEx', function () {

  var valueCharts = {};

  return {
    getValueCharts: function () {
      return valueCharts;
    },
    setValueCharts: function (value) {
      valueCharts = value;
    }
  };

});
