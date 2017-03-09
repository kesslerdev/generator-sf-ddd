"use strict";

var _ = require('underscore');

module.exports = {
    context: (nextPrompts) => {
        let contextPrompts = [{
            type: 'input',
            name: 'contextNamespace',
            message: 'Namespace of context',
            store: true
        }];

        return _.union(contextPrompts, nextPrompts);
    }
}