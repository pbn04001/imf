IMFApp.factory('CountryFactory',['$http','$q','$cacheFactory',function($http,$q,$cacheFactory){

    return {
        getCountrySelectList: function() {
            var deferred = $q.defer();
            var countryFactoryCache = this.getCache();
            var countrySelectList = countryFactoryCache.get('countrySelectList');
            if(countrySelectList == null){
                $http.get(imfGlobal.contextPath + '/rest/country/countryselectlist')
                    .success(function (response) {
                        if (response.success) {
                            countryFactoryCache.put('countrySelectList',response.data);
                            deferred.resolve(response.data);
                        } else {
                            deferred.reject(response.errors[0].message);
                        }
                    }).error(function(){
                        deferred.reject(imfGlobal.messages.unhandledException);
                    });
            }else{
                deferred.resolve(countrySelectList);
            }
            return deferred.promise;
        },
        getCountryByISO: function(iso) {
            var deferred = $q.defer();
            $http.get(imfGlobal.contextPath + '/rest/country/iso/' + iso)
                .success(function (response) {
                    if (response.success){
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.errors[0].message);
                    }
                }).error(function(response,status){
                    $log.error("Bad server response",status);
                    deferred.reject(imfGlobal.messages.unhandledException);
                });
            return deferred.promise;
        },
        getCache: function(){
            var cacheInfo = $cacheFactory.info();
            return cacheInfo.countryFactory == null ? $cacheFactory('countryFactory') : $cacheFactory.get('countryFactory');
        }
    }
}]);