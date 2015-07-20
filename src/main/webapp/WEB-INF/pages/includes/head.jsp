<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <script type='text/javascript'>
        var imfGlobal = {
            contextPath: '${contextPath}',
            applicationVersion: '${applicationVersion}',
            angularJSVersion : '1.4.3'
        };
        var imfGlobalMessages = {
            unhandledException: '${unhandledException}',
        };
    </script>
    <!-- Stylesheets -->
    <link href='http://fonts.googleapis.com/css?family=Roboto:300,700,400' rel='stylesheet' type='text/css'>
    <link href="${contextPath}/resources/bootstrap/css/bootstrap.min.css?v=2.3.2" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">

    <!-- JavaScript Libraries-->
    <script type="text/javascript" src="${contextPath}/resources/jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="${contextPath}/resources/highcharts/highcharts.js?v=4.1.7"></script>
    <script type="text/javascript" src="${contextPath}/resources/bootstrap/js/bootstrap.min.js?v=3.3.5"></script>
    <!-- AngularJS -->
    <script type="text/javascript" src="${contextPath}/resources/angularjs/angular.js?v=1.4.3"></script>
    <script type="text/javascript" src="${contextPath}/resources/angularjs/angular-route.js?v=1.4.3"></script>
    <script type="text/javascript" src="${contextPath}/resources/angularjs/custom/angular-fixed-header-table.js?v=1.2.0"></script>
    <c:choose>
        <c:when test="${'PROD' == runtimeEnvironment}">
            <link href="${contextPath}/versioned/${applicationVersion}/minified/imf.min.css" rel="stylesheet" type="text/css" />
            <script src="${contextPath}/versioned/${applicationVersion}/minified/imf.min.js" type="text/javascript" ></script>
        </c:when>
        <c:otherwise>
            ${projectJavascript}
            ${projectStylesheets}
        </c:otherwise>
    </c:choose>

    <!--[if lt IE 9]>
    <script>
        document.createElement('header');
        document.createElement('nav');
        document.createElement('section');
        document.createElement('article');
        document.createElement('aside');
        document.createElement('footer');
    </script>
    <![endif]-->

</head>