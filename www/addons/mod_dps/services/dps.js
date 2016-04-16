angular.module('mm.addons.mod_dps')

/**
 * Dps service.
 *
 * @module mm.addons.mod_dps
 * @ngdoc controller
 * @name $mmaModDps
 */
.factory('$mmaModDps', function($mmSite, $q, $mmUser, $mmSitesManager) {
    var self = {};

    /**
     * Check if dps plugin is enabled in a certain site.
     *
     * @module mm.addons.mod_dps
     * @ngdoc method
     * @name $mmaModDps#isPluginEnabled
     * @param  {String} [siteId] Site ID. If not defined, current site.
     * @return {Promise}         Promise resolved with true if plugin is enabled, rejected or resolved with false otherwise.
     */
    self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('mod_dps_get_status');
        });
    };

    return self;
});
