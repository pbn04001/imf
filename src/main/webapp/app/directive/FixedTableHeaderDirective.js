(function () {
    angular.module('FixedTableHeaderModule', [])
        .directive('fixedTableHeader', fixedTableHeader);

    function fixedTableHeader(){

        function init($scope,$elem,$attrs){
            var watchArray = eval($attrs.fixedTableHeader);
            for(var i in watchArray){
                $scope.$watch(watchArray[i], function(newValue, oldValue) {
                    setTimeout(function(){
                        resizeHeaders($elem);
                    },200);
                });
            }

            $(window).resize(function(){
                setTimeout(function(){
                    resizeHeaders($elem);
                },200);
            });
        }

        function resizeHeaders($elem){
            var table = $elem[0].querySelector('table');
            var header = $elem[0].querySelector('div:first-child');
            var tableHeaders = header.querySelectorAll('div');

            var columnSizes = [];
            var keepGoing = true;
            var toalFlexIntervals = 0;
            angular.forEach(tableHeaders, function (divElem, i) {
                if(keepGoing) {
                    if (divElem.attributes.imfFlex != null) {
                        var value = parseFloat(divElem.attributes.imfFlex.value);
                        columnSizes[i] = {
                            type: 'flex',
                            value: value
                        };
                        toalFlexIntervals += value;
                    } else if (divElem.attributes.imfFixed != null) {
                        var value = parseInt(divElem.attributes.imfFlex.value);
                        columnSizes[i] = {
                            type: 'fixed',
                            value: value
                        }
                    } else {
                        columnSizes = null;
                        keepGoing = false;
                    }
                }
            });


            if(columnSizes != null){

                var remainingTableWidth = $(window).width() - 30;
                for(var i in columnSizes){
                    if(columnSizes[i].type == 'fixed'){
                        remainingTableWidth -= columnSizes[i].value
                    }
                }
                var columnFlexIntervalWidth = remainingTableWidth / toalFlexIntervals;
                angular.forEach(tableHeaders, function (divElem, i) {
                    var tdElem = table.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');
                    var columnSize = columnSizes[i];
                    if(columnSize.type == 'fixed'){
                        $(tdElem).css('width', columnSize.value);
                        $(divElem).css('width', columnSize.value - 20);
                    }else if(columnSize.type == 'flex'){
                        var columnWidth = columnSize.value * columnFlexIntervalWidth;
                        $(tdElem).css('width', columnWidth);
                        $(divElem).css('width', columnWidth - 20);
                    }
                });
            }

            angular.forEach(tableHeaders, function (divElem, i) {

                var tdElem = table.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');

                var anchorWidth = $(divElem.querySelector('a')).width();
                if (anchorWidth > $(tdElem).width()) {
                    $(tdElem).css('width', anchorWidth);
                } else {
                    $(divElem).css('width', $(tdElem).width());
                }
            });

            //adjust for smaller table than total width
            var totalWidth = $(table).width() + 20;
            var totalHeaderWidth = 24;
            angular.forEach(tableHeaders, function (divElem){
                totalHeaderWidth += $(divElem).width() + 16;
            });
            if(totalHeaderWidth < totalWidth){
                var tdElem = table.querySelector('tbody tr:first-child td:nth-child(' + tableHeaders.length + ')');
                $(tdElem).css('width',totalWidth - totalHeaderWidth + $(tdElem).width());
            }



        }

        return {
            restrict: 'A',
            link: init
        };
    }
})();