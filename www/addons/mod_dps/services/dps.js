angular.module('mm.addons.mod_dps')

/**
 * Dps service.
 *
 * @module mm.addons.mod_dps
 * @ngdoc controller
 * @name $mmaModDps
 */
.factory('$mmaModDps', function($mmSite, $q, $mmUser, $mmSitesManager, $mmCourse, $http) {
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
     * @param {Number} cmId Course Module ID
     * @param {Boolean} [refresh] True when we should not get the value from the cache. 
     */
    self.getDpsStatus = function(cmId, refresh) {
        var params = {
            'cmid': cmId
        },
        preSets = {};

        if (refresh) {
            preSets.getFromCache = false;
        }

        return $mmSite.read('mod_dps_get_status', params, preSets).then(function(result) {
            statuses = result;
            return statuses;
        });
    }

    /**
     * This method can be used to enrol user to dps.
     * 
     * @module mm.addons.mod_dps
     * @name $mmaModDps#enrolUser
     * @param {Number} cmId Course Module ID
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
     * @param {Number} cmId Course Module ID
     */
    self.confirmDaily = function(cmId) {
        return $mmSite.read('mod_dps_create_daily_confirm', {
            'cmid': cmId
        }).then(function(result) {
            //return confirmation status result.
            return result;
        });
    }

    /**
     * This method can be used to get dps daily question of the day.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#attemptDaily
     * @param {Number} cmId Course Module ID
     * @param {Boolean} [refresh] True when we should not get the value from the cache. 
     */
     self.getDailyQuestion = function(cmId, refresh) {
        var params = {
            'cmid': cmId
        },
        preSets = {};

        if (refresh) {
            preSets.getFromCache = false;
        }
        return $mmSite.read('mod_dps_get_daily_question', params, preSets).then(function(result) {
            //return daily question of the day
            return result;
        });
     }

    /**
     * This method can be used to get dps daily question of the day.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#startAttempt
     * @param {Number} cmID Course Module ID
     * @param {Boolean} [refresh] True when we should not get the value from the cache.
     */
    self.startAttempt = function(cmId, refresh) {
        var params = {
            'cmid': cmId
        },
        preSets = {};

        if (refresh) {
            preSets.getFromCache = false;
        }
        return $mmSite.read('mod_dps_get_daily_question', params, preSets);
    }

    /**
     * This method can be used to record user submission for daily.
     *
     * @module mm.addons.mod_dps
     * @name $mmadModDps#processAttempt
     */
     self.processAttempt = function(cmId, qId, timeup, ansId) {
        var params = {
            questionId: qId,
            answerId : ansId,
            cmid: cmId,
            timeup: timeup ? 1 : 0
        }
        preSets = {};
        //This should never be cached.
        preSets.getFromCache = false;

        return $mmSite.read('mod_dps_create_daily_submission', params, preSets);
     }

    /**
     * This method can be used to get user stats for daily
     *
     */
    self.getStats = function(cmId, dayFrom, refresh) {
        var params = {
            cmid: cmId,
            limited: 1
        }
        var ws_method = 'mod_dps_get_stats';

        if (undefined !== dayFrom) {
            params['startsfrom'] = dayFrom;
            ws_method = 'mod_dps_get_weekly_stats'
        }

        preSets = {}
        if (refresh) {
            preSets.getFromCache = false;
        }

        return $mmSite.read(ws_method, params, preSets).then(function(result){
            return result;
        });

    }

    /**
     * This method can be used to set cycle bookmark.
     */
    self.setBookmark = function(cmId, bookmarkIt) {
        var params = {
            cmid: cmId,
            bookmarkit: bookmarkIt ? 1 : 0
        }

        return $mmSite.read('mod_dps_create_bookmark', params).then(function(result) {
            return result;
        });
    }

    /**
     * This method can be used to get archived questions.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#getArchiveQuestions
     * @param {Number} cmId Course Module ID
     * @param {Boolean} [refresh] True when we should not get the value from the cache.
     */
    self.getArchivedQuestions = function(cmId, refresh) {
        var params = {
            cmid: cmId
        },
        preSets = {};

        if (refresh) {
            preSets.getFromCache = false;
        }

        return $mmSite.read('mod_dps_get_archive', params, preSets);
    }

   /**
     * This method can be used to get details of archived questions.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#getQuestionDetails
     * @param {Number} qId Question ID
     * @param {Number} cmId Course Module ID
     * @param {Boolean} [refresh] True when we should not get the value from the cache.
     */
    self.getQuestionDetails = function(qId, cmId, refresh) {
        var params = {
            cmid: cmId,
            questionId: qId
        },
        preSets = {};

        if (refresh) {
            preSets.getFromCache = false;
        }

        return $mmSite.read('mod_dps_get_archive_details', params, preSets);
    }

   /**
     * This method can be used to add/remove a question as favorite.
     *
     * @module mm.addons.mod_dps
     * @name $mmaModDps#markFavorite
     * @param {Number} qId Question ID
     * @param {Number} cmId Course Module ID
     * @param {Boolean} [favorite] True if mark to favorite, false if remove from favorite.
     */
    self.markFavorite = function(qId, cmId, favorite, refresh) {
        var params = {
            cmid: cmId,
            questionId: qId,
            favorite: favorite ? 1 : 0
        },
        preSets = {};

        if (refresh) {
            preSets.getFromCache = false;
        }

        return $mmSite.read('mod_dps_create_favorite', params, preSets);
    }

    return self;
});