/** Country Controller **/
IMFApp.controller('CountryController',['$scope','$http','$routeParams','$cacheFactory','$log',
        'CountryFactory','SummaryChartFactory','DialogFactory',
    function ($scope,$http,$routeParams,$cacheFactory,$log,
              CountryFactory,SummaryChartFactory,DialogFactory) {
        var me = $scope;

        var _defaultSortType = 'weoSubjectCode';
        var _defaultSortReverse = false;
        var _defaultCountryISO = 'USA';



        $.extend(me,{
            init: function(){
                me.contextPath = imfGlobal.contextPath;
                me.initialCountryISO =  _defaultCountryISO;
                me.initFromCache();
                me.checkRoutingParams();
                me.attachEvents();
                me.adjustConatinerSizes();
                me.loadCountryStatistics();
                me.populateSelects();
            },getCache: function(){
                var cacheInfo = $cacheFactory.info();
                return cacheInfo.countryController == null ? $cacheFactory('countryController') : $cacheFactory.get('countryController');
            },
            checkRoutingParams: function(){
                if($routeParams.iso != null){
                    me.initialCountryISO = $routeParams.iso;
                    me.selectedCountry = null;
                    me.selectedCountrySelect = null;
                    me.pageDefaulted = false;
                    var countryControllerCache = me.getCache();
                    countryControllerCache.put('pageDefaulted', me.pageDefaulted);
                }
            },
            initFromCache: function(){
                var countryControllerCache = me.getCache();
                me.selectedCountrySelect = countryControllerCache.get('selectedCountrySelect');
                me.sortType = countryControllerCache.get('sortType');
                me.sortReverse  = countryControllerCache.get('sortReverse');
                me.searchStatistics  = countryControllerCache.get('searchStatistics');
                me.pageDefaulted = countryControllerCache.get('pageDefaulted');

                if(me.sortType == null){me.sortType = _defaultSortType;}
                if(me.sortReverse == null){me.sortReverse = _defaultSortReverse;}
                if(me.searchStatistics == null){me.searchStatistics = '';}
                if(me.pageDefaulted == null){me.pageDefaulted = true;}
            },
            attachEvents: function(){
                $(window).resize(function(){
                    me.adjustConatinerSizes();
                });
            },
            updateCache: function(){
                var countryControllerCache = me.getCache();
                countryControllerCache.put('selectedCountrySelect',me.selectedCountrySelect);
                countryControllerCache.put('searchStatistics',me.searchStatistics);
                countryControllerCache.put('sortType',me.sortType);
                countryControllerCache.put('sortReverse',me.sortReverse);
                countryControllerCache.put('pageDefaulted',me.pageDefaulted);
            },
            filterChange: function(){
                me.pageDefaulted = false;
                me.updateCache();
                me.loadCountryStatistics();
            },
            updateStatisticTable: function(sortType){
                me.sortReverse = me.sortType == sortType ? !me.sortReverse : false;
                me.sortType = sortType;
                me.pageDefaulted = false;
                me.updateCache();
                me.loadCountryStatistics();
            },
            resetToDefaults: function(){
                me.pageDefaulted = true;
                me.initialCountryISO =  _defaultCountryISO;
                me.setDefaultCountry();
                me.searchStatistics = '';
                me.sortType = _defaultSortType;
                me.sortReverse = _defaultSortReverse;

                me.updateCache();
                me.loadCountryStatistics();
            },
            populateSelects: function(){
                CountryFactory.getCountrySelectList().then(
                    function(payload) {
                        me.countrySelectList = payload;
                        if(me.selectedCountrySelect == null) {
                            me.setDefaultCountry();
                        }
                    },
                    function(errorPayload){
                        $log.error('failure loading country select list', errorPayload);
                    });
            },
            setDefaultCountry: function(){
                for (var i in me.countrySelectList) {
                    if (me.countrySelectList[i].iso == me.initialCountryISO) {
                        me.selectedCountrySelect = me.countrySelectList[i];
                        var countryControllerCache = me.getCache();
                        countryControllerCache.put('selectedCountrySelect',me.selectedCountrySelect);
                        break;
                    }
                }
            },
            loadCountryStatistics: function(){
                CountryFactory.getCountryByISO(me.selectedCountrySelect != null ? me.selectedCountrySelect.iso : me.initialCountryISO).then(
                    function(payload) {
                        me.selectedCountry = payload
                    },
                    function(errorPayload){
                        $log.error('failure getting country by ISO', errorPayload);
                        DialogFactory.showAlertDialog(errorPayload,"error");
                    });
            },
            rowClicked: function(statistic){
                if(statistic.expanded){
                    statistic.expanded = false;
                }else{
                    statistic.expanded = true;
                    for (var i in me.selectedCountry.countryStatistics) {
                        var statisticChecking = me.selectedCountry.countryStatistics[i];
                        if (statisticChecking.weoSubjectCode != statistic.weoSubjectCode) {
                            statisticChecking.expanded = false;
                        }
                    }
                }
            },
            adjustConatinerSizes: function(){
                var height = $(window).height();
                $('#imf-country-statistics-filters').css('height', (height - 130));
                $('#imf-country-statistics-grid').css('height',(height - 173));
            },
            graphStatistic: function(statistic){
                var hasValue = false;
                for(var i in statistic.statisticValues){
                    if($.trim(statistic.statisticValues[i].value)){
                        hasValue = true;
                        break;
                    }
                }
                if(hasValue) {
                    SummaryChartFactory.showGraphInModal(me.selectedCountry.iso,me.selectedCountry.countryName,[statistic],$scope);
                }else{
                    DialogFactory.showAlertDialog("This statistic does not have any data to graph.","warning");
                }
            }
        });
        me.init();
    }
]);
