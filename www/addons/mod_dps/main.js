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
            qId: null,
            courseid: null,
            module: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsStatsCtrl',
                templateUrl: 'addons/mod_dps/templates/stats.html'
            }
        }
    })

    .state('site.mod_dps-bookmark', {
        url: '/mod_dps-bookmark',
        params: {
            courseid: null,
            module: null,
            sectionid: null,
            state: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsBookmarkCtrl',
                templateUrl: 'addons/mod_dps/templates/bookmark.html'
            }
        }
    })

    .state('site.mod_dps-archive', {
        url: '/mod_dps-archive',
        params: {
            courseid: null,
            module: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsArchiveCtrl',
                templateUrl: 'addons/mod_dps/templates/archive.html'
            }
        }
    })

    .state('site.mod_dps-questiondetails', {
        url: '/mod_dps-questiondetails',
        params: {
            qId: null,
            module: null,
            courseid: null,
            sectionid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsQuestionDetailsCtrl',
                templateUrl: 'addons/mod_dps/templates/questiondetails.html'
            }
        }
    })
})

.config(function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModDps', 'dps', '$mmaModDpsHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModDps', '$mmaModDpsHandlers.linksHandler');
});