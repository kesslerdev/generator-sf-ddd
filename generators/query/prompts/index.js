"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'queryName',
            message: 'Name of Query',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['None', 'List', 'Other'],
            filter: function (val) {
                return val == 'None' ? '' : val;
            },
            name: 'querySuffix',
            message: 'Query type'
        }, {
            when: function (answers) {
                return answers.querySuffix === 'Other';
            },
            type: 'input',
            name: 'querySuffix',
            message: 'Query type custom name',
            filter: function (val) {
                return s.classify(val);
            }
        }]);
    }

    getGeneratorOptions() {
        return [
            {
                key: 'hasPagination',
                name: 'Paginated query',
                checked: true
            }, {
                key: 'hasQuery',
                name: 'queryable query'
            }
        ];
    }
}