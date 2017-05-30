<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="layout" content="gatewayRegister" />

  </head>
  <body >
    <div class="loginHeader"><img src="${request.getContextPath()}/images/gateway/logo.png" class="user-image" alt=""></div>
    <div class="register-box">
      <div class="register-logo">
<!--        <a href="javascript:;"><b>APP42</b>&nbsp;API GATEWAY</a>-->
      </div>

      <div class="register-box-body">
        <g:if test="${flash.message}">
          <p class="text-red">${flash.message}</p>
        </g:if>
        <p class="login-box-msg">Forgot Password?</p>

        <g:form action="sendPassword" method="POST" autocomplete="off">


          <div class="form-group has-feedback">
            <input type="text" class="form-control" id="email" name="email" placeholder="Email">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            <p style="display:none" id="emailMsg" class="text-red"></p>
          </div>
          <div class="row">
            <div class="col-xs-7">

            </div><!-- /.col -->
            <div class="col-xs-5">
              <button type="submit" onclick="return validateEmail()" class="btn btn-primary btn-flat pull-right">Submit</button>
            </div><!-- /.col -->
          </div>
        </g:form>


        <a href="${request.getContextPath()}/login" class="text-center">Back to Login</a>
      </div><!-- /.form-box -->
    </div><!-- /.register-box -->
  </body>
</html>
