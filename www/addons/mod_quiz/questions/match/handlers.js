// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.mod_quiz')

/**
 * Match question handlers.
 *
 * @module mm.addons.mod_quiz
 * @ngdoc service
 * @name $mmaModQuizQuestionMatchHandler
 */
.factory('$mmaModQuizQuestionMatchHandler', function() {

    var self = {};

    /**
     * Whether or not the module is enabled for the site.
     *
     * @return {Boolean}
     */
    self.isEnabled = function() {
        return true;
    };

    /**
     * Get the directive.
     *
     * @param {Object} question The question.
     * @return {String}         Directive's name.
     */
    self.getDirectiveName = function(question) {
        return 'mma-mod-quiz-question-match';
    };

    return self;
})

.run(function($mmAddonManager) {
    // It shouldn't be mandatory for us to inject the delegate using $mmAddonManager because we're inside mod_quiz addon,
    // but this way it can be used as an example for external question handlers.
    var $mmaModQuizQuestionsDelegate = $mmAddonManager.get('$mmaModQuizQuestionsDelegate');
    if ($mmaModQuizQuestionsDelegate) {
        $mmaModQuizQuestionsDelegate.registerHandler('mmaModQuizMatchin', 'qtype_match',
                                                        '$mmaModQuizQuestionMatchHandler');
    }
});
