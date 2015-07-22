IMFApp.factory('SummaryChartFactory',[function() {
    return {
        primaryColor: '#3367d6',
        secondaryColor: '#129269',

        buildChart: function (countryISO,countryName,statistics, target) {
            var me = this;
            var minYear = null;
            var maxYear = null;
            for(var i in statistics){
                for(var j in statistics[i].statisticValues){
                    var statistic = statistics[i].statisticValues[j];
                    if(statistic.value != null) {
                        if (minYear == null) {
                            minYear = statistic.year;
                        } else if (statistic.year < minYear) {
                            minYear = statistic.year;
                        }
                        if (maxYear == null) {
                            maxYear = statistic.year;
                        } else if (statistic.year > maxYear) {
                            maxYear = statistic.year;
                        }
                    }
                }
            }
            var years = [];
            for(var i = minYear; i <= maxYear; i++){
                years.push(i);
            }


            var subtitle = [];
            var yAxisArray = [];
            var seriesArray = [];
            var position = 0;
            for (var i in statistics) {
                var statistic = statistics[i];
                var subjectDescriptor = statistic.subjectDescriptor;
                var subjectDescriptorAbrev = subjectDescriptor;
                if (subjectDescriptor.length > 40) {
                    subjectDescriptor = subjectDescriptor.substring(0, 40) + '...';
                }
                if (subjectDescriptorAbrev.length > 20) {
                    subjectDescriptorAbrev = subjectDescriptorAbrev.substring(0, 20) + '...';
                }

                subtitle.push("<span>(" + statistic.weoSubjectCode + ") " + subjectDescriptor + "</span>");

                var value = '{value}';
                var labelFormatter = function () {
                    return this.value;
                }

                var suffix = '';
                var prefix = '';
                var currency = false;
                var usDollar = false;
                var percent = false;

                if (statistic.statisticUnit.indexOf('Percent') > -1) {
                    labelFormatter = function () {
                        return this.value + '%';
                    }
                    suffix = '%'
                    percent = true;
                } else if (statistic.statisticUnit.indexOf('U.S. dollars') > -1) {
                    currency = true;
                    usDollar = true;
                    prefix = '$';
                } else if (statistic.statisticUnit.indexOf('currency') > -1) {
                    currency = true;
                }

                if (currency || usDollar) {
                    labelFormatter = function () {
                        if (this.value != null) {
                            return prefix + me.formatMoney(this.value,0, '.', ',');
                        }
                        return null;
                    }
                }

                var color = this.primaryColor;
                if (position == 1) {
                    color = this.secondaryColor;
                }
                var yAxis = { // Primary yAxis
                    labels: {
                        formatter: labelFormatter,
                        style: {
                            color: color,
                            fontSize: '11px'
                        }
                    },
                    title: {
                        text: subjectDescriptor,
                        style: {
                            color: color,
                            fontSize: '14px'
                        }
                    }
                };
                if (position == 1) {
                    yAxis.opposite = true;
                }
                yAxisArray.push(yAxis);

                var statisticValues = [];
                for (var j in statistic.statisticValues) {
                    var statisticValue = statistic.statisticValues[j];
                    if(minYear <= statisticValue.year && maxYear >= statisticValue.year) {
                        statisticValues.push({
                            y: statisticValue.value,
                            currency: currency,
                            usDollar: usDollar,
                            percent: percent
                        });
                    }
                }

                var seriesName = statistic.weoSubjectCode + ' - ' + statistic.statisticUnit;
                if($.trim(statistic.statisticScale)){
                    seriesName += ' (' + statistic.statisticScale + ')';
                }
                var series = {
                    name: seriesName,
                    color: color,
                    type: 'spline',
                    data: statisticValues,
                    tooltip: {
                        valueSuffix: suffix,
                        valuePrefix: prefix
                    }

                }
                if (statistics.length > 1 && position == 0) {
                    series.yAxis = position + 1;
                }

                seriesArray.push(series);
                position++;
            }
            var tooltip = {
                shared: true
            }
            $(target).highcharts({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: '<a href="' + imfGlobal.contextPath + '/#/country/' + countryISO + '">' + countryName + '</a>',
                    useHTML: true
                },
                subtitle: {
                    text: subtitle.join(" compared to ")
                },
                xAxis: [{
                    categories: years,
                    crosshair: true
                }],
                yAxis: yAxisArray,
                tooltip: tooltip,
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 20,
                    verticalAlign: 'top',
                    y: 0,
                    floating: true,
                    backgroundColor: '#ffffff'
                },
                series: seriesArray
            });
        },
        showGraphInModal: function(countryISO,countryName,statistics,$scope){
            var me = this;

            if(this.graphModal != null){
                this.graphModal.modal('hide');
            }

            var resizeModal = function(){
                var height = $(window).height();
                me.graphModal.css('width', $(window).width() - 20);
                me.graphModal.css('height', height - 20);
                $('#imf-graph-modal-body-' + randId).css('height', height - 140);
            }
            if(!this.windowResizeBound) {
                $(window).resize(function () {
                    resizeModal();
                });
                this.windowResizeBound = true;
            }

            var randId = Math.round(Math.random()*1000000);
            var dialog = '<div id="imf-graph-modal-' + randId + '" class="imf-summary-graph-modal modal fade">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title">' + name + '</h4>' +
                '</div>' +
                '<div id="imf-graph-modal-body-' + randId + '" class="modal-body">' +

                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            $('body').append(dialog);

            this.graphModal = $('#imf-graph-modal-' + randId);
            this.graphModal.on('shown', function() {
                resizeModal();
                me.buildChart(countryISO,countryName,statistics,'#imf-graph-modal-body-' + randId);
            });
            this.graphModal.modal({backdrop : false, show : false, keyboard : true});
            this.graphModal.modal('show');
        },
        formatMoney: function(n,c, d, t){
            var c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }
    };
}]);