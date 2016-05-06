// This main.js file is part of mod dps module in
// indepth mobile application.

angular.module('mm.addons.mod_dps', ['mm.core'])

.constant('mmaModDpsComponent', 'mmaModDps')

.config(function($stateProvider) {

    $stateProvider

    .state('site.mod_dps', {
        url: '/mod_dps',
        params: {
            module: null,
            courseid: null,
            sectionid: null,
        },
        views: {
            'site': {
                controller: 'mmaModDpsIndexCtrl',
                templateUrl: 'addons/mod_dps/templates/index.html'
            }
        }
    })

    .state('site.mod_dps-enrol', {
        url: '/mod_dps-enrol',
        params: {
            courseid: null,
            module: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsEnrolCtrl',
                templateUrl: 'addons/mod_dps/templates/enrol.html'
            }
        }
    })

    .state('site.mod_dps-nonenrol', {
        url: '/mod_dps-nonenrol',
        params: {
            courseid: null,
            module: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsNonEnrolledCtrl',
                templateUrl: 'addons/mod_dps/templates/nonenrol.html'
            }
        }
    })

    .state('site.mod_dps-confirm', {
        url: '/mod_dps-confirm',
        params: {
            courseid: null,
            module: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsConfirmCtrl',
                templateUrl: 'addons/mod_dps/templates/confirm.html'
            }
        }
    })

    .state('site.mod_dps-attempt', {
        url: '/mod_dps-attempt',
        params: {
            courseid: null,
            module: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsAttemptCtrl',
                templateUrl: 'addons/mod_dps/templates/attempt.html'
            }
        }
    })

    .state('site.mod_dps-stats', {
        url: '/mod_dps-stats',
        params: {
            courseid: null,
            module: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsStats',
                templateUrl: 'addons/mod_dps/templates/stats.html'
            }
        }
    })
})

.config(function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModDps', 'dps', '$mmaModDpsHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModDps', '$mmaModDpsHandlers.linksHandler');
});