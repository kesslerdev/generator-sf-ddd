"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'controllerName',
            message: 'Name of Controller (ex: {name}Controller)',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['UI/Controller', 'Other'],
            name: 'customOutput',
            message: 'Controller folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save controller',
            basePath: './'
        }, 
        _prompts.getCRUD()
        ]);
    }
/*
    getGeneratorOptions() {
        return [
            {
                key: 'optKey',
                name: 'option Name'
            }
        ];
    }
*/
}