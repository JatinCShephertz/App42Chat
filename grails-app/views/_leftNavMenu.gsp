<aside class="main-sidebar">
  <section class="sidebar">
    <div class="user-panel">
      <div class="pull-left image">
        <img src="${request.getContextPath()}/images/app42chatadmin/avatar5.png" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p>Admin</p>
        <a href="javascript:;" id="isAdminDefault"><i class="fa fa-spinner"></i> Connecting..</a>
        <a href="javascript:;" id="isAdminOnline" style="display:none;"><i class="fa fa-circle text-success"></i> Online</a>
        <a href="javascript:;" id="isAdminOffline" style="display:none;"><i class="fa fa-circle text-error"></i> Offline</a>
      </div>
    </div>
    <ul class="sidebar-menu">
      <li  ><a  href="${request.getContextPath()}/main/index#/dashboard/" active-link="active"><i class="fa fa-circle-o"></i> Dashboard</a></li>
      <li  ><a  href="${request.getContextPath()}/main/index#/live-chats/" active-link="active"><i class="fa fa-circle-o"></i> Live Chats</a></li>
      <li  ><a  href="${request.getContextPath()}/main/index#/previous-chats/" active-link="active"><i class="fa fa-circle-o"></i> Previous Chats</a></li>

    </ul>
  </section>
</aside>