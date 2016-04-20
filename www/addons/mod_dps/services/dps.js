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
        return $mmSite.read('mod_dps_get_status', {
            'cmid' : cmId
        }).then(function(result) {
            statuses = result;
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
    self.enrolUser = function(cmId) {
        return $mmSite.read('mod_dps_create_user_enrol', {
            'cmid': cmId
        }).then(function(result) {
            //return enrollment status
            return result;
        });
    }

    /**
     * This method can be used to confirm daily question of dps.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#confirmDaily
     * @param {}
     */
    self.confirmDaily = function(cmId) {
        return $mmSite.read('mod_dps_create_daily_confirm', {
            'cmid': cmId
        }).then(function(result) {
            //redirect to question page if succeed.
            if (result.success) {
                console.log('hurray!! it\'s confirmed')
            }
        });
    }

    return self;
});
