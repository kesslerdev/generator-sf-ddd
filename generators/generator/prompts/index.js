"use strict";

var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return [{
            type: 'input',
            name: 'generatorName',
            message: 'Generator Name'
        }];
    }
}