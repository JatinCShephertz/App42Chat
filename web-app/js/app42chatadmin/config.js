/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// AngularJs Configurations

// Auth Error Popup Close handler
$(function(){
    $('#error_modal').on('hidden.bs.modal', function () {
    
        document.location = baseUrl;
    })
})
// Loader configurations
chatAdmin.run(['$rootScope', function($root) {
    $root.$on('$routeChangeStart', function(e, curr, prev) { 
        $root.loadingView = true;
    });
    $root.$on('$routeChangeSuccess', function(e, curr, prev) { 
        // Hide loading message
        $root.loadingView = false;
    });
    $root.$on('$routeChangeError', function(e, curr, prev, rejection) {
        // you could look at rejection and do something depending on the status code. 
        if(rejection.status == 500){
           
        }
    });
}]);
//Used to turn on/off the logs
chatAdmin.config(function($logProvider, $provide){
    //console.log(runningEnv)
    if(runningEnv == "DEVELOPMENT" || runningEnv == "TEST"){
        $logProvider.debugEnabled(true);
    }else{
        $logProvider.debugEnabled(false); 
    }
    

    $provide.decorator('$log', function ($delegate) {
        //Original methods
        var origInfo = $delegate.info;
        var origLog = $delegate.log;

        //Override the default behavior
        $delegate.info = function () {

            if ($logProvider.debugEnabled())
                origInfo.apply(null, arguments)
        };

        //Override the default behavior    
        $delegate.log = function () {

            if ($logProvider.debugEnabled())
                origLog.apply(null, arguments)
        };

        return $delegate;
    });
});