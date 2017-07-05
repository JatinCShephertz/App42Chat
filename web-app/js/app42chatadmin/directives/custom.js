/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// AngularJs directives

chatAdmin.directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }]);

chatAdmin.directive('activeLink', ['$location', function (location) {

    var mainPath = location.path()
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does not return including hashbang
            if (mainPath === path.slice(0, -1)) {
                console.log("inside iffff")
                element.parent().addClass(clazz).siblings().removeClass(clazz);
            //                element.parent('li').parent('ul').children().removeClass(clazz)
            //                element.parent('li').removeClass(clazz)
            //                element.parent('li').addClass(clazz);
            //                element.addClass(clazz);
            }
            scope.location = location;

            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    console.log("inside iffff 222")
                    element.parent().addClass(clazz).siblings().removeClass(clazz);
                //                       element.parent('li').parent('ul').children().removeClass(clazz)
                //                    element.parent('li').removeClass(clazz)
                //                    element.parent('li').addClass(clazz);
                //                    element.addClass(clazz);
                }
            });
        }
    };
}]);