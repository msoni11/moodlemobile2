angular.module('mm.core')

/**
 * Filter to search URLs that are absolute and make them relative.
 *
 * @module mm.core
 * @name mmFormatLinks
 */
.filter('mmFormatLinks', function($mmSite) {
    var pattern = new RegExp('(src=")(?!https?:\/\/)\/?([^"]+\.(jpe?g|png|gif|bmp))"', "ig");
    return function(text) {
        return text.replace(pattern, '$1' + $mmSite.getURL() + '/$2"');
    };
});