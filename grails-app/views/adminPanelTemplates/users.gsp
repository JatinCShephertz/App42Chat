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
        <div class="box-header">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </div>
                  <input type="text" id="daterange-btn"  class="form-control pull-l" >
                </div><!-- /.input group -->
              </div>
            </div>
            <div class="col-md-8">
              <button type="button" class="btn btn-primary pull-right" ng-click="getAllUsersReport()"><i class="fa fa-download"></i> Generate Report</button>
            </div>
          </div>
        </div><!-- /.box-header -->
        <!-- /.box-header -->
        <div class="box-body ">

          <table class="table table-striped">

            <tbody>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>
              <tr ng-if="userList.length > 0" ng-repeat="user in userList ">
                <td>{{$index+1}}</td>
                <td>{{user.name}}</td>   
                <td>{{user.createdOn | moment: 'format': 'MMM DD, YYYY' }}</td>   
                <td>
                  <a href="javascript:;" ng-click="openUserDetails(user.name)">View</a>
                </td>    
              </tr>
              <tr ng-if="userList.length == 0">
                <td colspan="5" style="text-align: center;"><b>No users found.</b></td>
              </tr>
            </tbody>
          </table>
          <div class="box-footer text-center" ng-show="isMoreUser">
            <a href="javascript:;" class="uppercase" ng-click="loadMoreUsers()">Load More</a>
          </div>
        </div><!-- /.box-body -->
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-footer -->
      </div>
      <!--/.box -->

    </div>
  </div>
</section>




