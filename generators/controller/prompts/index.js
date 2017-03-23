"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'controllerName',
            message: 'Name of Controller',
            filter: function (val) {
                return s.classify(val);
            }
        }]);
    }

    getGeneratorOptions() {
        return [
            {
                key: 'optKey',
                name: 'option Name'
            }
        ];
    }
}