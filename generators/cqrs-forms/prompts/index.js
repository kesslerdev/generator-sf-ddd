"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'formName',
            message: 'Name of Form Type (ex: {name}DeleteType)',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['Infra/Form/Type', 'Other'],
            name: 'customOutput',
            message: 'Form types folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save form types',
            basePath: './'
        }, 
        {
            type: 'checkbox',
            message: 'Select form types',
            name: 'formTypes',
            choices: [
                {
                    name: 'CREATE'
                },      
                {
                    name: 'UPDATE'
                }
            ],
            validate: function (answer) {
                if (answer.length < 1) {
                    return 'You must choose at least one form.';
                }

                return true;
            }
        }
        ]);
    }
}