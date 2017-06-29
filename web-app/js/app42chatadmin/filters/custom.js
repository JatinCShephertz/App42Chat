/**
 * Shephertz Technologies
 * @author Neha Tiwari
 * @date 29 June 2017
 * @version 1.0
 */

// AngularJs filters

// // REQUIRES:
// moment.js - https://github.com/moment/momentjs.com
 
// USAGE:
// {{ someDate | moment: [any moment function] : [param1] : [param2] : [param n] 
 
// EXAMPLES:
// {{ someDate | moment: 'format': 'MMM DD, YYYY' }}
// {{ someDate | moment: 'fromNow' }}
 
// To call multiple moment functions, you can chain them.
// For example, this converts to UTC and then formats...
// {{ someDate | moment: 'utc' | moment: 'format': 'MMM DD, YYYY' }}
 
angular.module('gateway').filter('moment', function () {
    return function (input, momentFn /*, param1, param2, etc... */) {
        var args = Array.prototype.slice.call(arguments, 2),
        momentObj = moment(input)
        return momentObj[momentFn].apply(momentObj, args);
    };
});

/**
 * Description:
 *     removes white space from text. useful for html values that cannot have spaces
 * Usage:
 *   {{some_text | nospace}}
 */
angular.module('gateway').filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});