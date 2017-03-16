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
            choices: ['None', 'Service', 'Manager', 'Gateway'],
            filter: function (val) {
                return val == 'None' ? '' : val;
            },
            name: 'serviceSuffix',
            message: 'Service type'
        }]);
    }
}