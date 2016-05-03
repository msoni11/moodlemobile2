angular.module('mm.addons.mod_dps')

.factory('$mmaDpsHelper', function() {
    var self = {};

    /**
     * Retrieve the answers entered in a form.
     *
     * @module mm.core.question
     * @ngdoc method
     * @name $mmQuestionHelper#getAnswersFromForm
     * @param  {Object} form Form (DOM element).
     * @return {Object}      Object with the answers.
     */
    self.getAnswersFromForm = function(form) {
        if (!form || !form.elements) {
            return {};
        }

        var answers = {};

        angular.forEach(form.elements, function(element, name) {
            name = element.name || name;
            // Ignore flag and submit inputs.
            if (name.match(/_:flagged$/) || element.type == 'submit' || element.tagName == 'BUTTON') {
                return;
            }
            // Ignore selects without value.
            if (element.tagName == 'SELECT' && (element.value === '' || typeof element.value == 'undefined')) {
                return;
            }

            // Get the value.
            if (element.type == 'checkbox') {
                answers[name] = !!element.checked;
            } else if (element.type == 'radio') {
                if (element.checked) {
                    answers[name] = element.value;
                }
            } else {
                answers[name] = element.value;
            }
        });

        return answers;
    };

    return self;
});