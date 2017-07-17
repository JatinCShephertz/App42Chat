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
           role="dialog" tabindex="-1" id="openChangePwdModal" data-backdrop="static" data-keyboard="false" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>
              <h4  class="modal-title">Change Password</h4>
              
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="alert alert-danger" id="errorMsgChangePwd" style="display:none;">
                  {{errorMsg}}
                </div>
                <div class="alert alert-success" id="successMsgChangePassword" style="display:none;">
                 Password Updated successfully.
                </div>


                <div class="form-group" ng-class="{'has-error' : isOldPwdValid != 'default'}">
                  <label for="pName" class="col-sm-3 control-label">Old Password<i class="mandatory">*</i></label>
                  <div class="col-sm-6">
                    <input type="text"  class="form-control" ng-model="oldPwd"  placeholder="Old Password" >
                    <p class="help-block" ng-if="isOldPwdValid=='blank'">Please enter Password.</p>
                  </div>
                </div>
                <div class="form-group" ng-class="{'has-error' : isNewPwdValid != 'default'}">
                  <label for="pName" class="col-sm-3 control-label">New Password<i class="mandatory">*</i></label>
                  <div class="col-sm-6">
                    <input type="password" class="form-control" ng-model="password"  placeholder="New Password"  >
                    <p class="help-block" ng-if="isNewPwdValid=='blank'">Please enter New Password.</p>

                  </div>
                </div>
                <div class="form-group" ng-class="{'has-error' : isConfNewPwdValid != 'default'}">
                  <label for="pName" class="col-sm-3 control-label">Repeat Password<i class="mandatory">*</i></label>
                  <div class="col-sm-6">
                    <input type="password" class="form-control" ng-model="repPwd" placeholder="Repeat Password" >
                    <p class="help-block" ng-if="isConfNewPwdValid=='blank'">Please enter password.</p>
                    <p class="help-block" ng-if="isConfNewPwdValid=='MisMatch'">Passwords mismatch.</p>
                  </div>
                </div>
              </form>
             
            </div>
            <div class="modal-footer">
              <button data-dismiss="modal" ng-disabled="disablePwdFormBtn" class="btn btn-default pull-left" type="button">Close</button>
            
              <button  class="btn btn-primary pull-right" ng-disabled="disablePwdFormBtn" type="button" ng-click="updatePassword()">Update</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div>


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

