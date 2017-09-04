"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'commandName',
            message: 'Name of Command (ex: {name}DeleteCommand)',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['App/Command', 'Other'],
            name: 'customOutput',
            message: 'Command folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save command',
            basePath: './'
        }, 
        {
            type: 'checkbox',
            message: 'Select Command types',
            name: 'commandTypes',
            choices: [
                {
                    name: 'CREATE'
                },      
                {
                    name: 'UPDATE'
                },
                {
                    name: 'DELETE'
                }
            ],
            validate: function (answer) {
                if (answer.length < 1) {
                    return 'You must choose at least one command.';
                }

                return true;
            }
        }
        ]);
    }
}