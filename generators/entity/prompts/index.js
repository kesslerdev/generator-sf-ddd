"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'entityName',
            message: 'Name of Entity',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['Infra/Resources/DoctrineORM/config', 'Other'],
            name: 'customMappingOutput',
            message: 'Entity mapping folder'
        }, {
            when: function (answers) {
                return answers.customMapingOutput === 'Other';
            },
            type: 'directory',
            name: 'customMappingOutput',
            message: 'directory to save entity mapping',
            basePath: './'
        }, {
            type: 'list',
            choices: ['Domain', 'Other'],
            name: 'customOutput',
            message: 'Entity folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save entity',
            basePath: './'
        }
        ]);
    }
}