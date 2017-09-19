"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'repositoryName',
            message: 'Name of Repository (ex: {name}Repository)',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['Domain/Repository', 'Other'],
            name: 'customInterfaceOutput',
            message: 'Repository interface folder'
        }, {
            when: function (answers) {
                return answers.customInterfaceOutput === 'Other';
            },
            type: 'directory',
            name: 'customInterfaceOutput',
            message: 'directory to save repository interface',
            basePath: './'
        }, {
            type: 'list',
            choices: ['Infra/Repository/DoctrineORM', 'Other'],
            name: 'customOutput',
            message: 'Repository interface folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save repository implementation',
            basePath: './'
        },{
            type: 'confirm',
            name: 'queryable',
            default: true,
            message: 'this resource is Queryable ? (search)'
        }, 
        _prompts.getCRUD(true)
        ]);
    }
}