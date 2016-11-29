// Ionic Starter App

var app=angular.module('starter', ['ionic',"chart.js",'ngCordova']);
// Nothing here. This page is left blank.
var db = null;

app.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    db=window.openDatabase("Database","1.0","Databest2",2000);

    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS etudiant(id INTEGER PRIMARY KEY AUTOINCREMENT, cne VARCHAR, nom TEXT, prenom TEXT)");
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS session(id INTEGER PRIMARY KEY AUTOINCREMENT, time TIME, heartrate INTEGER, oxygen_saturation INTEGER)");
  });
});
