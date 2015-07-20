IMFApp.factory('StatisticFactory',['$http','$q','$cacheFactory',function($http,$q,$cacheFactory){

    return {
        getStatisticSelectList: function() {
            var deferred = $q.defer();
            var statisticFactoryCache = this.getCache();
            var statisticSelectList = statisticFactoryCache.get('statisticSelectList');
            if(statisticSelectList == null){
                $http.get(imfGlobal.contextPath + '/rest/statistic/statisticselectlist')
                    .success(function (response) {
                        if (response.success) {
                            statisticFactoryCache.put('statisticSelectList',response.data);
                            deferred.resolve(response.data);
                        } else {
                            deferred.reject(response.errors[0].message);
                        }
                    }).error(function() {
                        deferred.reject(imfGlobalMessages.unhandledException);
                    });
            }else{
                deferred.resolve(statisticSelectList);
            }
            return deferred.promise;
        },
        getCache: function(){
            var cacheInfo = $cacheFactory.info();
            return cacheInfo.statisticFactory == null ? $cacheFactory('statisticFactory') : $cacheFactory.get('statisticFactory');
        }
    };

}]);