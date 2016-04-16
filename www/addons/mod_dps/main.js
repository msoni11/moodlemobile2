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
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModDpsIndexCtrl',
                templateUrl: 'addons/mod_dps/templates/index.html'
            }
        }
    })

})

.config(function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModDps', 'dps', '$mmaModDpsHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModDps', '$mmaModDpsHandlers.linksHandler');
});