<!DOCTYPE html>
<html lang="en"  xmlns:ng="https://angularjs.org" id="ng-app" ng-app="chatAdmin" data-ng-controller="MainController" >
  <head>
    <title><g:layoutTitle default="APP42 Chat Admin" /></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin/bootstrap', file: 'bootstrap.min.css')}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

    <!-- Theme style -->
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin', file: 'AdminLTE.min.css')}">
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin', file: 'skin-blue.min.css')}">
    <link rel='stylesheet' href='${resource(dir:'js/app42chatadmin/resources/plugins/chosen/',file:'chosen.min.css')}'>
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin/custom', file: 'style.css')}">
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin/custom', file: 'animate.css')}">  
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin', file: 'pnotify.custom.min.css')}">  
    <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
    <link href="assets/apple-touch-icon.png" rel="apple-touch-icon">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="${resource(dir: 'js/app42chatadmin/resources/plugins/daterangepicker/', file: 'daterangepicker-bs3.css')}">
  <g:layoutHead />

</head>
<body class="hold-transition skin-blue sidebar-mini">

<g:layoutBody />
<!-- jQuery 2.1.4 -->
<script src="${resource(dir: 'js/app42chatadmin/resources/plugins/jQuery/', file: 'jQuery-2.1.4.min.js')}"></script>
<!-- jQuery UI 1.11.4 -->
<script src="${resource(dir: 'js/app42chatadmin/resources/', file: 'jquery-ui.min.js')}"></script>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-sanitize.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-animate.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min.js"></script>
<audio id="xyzNoti" src="${resource(dir: 'js/app42chatadmin/resources/', file: 'notification.mp3')}" preload="auto"></audio>
<script src="${resource(dir: 'js/app42chatadmin/resources/s2', file: 'appwarp.min.js')}"></script>
<!-- Base64 encoding -->
<script src="${resource(dir: 'js/app42chatadmin/resources/', file: 'angular-base64.min.js')}"></script>
<!-- Bootstrap 3.3.5 -->
<script src="${resource(dir: 'js/app42chatadmin/resources/bootstrap/', file: 'bootstrap.min.js')}"></script>

<script src="${resource(dir:'js/app42chatadmin/highcharts',file:'highcharts.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin/highcharts',file:'highcharts-more.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin/highcharts',file:'exporting.js?version=1')}"></script>
<script src="${resource(dir: 'js/app42chatadmin/resources/plugins/daterangepicker/', file: 'moment.min.js')}"></script>
<script src="${resource(dir: 'js/app42chatadmin/resources/plugins/daterangepicker/', file: 'daterangepicker.js')}"></script>
<script src='${resource(dir:'js/app42chatadmin/resources/plugins/chosen',file:'chosen.jquery.min.js')}'></script>
<script src='${resource(dir:'js/app42chatadmin/resources/plugins/chosen',file:'chosen.order.jquery.min.js')}'></script>
<script src='${resource(dir:'js/app42chatadmin/resources',file:'pnotify.custom.min.js')}'></script>
<!-- AdminLTE App -->
<script src="${resource(dir: 'js/app42chatadmin/resources/', file: 'app.js')}"></script>
<!--angular js scripts-->
<script src="${resource(dir:'js/app42chatadmin',file:'CONSTANTS.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin',file:'util.js')}"></script>
<!--Route Manager-->
<script src="${resource(dir:'js/app42chatadmin/routes',file:'routeManager.js')}"></script>
<!--Configurations-->
<script src="${resource(dir:'js/app42chatadmin',file:'config.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin/directives',file:'chosen.js')}"></script>
<!--Interceptors-->
<script src="${resource(dir:'js/app42chatadmin/interceptors',file:'main.js')}"></script>
<!--Directives-->
<script src="${resource(dir:'js/app42chatadmin/directives',file:'custom.js')}"></script>
<!--Filters-->
<script src="${resource(dir:'js/app42chatadmin/filters',file:'custom.js')}"></script>
<!--Services-->
<script src="${resource(dir:'js/app42chatadmin/services',file:'dashboard.js')}"></script>

<!--Controllers-->
<script src="${resource(dir:'js/app42chatadmin/controllers',file:'main.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin/controllers',file:'DASHBOARD.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin/controllers',file:'agent.js')}"></script>
<script src="${resource(dir:'js/app42chatadmin/controllers',file:'users.js')}"></script>
<script>
  
 $.widget.bridge('uibutton', $.ui.button);
  var runningEnv = "${runningEnv}"
  var s2Host = "${s2Host}"
  var s2AppKey = "${s2AppKey}"
  var role = "${session['role']}"
  var loggedInUser = "${session['user']}"
</script>
</body>
</html>