'use strict';

var IMFApp = angular.module('IMFApp', ['ngRoute','anguFixedHeaderTable']);

IMFApp.config(['$routeProvider','$logProvider',
    function($routeProvider,$logProvider) {
        $logProvider.debugEnabled(true);
        $routeProvider.
            when('/kpi', {
                templateUrl: imfGlobal.contextPath + '/pages/kpi.html?v=' + imfGlobal.applicationVersion,
                controller: 'KPIPageCtrl'
            }).
            when('/summary', {
                templateUrl: imfGlobal.contextPath + '/pages/summary.html?v=' + imfGlobal.applicationVersion,
                controller: 'SummaryPageCtrl'
            }).
            when('/country', {
                templateUrl: imfGlobal.contextPath + '/pages/country.html?v=' + imfGlobal.applicationVersion,
                controller: 'CountryPageCtrl'
            }).
            when('/country/:iso', {
                templateUrl: imfGlobal.contextPath + '/pages/country.html?v=' + imfGlobal.applicationVersion,
                controller: 'CountryPageCtrl'
            }).
            when('/summary/:iso/:weoSubjectCode', {
                templateUrl: imfGlobal.contextPath + '/pages/summary.html?v=' + imfGlobal.applicationVersion,
                controller: 'SummaryPageCtrl'
            }).


            otherwise({
                redirectTo: '/summary'
            });
    }
]);
