"use strict";

var _prompts = require('../../../lib/prompts');
var Prompting = require('../../../lib/prompting');
var s = require('underscore.string');
var inquirer = require('inquirer');

module.exports = class ServicePrompts extends Prompting {
    getPrompts() {
        return _prompts.context([{
            type: 'input',
            name: 'exceptionName',
            message: 'Exception name',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: [
                "BadRequestHttpException : 400",
                "ResourceNotFoundException : 404",
                "Exception : 500"
            ],
            filter: function (val) {
                let regex = /[0-9]+/g;
                return regex.exec(val)[0];
            },
            name: 'exceptionType',
            message: 'Exception Type'
        }
        ]);
    }

    getGeneratorOptions() {
        return [
            {
                key: 'sprintf',
                name: 'sprintf based message'
            }
        ];
    }
}