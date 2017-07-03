<section class="content-header"  >
  <h1>
    Users
  </h1>
  <ol class="breadcrumb">
    <li><a href="#/live-chats"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Users</li>
  </ol>
</section>


<section class="content" >
  <div class="row mrlrtp">
    <div class="col-md-12" ng-class="{'col-md-9':showConversation,'col-md-12':!showConversation}">

      <!-- USERS LIST -->
      <div class="box box-primary">
        <div class="box-header with-border">

          <div class="pull-left">
            <!--<h3 class="box-title">Users</h3>-->
            <div class="has-feedback">
              <input class="form-control input-sm" id="searchUser" placeholder="Search Users..." ng-keyup="search()" type="text">
              <span class="glyphicon glyphicon-search form-control-feedback text-muted"></span>
            </div>
          </div>
          <div class="box-tools pull-right">

            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>

          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body no-padding" ng-show="userList.length > 0">
          <ul id="userList" class="users-list clearfix" >
            <li ng-repeat="user in userList">
              <img ng-click="openUserDetails(user.name)" style="cursor: pointer;" src="${request.getContextPath()}/images/app42chatadmin/default.png" alt="User Image">
              <a ng-click="openUserDetails(user.name)" class="users-list-name" href="javascript:;">{{user.name}}</a>
              <span class="users-list-date">{{user.createdOn | moment: 'format': 'MMM DD, YYYY' }}</span>
            </li>
          </ul>
          <!-- /.users-list -->
        </div>
        <div class="box-body no-padding" ng-show="userList.length == 0">
          <a href="javascript:;" class="uppercase">No users found.</a>
        </div>
        <!-- /.box-body -->
        <div class="box-footer text-center" ng-show="isMoreUser">
          <a href="javascript:;" class="uppercase" ng-click="loadMoreUsers()">View All Users</a>
        </div>
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-footer -->
      </div>
      <!--/.box -->

    </div>

    <div ng-if="showConversation" class="col-md-3">

      <!-- DIRECT CHAT PRIMARY -->
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{selectedName}}</h3>
          <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="12 Total Messages" class="badge bg-light-blue" >12</span>
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <!-- Conversations are loaded here -->
          <div class="direct-chat-messages" >
            <div ng-repeat="obj in msgObj">
              <div ng-if="obj.position" class="direct-chat-msg" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="selectedName"></span>
                  <span class="direct-chat-timestamp pull-right" ng-bind="obj.time"></span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/{{selectedIcon}}" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div><!-- /.direct-chat-msg -->
              <div ng-if="!obj.position" class="direct-chat-msg right"  >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-right" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-left" ng-bind="obj.time"></span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}//images/app42chatadmin/avatar5.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div>

            </div>
          </div><!--/.direct-chat-messages-->

        </div><!-- /.box-body -->
        <div class="box-footer">
          <div class="input-group">
            <!--              <input type="text" id="txtF{{widgets[$index+3].name}}" placeholder="Type Message ..." class="form-control">
                          <span class="input-group-btn">
                            <button type="button" ng-click="sendChat(widgets[$index+3].name)" id="sendChat{{widgets[$index+3].name}}" class="btn btn-primary btn-flat">Send</button>
                          </span>-->
          </div>
          {{}}
        </div><!-- /.box-footer-->
      </div><!--/.direct-chat -->
    </div><!-- /.col --> 
  </div>
</div>

</section>




