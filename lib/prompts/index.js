"use strict";

var _ = require('underscore');

module.exports = {
    /// @deprecated
    context: (nextPrompts) => {
        let contextPrompts = [{
            type: 'input',
            name: 'contextNamespace',
            message: 'Namespace of context',
            store: true
        }];

        return _.union(contextPrompts, nextPrompts);
    },
    getCRUD: (canSelectNothing) => {
        return {
            type: 'checkbox',
            message: 'Select Actions',
            name: 'crudTypes',
            choices: [
                {
                    name: 'CREATE'
                },      
                {
                    name: 'READ_LIST'
                },
                {
                    name: 'READ_SINGLE'
                },
                {
                    name: 'UPDATE'
                },
                {
                    name: 'DELETE'
                }
            ],
            validate: function (answer) {
                if (answer.length < 1 && !canSelectNothing) {
                    return 'You must choose at least one action.';
                }

                return true;
            }
        };
    }
}