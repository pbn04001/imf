'use strict';

var IMFApp = angular.module('IMFApp', ['ngRoute','FixedTableHeaderModule']);

IMFApp.config(['$routeProvider','$logProvider',
    function($routeProvider,$logProvider){
        $logProvider.debugEnabled(true);
        $routeProvider.
            when('/kpi', {
                templateUrl: imfGlobal.contextPath + '/views/kpi.html?v=' + imfGlobal.applicationVersion,
                controller: 'KPIPageCtrl'
            }).
            when('/summary', {
                templateUrl: imfGlobal.contextPath + '/views/summary.html?v=' + imfGlobal.applicationVersion,
                controller: 'SummaryPageCtrl'
            }).
            when('/country', {
                templateUrl: imfGlobal.contextPath + '/views/country.html?v=' + imfGlobal.applicationVersion,
                controller: 'CountryPageCtrl'
            }).
            when('/country/:iso', {
                templateUrl: imfGlobal.contextPath + '/views/country.html?v=' + imfGlobal.applicationVersion,
                controller: 'CountryPageCtrl'
            }).
            when('/summary/:iso/:weoSubjectCode', {
                templateUrl: imfGlobal.contextPath + '/views/summary.html?v=' + imfGlobal.applicationVersion,
                controller: 'SummaryPageCtrl'
            }).
            otherwise({
                redirectTo: '/summary'
            });
    }
]);
