<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    Agents
  </h1>
  <ol class="breadcrumb">
    <li ng-if="usrRole=='AGENT'"><a href="#/live-chats"><i class="fa fa-dashboard"></i> Home</a></li>
    <li ng-if="usrRole!='AGENT'"><a href="#/agents"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Agents</li>
  </ol>
</section>


<section class="content">

  <div class="row">
    <div class="col-xs-12">
      <div class="box box-primary">
        <div class="box-header">
          <div class="pull-left">
            <h3 class="box-title">Total Agents:</h3><span class="iamCount">{{agents.length}}</span>

          </div>

          <button class="btn btn-md btn-primary pull-right" ng-click="openCreateAgent()"  type="button">Add Agent</button>
        </div><!-- /.box-header -->
        <div class="box-body ">


          <div class="alert alert-success alert-dismissable" id="successMsgAddgent" style="display:none;">
            Agent added successfully.
          </div>
          <div class="alert alert-success alert-dismissable" id="successMsgEditgent" style="display:none;">
            Agent updated successfully.
          </div>

          <table class="table table-striped">
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Concurrent Chat Session limit</th>
                <th>Password</th>
                <th>Action</th>

              </tr>
              <tr ng-show="agents.length>0" ng-repeat="p in agents ">
                <td>{{$index+1}}</td>
                <td>{{p.name}}</td>
                <td>{{p.email}}</td>
                <td ng-if="p.status == 'ACTIVE'">
                  <span class="label label-success">{{p.status}}</span>  
                </td>
                <td ng-if="p.status !='ACTIVE'">
                  <span class="label label-warning">INACTIVE</span>  
                </td>
                <td>{{p.capacity}}</td>
                <td><a href="javascript:;" ng-click="openPwddModal(p)"><i class="fa fa-eye"></i> show</a></td>
                <td>
                  <a href="javascript:;" ng-click="openCreateAgent(p)" ><i class="fa fa-pencil"></i> Edit </a>
                </td>

              </tr>
              <tr ng-show="agents.length == 0">
                <td colspan="7" style="text-align: center;"><b>No Agent(s) added yet.</b></td>
              </tr>


            </tbody>
          </table>
        </div><!-- /.box-body -->
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <div class="box-footer clearfix">

        </div>

      </div><!-- /.box -->

    </div>
  </div>
</section>

<div class="modal" aria-hidden="true" aria-labelledby="myModalLabel"
     role="dialog" tabindex="-1" id="openAgentFormModal" data-backdrop="static" data-keyboard="false" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
  
      <div class="modal-header">
        <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>
        <h4 ng-if="!isEdit" class="modal-title">Add Agent</h4>
        <h4 ng-if="isEdit" class="modal-title">Edit Agent</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="alert alert-danger" id="errorMsgAddAgent" style="display:none;">
            {{errorMsg}}
          </div>


          <div class="form-group" ng-class="{'has-error' : isEmailValid != 'default'}">
            <label for="pName" class="col-sm-3 control-label">Email<i class="mandatory">*</i></label>
            <div class="col-sm-6">
              <input type="text" ng-disabled="isEdit" class="form-control" ng-model="email"  placeholder="Email" >
              <p class="help-block" ng-if="isEmailValid=='blank'">Please enter Email.</p>
            </div>
          </div>
          <div class="form-group" ng-class="{'has-error' : isNameValid != 'default'}">
            <label for="pName" class="col-sm-3 control-label">Name<i class="mandatory">*</i></label>
            <div class="col-sm-6">
              <input type="text" class="form-control" ng-model="name"  placeholder="Name"  >
              <p class="help-block" ng-if="isNameValid=='blank'">Please enter Name.</p>

            </div>
          </div>
          <div class="form-group" ng-class="{'has-error' : isCapacityValid != 'default'}">
            <label for="pName" class="col-sm-3 control-label">Concurrent Chat Session limit<i class="mandatory">*</i></label>
            <div class="col-sm-6">
              <input type="number" class="form-control" ng-model="capacity" min="1" max="10" >
              <p class="help-block" ng-if="isCapacityValid=='blank'">Please choose a number.</p>
            </div>
          </div>



        </form>
<!--        <div><span class="iamCount">{{ppwwdd}}</span></div>-->
      </div>
      <div class="modal-footer">
        <button data-dismiss="modal" class="btn btn-default pull-left" type="button">Close</button>
        <button ng-show="!isEdit"  class="btn btn-primary pull-right" type="button" ng-click="saveAgent()">Submit</button>
        <button ng-show="isEdit" class="btn btn-primary pull-right" type="button" ng-click="updateAgent()">Update</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>

<div class="modal" aria-hidden="true" aria-labelledby="myModalLabel"
     role="dialog" tabindex="-1" id="shwPwddModal" data-backdrop="static" data-keyboard="false" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Show Password</h4>
      </div>
      <div class="modal-body">
        <div>Password: <span class="iamCount" ng-bind="dynPwd"></span></div>
      </div>
      <div class="modal-footer">
        <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
        <!--<button class="btn btn-primary" ng-click="deleteUser(userO)" type="button">YES</button>-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>

