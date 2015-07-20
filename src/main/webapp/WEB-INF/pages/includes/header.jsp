<header ng-controller="MenuController">
    <div class="imfs-top-logo"></div>
    <div class="imfs-top-logo-box"></div>

    <div class='imfs-top-bar'>
        <h1>International Monetary Fund Analytics</h1>
    </div>
    <nav class='imf-menu'>
        <div class="imf-menu-holder">
            <ul class='imf-menu-list'>
                <li ng-class='pageSummary'><a href="#/summary">Summary</a></li>
                <li ng-class='pageCountry'><a href="#/country">Country Statistics</a></li>
                <%--<li ng-class='pageKPI'><a href="#/kpi">Key Performance Indicators</a></li>--%>
            </ul>
        </div>
    </nav>
</header>

<div class="imf-page-container" ng-view>