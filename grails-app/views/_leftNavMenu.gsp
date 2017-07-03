<aside class="main-sidebar">
  <section class="sidebar">
    <div class="user-panel">
      <div class="pull-left image">
        <img src="${request.getContextPath()}/images/app42chatadmin/avatar5.png" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p ng-if="usrRole != 'AGENT'">Admin</p>
        <p ng-if="usrRole == 'AGENT'">Agent</p>
        <a ng-show="usrRole == 'AGENT'" href="javascript:;" id="isAdminDefault"><i class="fa fa-spinner"></i> Connecting..</a>
        <a ng-show="usrRole == 'AGENT'" href="javascript:;" id="isAdminOnline" style="display:none;"><i class="fa fa-circle text-success"></i> Online</a>
        <a ng-show="usrRole == 'AGENT'" href="javascript:;" id="isAdminOffline" style="display:none;"><i class="fa fa-circle text-error"></i> Offline</a>
      </div>
    </div>
    <ul class="sidebar-menu">
      <!--<li  ><a  href="${request.getContextPath()}/main/index#/dashboard/" active-link="active"><i class="fa fa-circle-o"></i> Dashboard</a></li>-->

      <li ng-if="usrRole == 'SUPER-ADMIN'" ><a  href="${request.getContextPath()}/main/index#/agents/" active-link="active"><i class="fa fa-circle-o"></i> Agents</a></li>

      <li  ><a  href="${request.getContextPath()}/main/index#/live-chats/" active-link="active"><i class="fa fa-circle-o"></i> Live Chats</a></li>
      <li  ><a  href="${request.getContextPath()}/main/index#/users/" active-link="active"><i class="fa fa-circle-o"></i> Users</a></li>
      <li  ><a  href="${request.getContextPath()}/main/index#/offlineChats/" active-link="active"><i class="fa fa-circle-o"></i> Offline Chats</a></li>

    </ul>
  </section>
</aside>