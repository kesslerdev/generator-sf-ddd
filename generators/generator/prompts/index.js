"use strict";

var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');

module.exports = class Prompts extends Prompting {
    getPrompts() {
        return [{
            type: 'input',
            name: 'generatorName',
            message: 'Generator Name'
        }, {
            type: 'input',
            default: 'App/Service',
            name: 'customOutput',
            message: 'Output Directory'
        }, {
            type: 'input',
            name: 'suffix',
            message: 'Fixed suffix (ex: xxx{Controller}) enter for no suffix'
        }];
    }

    getGeneratorOptions() {
        return [
            {
                key: 'canChangeDir',
                name: 'the final user can change the output directory'
            },
            {
                key: 'hasSuffix',
                name: 'the final user can set an predifined suffix'
            },
            {
                key: 'hasConfigFile',
                name: 'has to generate a config.xml'
            }
        ];
    }
}