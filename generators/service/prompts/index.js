"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class ServicePrompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'serviceName',
            message: 'Name of Service',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['None', 'Service', 'Manager', 'Gateway', 'Other'],
            filter: function (val) {
                return val == 'None' ? '' : val;
            },
            name: 'serviceSuffix',
            message: 'Service type'
        }, {
            when: function (answers) {
                return answers.serviceSuffix === 'Other';
            },
            type: 'input',
            name: 'serviceSuffix',
            message: 'Service type custom name',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['services.xml', 'Other'],
            name: 'serviceXMLFile',
            message: 'Service Container definition file'
        }, {
            when: function (answers) {
                return answers.serviceXMLFile === 'Other';
            },
            type: 'input',
            name: 'serviceXMLFile',
            message: 'Service Container definition custom file name',
            validate: function (value) {
                var pass = value.match(/^[\w,\s-]+\.xml$/i);
                if (pass) {
                    return true;
                }

                return 'Please enter a valid xml file name (dont forget .xml)';
            }
        }, {
            type: 'list',
            choices: ['App/Service', 'Other'],
            name: 'customOutput',
            message: 'Service folder'
        }, {
            when: function (answers) {
                return answers.customOutput === 'Other';
            },
            type: 'directory',
            name: 'customOutput',
            message: 'directory to save service',
            basePath: './'
        }]);
    }
}