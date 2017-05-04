<header class="main-header">
  <!-- Logo -->
  <a href="${request.getContextPath()}/adminConsole/index#/dashboard/" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><b>A</b>G</span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg" style="font-size:18px!important"><b style="font-weight:700!important">App42</b>&nbsp;Chat Admin</span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top" role="navigation">
    <!-- Sidebar toggle button-->
    <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">

        <!-- User Account: style can be found in dropdown.less -->
        <li class="user user-menu userId"> 
          <a href="javascript:;"  >Welcome 
            <span class="hidden-xs">${email}</span>
          </a>
        </li>
        <li class="dropdown user user-menu">
          <a data-toggle="dropdown" class="dropdown-toggle" href="javascript:;" aria-expanded="true"><i class="fa fa-gears"></i></a>
          <ul class="dropdown-menu">
            <!-- User image -->
            <li class="user-header" style="height:50px!important">
              <p>
${email}
              </p>
            </li>

            <li class="user-footer">
            <div class="pull-right">
              <a class="btn btn-danger btn-flat" href="${request.getContextPath()}/login/logout"> Sign out</a>
            </div>
        </li>
      </ul>
      </li>

      <!--        <li>
                <a  href="${request.getContextPath()}/login/logout"><i class="fa fa-power-off"></i> &nbsp;Logout</a>
              </li>-->

      </ul>
    </div>
  </nav>
</header>