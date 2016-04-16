angular.module('mm.addons.mod_dps')

/**
 * Dps service.
 *
 * @module mm.addons.mod_dps
 * @ngdoc controller
 * @name $mmaModDps
 */
.factory('$mmaModDps', function($mmSite, $q, $mmUser, $mmSitesManager, $http) {
    var self = {};

    /**
     * Check if dps plugin is enabled in a certain site.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#isPluginEnabled
     * @param  {String} [siteId] Site ID. If not defined, current site.
     * @return {Promise}         Promise resolved with true if plugin is enabled, rejected or resolved with false otherwise.
     */
    self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return true;
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('mod_dps_get_status');
        });
    }

    /**
     * This method can be used to get current status of dps view.
     * 
     * @module mm.addons.mod_dps
     * @name $mmaModDps#getDpsStatus
     * @param {}
     */
    self.getDpsStatus = function(courseId, cmId) {
        return $http.get('/addons/mod_dps/json/status.json').then(function(result) {
            statuses = result.data;
            return statuses;
        });
    }

    /**
     * This method can be used to enrol user to dps.
     * 
     * @module mm.addons.mod_dps
     * @name $mmaModDps#enrolUser
     * @param {}
     */
    self.enrolUser = function(courseId) {
        return $http.get('/addons/mod_dps/json/enrol.json').then(function(result) {
            //redirect to confirmation if succeed.
            console.log(result.data);
            return result.data;

        });
    }
    return self;
});
