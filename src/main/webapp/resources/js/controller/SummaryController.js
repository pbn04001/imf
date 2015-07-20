/** Summary Controller **/
IMFApp.controller('SummaryController',['$scope','$http','$log','$cacheFactory',
    'SummaryChartFactory','CountryFactory','StatisticFactory','DialogFactory',
    function ($scope,$http,$log,$cacheFactory,
              SummaryChartFactory,CountryFactory,StatisticFactory,DialogFactory){
        var me = $scope;

        var _defaultISO = 'USA';
        var _defaultWEOSubject = 'NGDPD';

        $.extend(me,{
            init: function(){
                me.initFromCache();
                me.loadStatistics();
                me.populateSelects();
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
                            me.setDefaultCountry();
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
                    if (me.selectedStatistics[0] == null && statistic.weoSubjectCode == _defaultWEOSubject) {
                        me.selectedStatistics[0] = statistic;
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
                    }
                }
            },
            setDefaultCountry: function(){
                me.selectedCountries = [];
                for (var i in me.countrySelectList) {
                    if (me.countrySelectList[i].iso == _defaultISO) {
                        me.selectedCountries[0] = me.countrySelectList[i];
                        break;
                    }
                }
            },
            criteriaChange: function() {
                me.pageDefaulted = false;
                me.updateCache();
                me.loadStatistics();
            },
            updateCache: function(){
                var summaryControllerCache = me.getCache();
                summaryControllerCache.put('selectedCountries', me.selectedCountries);
                summaryControllerCache.put('selectedStatistics', me.selectedStatistics);
                summaryControllerCache.put('pageDefaulted', me.pageDefaulted);
            },
            resetToDefaults: function(){
                me.setDefaultCountry();
                me.setDefaultStatistics();
                me.pageDefaulted = true;
                me.updateCache();
                me.loadStatistics();
            },
            loadStatistics: function(){
                var iso = me.selectedCountries.length == 0 ? _defaultISO :  me.selectedCountries[0].iso;
                var weoSubjectCodes = null;
                if(me.selectedStatistics.length == 0){
                    weoSubjectCodes = [_defaultWEOSubject];
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

