angular.module('mm.core.modules')

/**
 * Service to handle site modules.
 *
 * @module mm.core.modules
 * @ngdoc service
 * @name $mmModules
 */
.factory('$mmModules', function($q, $mmSite, $log, $mmSitesManager, mmModulesSearchPerPage, mmModulesEnrolInvalidKey) {

    $log = $log.getInstance('$mmModules');

    var self = {},
        currentModules = {};

    /**
     * DEPRECATED: this function will be removed in a future version.
     * Clear current modules array. Reserved for core use.
     *
     * @deprecated since version 2.5
     * @protected
     */
    self.clearCurrentModules = function() {
        currentModules = {};
    };

    /**
     * Get course.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getCourse
     * @param {Number} id       ID of the course to get.
     * @param {String} [siteid] Site to get the modules from. If not defined, use current site.
     * @return {Promise}        Promise to be resolved when the modules are retrieved.
     */
    self.getCourse = function(id, siteid) {
        return self.getModules([id], siteid).then(function(modules) {
            if (modules && modules.length > 0) {
                return modules[0];
            }
            return $q.reject();
        });
    };

    /**
     * Get the enrolment methods from a course.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getCourseEnrolmentMethods
     * @param {Number} id ID of the course.
     * @return {Promise}  Promise to be resolved when the methods are retrieved.
     */
    self.getCourseEnrolmentMethods = function(id) {
        var params = {
                courseid: id
            },
            preSets = {
                cacheKey: getCourseEnrolmentMethodsCacheKey(id)
            };

        return $mmSite.read('core_enrol_get_course_enrolment_methods', params, preSets);
    };

    /**
     * Get cache key for get course enrolment methods WS call.
     *
     * @param  {Number} id Course ID.
     * @return {String}    Cache key.
     */
    function getCourseEnrolmentMethodsCacheKey(id) {
        return 'mmModules:enrolmentmethods:' + id;
    }

    /**
     * Get info from a course guest enrolment method.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getCourseGuestEnrolmentInfo
     * @param {Number} instanceId Guest instance ID.
     * @return {Promise}          Promise to be resolved when the info is retrieved.
     */
    self.getCourseGuestEnrolmentInfo = function(instanceId) {
        var params = {
                instanceid: instanceId
            },
            preSets = {
                cacheKey: getCourseGuestEnrolmentInfoCacheKey(instanceId)
            };

        return $mmSite.read('enrol_guest_get_instance_info', params, preSets).then(function(response) {
            return response.instanceinfo;
        });
    };

    /**
     * Get cache key for get course enrolment methods WS call.
     *
     * @param {Number} instanceId Guest instance ID.
     * @return {String}           Cache key.
     */
    function getCourseGuestEnrolmentInfoCacheKey(instanceId) {
        return 'mmModules:guestinfo:' + instanceId;
    }

    /**
     * Get modules.
     * Warning: if the user doesn't have permissions to view some of the modules passed the WS call will fail.
     * The user must be able to view ALL the modules passed.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getModules
     * @param {Number[]} ids    List of IDs of the modules to get.
     * @param {String} [siteid] Site to get the modules from. If not defined, use current site.
     * @return {Promise}        Promise to be resolved when the modules are retrieved.
     */
    self.getModules = function(ids, siteid) {
        siteid = siteid || $mmSite.getId();

        if (!angular.isArray(ids)) {
            return $q.reject();
        } else if (ids.length === 0) {
            return $q.when([]);
        }

        return $mmSitesManager.getSite(siteid).then(function(site) {

            var data = {
                    options: {
                        ids: ids
                    }
                },
                preSets = {
                    cacheKey: getModulesCacheKey(ids)
                };

            return site.read('core_course_get_modules', data, preSets).then(function(modules) {
                if (typeof modules != 'object' && !angular.isArray(modules)) {
                    return $q.reject();
                }
                return modules;
            });
        });
    };

    /**
     * Get cache key for get modules WS call.
     *
     * @param  {Number[]} ids Modules IDs.
     * @return {String}       Cache key.
     */
    function getModulesCacheKey(ids) {
        return 'mmModules:course:' + JSON.stringify(ids);
    }

    /**
     * DEPRECATED: this function will be removed in a future version. Please use $mmModules#getUserCourse.
     * Get a course stored in memory.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getStoredCourse
     * @param  {Number} id ID of the course to get.
     * @return {Object}    Course.
     * @deprecated since version 2.5
     */
    self.getStoredCourse = function(id) {
        $log.warn('The function \'getStoredCourse\' is deprecated. Please use \'getUserCourse\' instead');
        return currentModules[id];
    };

    /**
     * Get a course the user is enrolled in. This function relies on $mmModules#getUserModules.
     * preferCache=true will try to speed up the response, but the data returned might not be updated.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getUserCourse
     * @param {Number} id                   ID of the course to get.
     * @param {Boolean} [preferCache=false] True if shouldn't call WS if data is cached, false otherwise.
     * @param {String} [siteid]             Site to get the modules from. If not defined, use current site.
     * @return {Promise}                    Promise resolved with the course.
     * @since 2.5
     */
    self.getUserCourse = function(id, preferCache, siteid) {
        siteid = siteid || $mmSite.getId();

        if (!id) {
            return $q.reject();
        }

        if (typeof preferCache == 'undefined') {
            preferCache = false;
        }

        return self.getUserModules(preferCache, siteid).then(function(modules) {
            var course;
            angular.forEach(modules, function(c) {
                if (c.id == id) {
                    course = c;
                }
            });
            return course ? course : $q.reject();
        });
    };

    /**
     * Get user modules.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#getUserModules
     * @param {Boolean} [preferCache=false] True if shouldn't call WS if data is cached, false otherwise.
     * @param {String} [siteid]            Site to get the modules from. If not defined, use current site.
     * @return {Promise}                   Promise to be resolved when the modules are retrieved.
     */
    self.getUserModules = function(preferCache, siteid) {
        siteid = siteid || $mmSite.getId();
        if (typeof preferCache == 'undefined') {
            preferCache = false;
        }

        return $mmSitesManager.getSite(siteid).then(function(site) {

            var userid = site.getUserId(),
                presets = {
                    cacheKey: getUserModulesCacheKey(),
                    omitExpires: preferCache
                },
                data = {};

            if (typeof userid === 'undefined') {
                return $q.reject();
            }

            return site.read('local_indepthwebservices_get_users_courses', data, presets).then(function(modules) {
                if (siteid === $mmSite.getId()) {
                    // Only store modules if we're getting current site modules. This function is deprecated and will be removed.
                    storeModulesInMemory(modules);
                }
                return modules;
            });
        });
    };

    /**
     * Get cache key for get user modules WS call.
     *
     * @return {String}       Cache key.
     */
    function getUserModulesCacheKey() {
        return 'mmModules:usermodules';
    }

    /**
     * Invalidates get course WS call.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#invalidateCourse
     * @param  {Number} id Course ID.
     * @return {Promise}   Promise resolved when the data is invalidated.
     */
    self.invalidateCourse = function(id, siteid) {
        return self.invalidateModules([id], siteid);
    };

    /**
     * Invalidates get course enrolment methods WS call.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#invalidateUserModules
     * @param {Number} id Course ID.
     * @return {Promise}  Promise resolved when the data is invalidated.
     */
    self.invalidateCourseEnrolmentMethods = function(id) {
        return $mmSite.invalidateWsCacheForKey(getCourseEnrolmentMethodsCacheKey(id));
    };

    /**
     * Invalidates get course guest enrolment info WS call.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#invalidateUserModules
     * @param {Number} instanceId Guest instance ID.
     * @return {Promise}          Promise resolved when the data is invalidated.
     */
    self.invalidateCourseGuestEnrolmentInfo = function(instanceId) {
        return $mmSite.invalidateWsCacheForKey(getCourseGuestEnrolmentInfoCacheKey(instanceId));
    };

    /**
     * Invalidates get modules WS call.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#invalidateModules
     * @param  {Number[]} ids   Modules IDs.
     * @param {String} [siteid] Site ID to invalidate. If not defined, use current site.
     * @return {Promise}        Promise resolved when the data is invalidated.
     */
    self.invalidateModules = function(ids, siteid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.invalidateWsCacheForKey(getModulesCacheKey(ids));
        });
    };

    /**
     * Invalidates get user modules WS call.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#invalidateUserModules
     * @param {String} [siteid] Site ID to invalidate. If not defined, use current site.
     * @return {Promise}        Promise resolved when the data is invalidated.
     */
    self.invalidateUserModules = function(siteid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.invalidateWsCacheForKey(getUserModulesCacheKey());
        });
    };

    /**
     * Check if WS to retrieve guest enrolment data is available.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#isGuestWSAvailable
     * @return {Boolean} True if guest WS is available, false otherwise.
     */
    self.isGuestWSAvailable = function() {
        return $mmSite.wsAvailable('enrol_guest_get_instance_info');
    };

    /**
     * Check if search modules feature is available in the current site.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#isSearchModulesAvailable
     * @return {Boolean} True if is available, false otherwise.
     */
    self.isSearchModulesAvailable = function() {
        return $mmSite.wsAvailable('core_course_search_modules');
    };

    /**
     * Check if self enrolment is available.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#isSelfEnrolmentEnabled
     * @return {Boolean} True if self enrolment is available, false otherwise.
     */
    self.isSelfEnrolmentEnabled = function() {
        return $mmSite.wsAvailable('enrol_self_enrol_user');
    };

    /**
     * Search modules.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#search
     * @param {String} text      Text to search.
     * @param {Number} [page]    Page to get. Defaults to 0.
     * @param {Number} [perpage] Number of modules per page. Defaults to mmModulesSearchPerPage.
     * @return {Promise}         Promise resolved with the modules and the total of matches.
     */
    self.search = function(text, page, perpage) {
        page = page || 0;
        perpage = perpage || mmModulesSearchPerPage;

        var params = {
                criterianame: 'search',
                criteriavalue: text,
                page: page,
                perpage: perpage
            }, preSets = {
                getFromCache: false
            };

        return $mmSite.read('core_course_search_modules', params, preSets).then(function(response) {
            if (typeof response == 'object') {
                return {total: response.total, modules: response.modules};
            }
            return $q.reject();
        });
    };

    /**
     * Self enrol current user in a certain course.
     *
     * @module mm.core.modules
     * @ngdoc method
     * @name $mmModules#selfEnrol
     * @param {String} courseid     Course ID.
     * @param {String} [password]   Password to use.
     * @param {Number} [instanceId] Enrol instance ID.
     * @return {Promise}            Promise resolved if the user is enrolled. If the password is invalid,
     *                              the promise is rejected with an object with code = mmModulesEnrolInvalidKey.
     */
    self.selfEnrol = function(courseid, password, instanceId) {
        if (typeof password == 'undefined') {
            password = '';
        }

        var params = {
            courseid: courseid,
            password: password
        };
        if (instanceId) {
            params.instanceid = instanceId;
        }

        return $mmSite.write('enrol_self_enrol_user', params).then(function(response) {
            if (response) {
                if (response.status) {
                    return true;
                } else if (response.warnings && response.warnings.length) {
                    var message;
                    angular.forEach(response.warnings, function(warning) {
                        if (warning.warningcode == '2' || warning.warningcode == '4') { // Invalid password warnings.
                            message = warning.message;
                        }
                    });

                    if (message) {
                        return $q.reject({code: mmModulesEnrolInvalidKey, message: message});
                    }
                }
            }
            return $q.reject();
        });
    };

    /**
     * DEPRECATED: this function will be removed in a future version.
     * Stores a list of modules in memory so they can be retrieved later.
     *
     * @param  {Object[]} modules Modules to store
     * @return {Void}
     * @deprecated since version 2.5
     */
    function storeModulesInMemory(modules) {
        angular.forEach(modules, function(course) {
            currentModules[course.id] = angular.copy(course); // Store a copy to prevent unwanted modifications.
        });
    }

    return self;
});
