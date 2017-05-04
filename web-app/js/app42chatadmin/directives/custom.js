/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// AngularJs directives

chatAdmin.directive('activeLink', ['$location', function (location) {

    var mainPath = location.path()
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does not return including hashbang
            if (mainPath === path.slice(0, -1)) {
                if (mainPath === "/live-chats" || mainPath === "/previous-chats") {
                    scope.openSubSideBar("dashboardSection")
                }
                element.parent('li').parent('ul').parent('li').removeClass(clazz)
                element.parent('li').removeClass(clazz)
                element.parent('li').parent('ul').parent('li').addClass(clazz);
                element.parent('li').addClass(clazz);
            }
            scope.location = location;

            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    element.parent('li').parent('ul').parent('li').removeClass(clazz)
                    element.parent('li').removeClass(clazz)
                    element.parent('li').parent('ul').parent('li').addClass(clazz);
                    element.parent('li').addClass(clazz);
                }
            });
        }
    };
}]);