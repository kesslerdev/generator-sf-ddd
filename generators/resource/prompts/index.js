"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'resourceName',
            message: 'Name of resource (ex: {name}Controller, {name}Repository)',
            filter: function (val) {
                return s.classify(val);
            }
        },
        _prompts.getCRUD(),
        {
            type: 'checkbox',
            message: 'Select Things',
            name: 'things',
            default: ['CONTROLLER', 'QUERY', 'REPOSITORY', 'CQRS_COMMANDS', 'CQRS_FORMS', 'ENTITY', 'SERVICE', 'EXCEPTION'],
            choices: [
                {
                    name: 'CONTROLLER'
                },
                {
                    name: 'QUERY'
                },      
                {
                    name: 'REPOSITORY'
                },
                {
                    name: 'CQRS_COMMANDS'
                },
                {
                    name: 'CQRS_FORMS'
                },
                {
                    name: 'ENTITY'
                },
                {
                    name: 'SERVICE'
                },
                {
                    name: 'EXCEPTION'
                }
            ],
            validate: function (answer) {
                if (answer.length < 1) {
                    return 'You must choose at least one thing.';
                }

                return true;
            }
        },{
            when: function (answers) {
                return (answers.things.includes('QUERY') || answers.things.includes('REPOSITORY')) && answers.crudTypes.includes('READ_LIST');
            },
            type: 'confirm',
            name: 'queryable',
            default: true,
            message: 'this resource is Queryable ? (search)'
        }
        ]);
    }
}