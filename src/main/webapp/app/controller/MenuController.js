/** Menu Controller **/
var menuController = IMFApp.controller('MenuController',['$scope','$rootScope',
    function ($scope,$rootScope) {

    $rootScope.contextPath = imfGlobal.contextPath;
    $scope.pageSummary = "test";

    menuController.pageChange = function(page){
        $scope.pageKPI = '';
        $scope.pageSummary = '';
        $scope.pageCountry = '';
        switch (page){
            case 'kpi':
                $scope.pageKPI = 'imfs-active';
                break;
            case 'summary':
                $scope.pageSummary = 'imfs-active';
                break;
            case 'country':
                $scope.pageCountry = 'imfs-active';
                break;
        }
    }
}]);
IMFApp.controller('KPIPageCtrl', ['$scope', '$http',function ($scope, $http) {
    menuController.pageChange('kpi');
}]);
IMFApp.controller('SummaryPageCtrl', ['$scope', '$http',function ($scope, $http) {
    menuController.pageChange('summary');
}]);
IMFApp.controller('CountryPageCtrl', ['$scope', '$http',function ($scope, $http){
    menuController.pageChange('country');
}]);