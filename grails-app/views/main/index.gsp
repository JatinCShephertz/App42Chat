<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta charset="utf-8">
    <meta name="layout" content="adminConsole" />
  </head>
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
      <g:render template="/header"/>
      <g:render template="/leftNavMenu"/>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <div ng-view></div>        
<!--        <div ng-show="loadingView" class="overlay txtcent fontS26">
          <i class="fa fa-refresh fa-spin"></i>
        </div>-->
      </div><!-- /.content-wrapper -->
      
      
<div class="modal" aria-hidden="true" aria-labelledby="myModalLabel"
     role="dialog" tabindex="-1" id="error_modal" data-backdrop="static" data-keyboard="false" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Session Expired</h4>
      </div>
      <div class="modal-body">
        <p>Your session has been expired.Please login again.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-dismiss="modal" type="button">OK</button>
        <!--<button class="btn btn-primary" data-dismiss="modal" ng-click="sessionExpiredpopUp()" type="button">OK</button>-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>

     

    </div><!-- ./wrapper -->
  </body>
</html>

