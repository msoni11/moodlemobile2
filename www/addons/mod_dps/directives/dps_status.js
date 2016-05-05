 angular.module('mm.addons.mod_dps')
 
 /**
  * This directive can be used to show status message
  * to the user based on what step he is currently in.
  *
  * @module mm.addons.mod_dps
  * @name mmaModDpsStatus
  */

  .directive('mmaModDpsStatus', function(){
    return {
        restrict: 'E',
        scope: {
            status: '=',
            courseid: '=',
            sectionid: '=',
            module: '='
        },
        templateUrl: 'addons/mod_dps/templates/status.html'
    };
  });