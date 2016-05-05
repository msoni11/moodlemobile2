angular.module('mm.core.modules', [])

.constant('mmModulesSearchComponent', 'mmModulesSearch')
.constant('mmModulesSearchPerPage', 20) // Max of modules per page when searching modules.
.constant('mmModulesEnrolInvalidKey', 'mmModulesEnrolInvalidKey')
.constant('mmModulesEventMyModulesUpdated', 'my_modules_updated')
.constant('mmModulesAccessMethods', {
     guest: 'guest',
     default: 'default'
})

.config(function($stateProvider) {

    $stateProvider

    .state('site.mm_modules', {
        url: '/mm_modules',
        views: {
            'site': {
                templateUrl: 'core/components/modules/templates/list.html',
                controller: 'mmModulesListCtrl'
            }
        }
    })
});
