/** Summary Controller **/
IMFApp.controller('SummaryController',['$scope','$http','$log','$cacheFactory','$routeParams',
    'SummaryChartFactory','CountryFactory','StatisticFactory','DialogFactory',
    function ($scope,$http,$log,$cacheFactory,$routeParams,
              SummaryChartFactory,CountryFactory,StatisticFactory,DialogFactory){
        var me = $scope;

        var _defaultCountryISO = 'USA';
        var _defaultWEOSubject = 'NGDPD';

        $.extend(me,{
            init: function(){
                me.contextPath = imfGlobal.contextPath;
                me.initialCountryISO = _defaultCountryISO;
                me.initialWeoSubjectCode = _defaultWEOSubject;

                me.initFromCache();
                me.checkRoutingParameters();
                me.loadStatistics();
                me.populateSelects();
            },
            checkRoutingParameters: function(){
                var updatePageDefaults = false;
                if($routeParams.iso != null){
                    me.initialCountryISO = $routeParams.iso;
                    me.selectedCountries = [];
                    updatePageDefaults = true;
                }
                if($routeParams.weoSubjectCode != null){
                    me.initialWeoSubjectCode = $routeParams.weoSubjectCode;
                    me.selectedStatistics = [];
                    updatePageDefaults = true;
                }
                if(updatePageDefaults){
                    me.pageDefaulted = false;
                    var summaryControllerCache = me.getCache();
                    summaryControllerCache.put('pageDefaulted', me.pageDefaulted);
                }
            },
            getCache: function(){
                var cacheInfo = $cacheFactory.info();
                return cacheInfo.summaryController == null ? $cacheFactory('summaryController') : $cacheFactory.get('summaryController');
            },
            initFromCache: function(){
                var summaryControllerCache = me.getCache();
                me.selectedCountries = summaryControllerCache.get('selectedCountries');
                me.selectedStatistics = summaryControllerCache.get('selectedStatistics');
                me.pageDefaulted = summaryControllerCache.get('pageDefaulted');

                if(me.selectedCountries == null){me.selectedCountries = [];}
                if(me.selectedStatistics == null){me.selectedStatistics = [];}
                if(me.pageDefaulted == null){me.pageDefaulted = true;}
            },
            populateSelects: function(){
                CountryFactory.getCountrySelectList().then(
                    function(payload) {
                        me.countrySelectList = payload;
                        if(me.selectedCountries[0] == null) {
                            me.initCountrySelects();
                        }
                    },
                    function(errorPayload){
                        $log.error('failure loading country select list', errorPayload);
                    });

                StatisticFactory.getStatisticSelectList().then(
                    function(payload) {
                        me.statisticSelectList = payload;
                        me.initStatisticSelects();
                    },
                    function(errorPayload) {
                        $log.error('failure loading statistic select list', errorPayload);
                    });
            },
            initStatisticSelects: function(){
                for(var i in me.statisticSelectList) {
                    var statistic = me.statisticSelectList[i];
                    statistic.displayName = '(' + statistic.weoSubjectCode + ') ' + statistic.weoSubjectTitle;
                    if (me.selectedStatistics[0] == null && statistic.weoSubjectCode == me.initialWeoSubjectCode) {
                        me.selectedStatistics[0] = statistic;
                        var summaryControllerCache = me.getCache();
                        summaryControllerCache.put('selectedStatistics', me.selectedStatistics);
                    }
                }
            },
            setDefaultStatistics: function(){
                me.selectedStatistics = [];
                for(var i in me.statisticSelectList) {
                    var statistic = me.statisticSelectList[i];
                    statistic.displayName = '(' + statistic.weoSubjectCode + ') ' + statistic.weoSubjectTitle;
                    if (statistic.weoSubjectCode == _defaultWEOSubject) {
                        me.selectedStatistics[0] = statistic;
                        var summaryControllerCache = me.getCache();
                        summaryControllerCache.put('selectedStatistics', me.selectedStatistics);
                    }
                }
            },
            initCountrySelects: function(){
                me.selectedCountries = [];
                for (var i in me.countrySelectList) {
                    if (me.countrySelectList[i].iso ==  me.initialCountryISO) {
                        me.selectedCountries[0] = me.countrySelectList[i];
                        var summaryControllerCache = me.getCache();
                        summaryControllerCache.put('selectedCountries', me.selectedCountries);
                        break;
                    }
                }
            },
            criteriaChange: function() {
                me.pageDefaulted = false;
                me.upateEntireCache();
                me.loadStatistics();
            },
            upateEntireCache: function(){
                var summaryControllerCache = me.getCache();
                summaryControllerCache.put('selectedCountries', me.selectedCountries);
                summaryControllerCache.put('selectedStatistics', me.selectedStatistics);
                summaryControllerCache.put('pageDefaulted', me.pageDefaulted);
            },
            resetToDefaults: function(){
                me.pageDefaulted = true;
                me.initialCountryISO = _defaultCountryISO;
                me.initialWeoSubjectCode =  _defaultWEOSubject;
                me.initCountrySelects();
                me.setDefaultStatistics();
                me.upateEntireCache();
                me.loadStatistics();
            },
            loadStatistics: function(){
                var iso = me.selectedCountries.length == 0 ? me.initialCountryISO :  me.selectedCountries[0].iso;
                var weoSubjectCodes = null;
                if(me.selectedStatistics.length == 0){
                    weoSubjectCodes = [me.initialWeoSubjectCode];
                }else{
                    var weoSubjectCodeArray = [];
                    for(var i in me.selectedStatistics){
                        weoSubjectCodeArray.push(me.selectedStatistics[i].weoSubjectCode);
                    }
                    weoSubjectCodes = weoSubjectCodeArray;
                }
                var dataObj = {
                    iso:iso,
                    weoSubjectCodes: weoSubjectCodes
                };

                $http.post(imfGlobal.contextPath + '/rest/statistic/getsummarystatistics', dataObj)
                    .success(function(response) {
                        if(response.success){
                            var values = response.data;
                            SummaryChartFactory.buildChart(values.countryISO,values.countryName,values.countryStatistics,'#imf-summary-chart-div');
                        }else{
                            $log.error(response.errors[0].message);
                            DialogFactory.showAlertDialog(response.errors[0].message,"error");
                        }
                    }).error(function(response,status){
                        $log.error("Bad server response",status);
                        DialogFactory.showAlertDialog(imfGlobalMessages.unhandledException,"error");
                    });
            },
            clearStatistic: function(statisticPosition){
                delete me.selectedStatistics[statisticPosition];
                me.criteriaChange();
            }
        });
        me.init();
    }
]);

