"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: '<%= generatorName %>Name',
            message: 'Name of <%= ucGeneratorName %>',
            filter: function (val) {
                return s.classify(val);
            }
        }<% if (buildOpts.canChangeDir) { %>, {
            type: 'list',
            choices: ['<%= generatorDir %>', 'Other'],
            name: 'customOutput',
            message: '<%= ucGeneratorName %> folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save <%= generatorName %>',
            basePath: './'
        }<% } %>]);
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